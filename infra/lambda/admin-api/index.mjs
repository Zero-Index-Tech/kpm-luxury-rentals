import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime'
import { CognitoIdentityProviderClient, AdminCreateUserCommand } from '@aws-sdk/client-cognito-identity-provider'
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb'

const doc = DynamoDBDocumentClient.from(new DynamoDBClient({}))
const cognito = new CognitoIdentityProviderClient({})
const bedrock = new BedrockRuntimeClient({})
const BEDROCK_MODEL_ID = process.env.BEDROCK_MODEL_ID ?? 'amazon.nova-lite-v1:0'

const TABLES = {
  vehicles: process.env.VEHICLES_TABLE,
  rentals: process.env.RENTALS_TABLE,
}
const USER_POOL_ID = process.env.USER_POOL_ID
const DEFAULT_FEATURED_VEHICLES = new Set([
  'mercedes-amg-gt',
  'range-rover-sport',
  'rolls-royce-ghost',
])

function json(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

export async function handler(event) {
  try {
    const method = event.requestContext?.http?.method ?? event.httpMethod
    const path = (event.rawPath ?? event.path ?? '').replace(/\/+$/, '')
    if (method === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        },
        body: '',
      }
    }
    if (path === '/public/vehicles') {
      if (method !== 'GET') return json(405, { error: `Method not allowed: ${method}` })
      const { Items = [] } = await doc.send(new ScanCommand({ TableName: TABLES.vehicles }))
      const vehicles = Items.filter((vehicle) => !vehicle.archived)
      return json(200, vehicles.map(({ id, name, category, seats, rate, status, exteriorImage, featured }) => ({
        id, name, category, seats, rate, status, exteriorImage,
        featured: featured ?? DEFAULT_FEATURED_VEHICLES.has(id),
      })))
    }
    const publicVehicleMatch = path.match(/^\/public\/vehicles\/([^/]+)$/)
    if (publicVehicleMatch) {
      if (method !== 'GET') return json(405, { error: `Method not allowed: ${method}` })
      const id = decodeURIComponent(publicVehicleMatch[1])
      const { Item } = await doc.send(new GetCommand({ TableName: TABLES.vehicles, Key: { id } }))
      if (!Item || Item.archived) return json(404, { error: 'Vehicle not found' })
      return json(200, Item)
    }
    if (path === '/public/chat') {
      if (method !== 'POST') return json(405, { error: `Method not allowed: ${method}` })
      let messages
      try {
        const body = JSON.parse(event.body ?? '{}')
        if (!Array.isArray(body.messages) || body.messages.length < 1 || body.messages.length > 10) {
          return json(400, { error: 'Send between 1 and 10 messages.' })
        }
        messages = body.messages.map((message) => {
          if (!['user', 'assistant'].includes(message?.role) || typeof message.content !== 'string') {
            throw new Error('Invalid message format.')
          }
          const content = message.content.trim()
          if (!content || content.length > 1500) throw new Error('Each message must be 1-1500 characters.')
          return { role: message.role, content }
        })
        if (messages[messages.length - 1].role !== 'user' || messages.reduce((total, message) => total + message.content.length, 0) > 7000) {
          return json(400, { error: 'Invalid conversation.' })
        }
      } catch (error) {
        return json(400, { error: String(error?.message ?? 'Invalid request body.') })
      }

      try {
        const { Items = [] } = await doc.send(new ScanCommand({
          TableName: TABLES.vehicles,
          ProjectionExpression: '#id, #name, #category, #rate, #status, #archived',
          ExpressionAttributeNames: {
            '#id': 'id',
            '#name': 'name',
            '#category': 'category',
            '#rate': 'rate',
            '#status': 'status',
            '#archived': 'archived',
          },
        }))
        const fleetContext = Items
          .filter((vehicle) => !vehicle.archived)
          .map((vehicle) => `${vehicle.name} (${vehicle.category}) — R ${Number(vehicle.rate).toLocaleString('en-ZA')} per day; status: ${vehicle.status}.`)
          .join('\n')
        const systemPrompt = [
          'You are the KPM Luxury Rentals AI Concierge for a premium vehicle rental company in Sandton, Johannesburg, South Africa.',
          'Be warm, polished, concise, and useful. Reply in the user’s language when practical.',
          'Use the fleet and daily rates below as the only authoritative vehicle data. Rates are indicative daily rates in South African rand; do not invent discounts, availability, vehicle specifications, deposits, age rules, or rental terms.',
          'Never confirm a booking or live availability. For an exact quote, availability, or unsupported detail, direct the customer to the human concierge.',
          'Services include luxury self-drive rentals, chauffeured hire, weddings and events, airport transfers, and corporate or diplomatic leases in Gauteng.',
          'Contact: +27 81 409 3805, info@kpmluxerentals.co.za. Address: 82 Rivonia Road, Sandton, Johannesburg, 2196, South Africa.',
          `Active fleet and rates:\n${fleetContext || 'Fleet details are currently unavailable.'}`,
        ].join('\n\n')
        const result = await bedrock.send(new ConverseCommand({
          modelId: BEDROCK_MODEL_ID,
          system: [{ text: systemPrompt }],
          messages: messages.map((message) => ({ role: message.role, content: [{ text: message.content }] })),
          inferenceConfig: { maxTokens: 400, temperature: 0.3, topP: 0.9 },
        }))
        const reply = result.output?.message?.content
          ?.map((part) => part.text ?? '')
          .join('')
          .trim()
        if (!reply) throw new Error('Bedrock returned an empty response.')
        return json(200, { reply })
      } catch (error) {
        console.error('Bedrock concierge request failed', error)
        return json(503, { error: 'The concierge is temporarily unavailable.' })
      }
    }
    if (path === '/staff/invitations') {
      if (method !== 'POST') return json(405, { error: `Method not allowed: ${method}` })
      const groupsClaim = event.requestContext?.authorizer?.jwt?.claims?.['cognito:groups']
      let groups = []
      try { groups = JSON.parse(groupsClaim ?? '[]') } catch { groups = [] }
      if (!Array.isArray(groups) || !groups.includes('Admins')) return json(403, { error: 'Admin group membership required' })

      const { email = '' } = JSON.parse(event.body ?? '{}')
      const normalizedEmail = String(email).trim().toLowerCase()
      if (normalizedEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
        return json(400, { error: 'A valid email address is required' })
      }
      try {
        await cognito.send(new AdminCreateUserCommand({
          UserPoolId: USER_POOL_ID,
          Username: normalizedEmail,
          UserAttributes: [
            { Name: 'email', Value: normalizedEmail },
            { Name: 'email_verified', Value: 'true' },
          ],
          DesiredDeliveryMediums: ['EMAIL'],
        }))
        return json(201, { email: normalizedEmail })
      } catch (error) {
        if (error?.name === 'UsernameExistsException') return json(409, { error: 'An account already exists for this email' })
        throw error
      }
    }

    const match = path.match(/^\/(vehicles|rentals)(?:\/([^/]+))?$/)
    if (!match) return json(404, { error: `Unknown route: ${method} ${path}` })

    const [, resource, id] = match
    const TableName = TABLES[resource]

    if (id) {
      if (method === 'GET') {
        const { Item } = await doc.send(new GetCommand({ TableName, Key: { id } }))
        return Item ? json(200, Item) : json(404, { error: `${resource} item not found: ${id}` })
      }
      if (method === 'PUT' || method === 'POST') {
        const item = { ...JSON.parse(event.body ?? '{}'), id }
        await doc.send(new PutCommand({ TableName, Item: item }))
        return json(200, item)
      }
      if (method === 'DELETE') {
        await doc.send(new DeleteCommand({ TableName, Key: { id } }))
        return json(204, null)
      }
      return json(405, { error: `Method not allowed: ${method}` })
    }

    if (method === 'GET') {
      const { Items = [] } = await doc.send(new ScanCommand({ TableName }))
      return json(200, Items)
    }
    if (method === 'POST' || method === 'PUT') {
      const item = JSON.parse(event.body ?? '{}')
      if (!item.id) return json(400, { error: 'Body must include an id' })
      await doc.send(new PutCommand({ TableName, Item: item }))
      return json(200, item)
    }
    return json(405, { error: `Method not allowed: ${method}` })
  } catch (error) {
    console.error(error)
    return json(500, { error: 'Internal error', detail: String(error?.message ?? error) })
  }
}
