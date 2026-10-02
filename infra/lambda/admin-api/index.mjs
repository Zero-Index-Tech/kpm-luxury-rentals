import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
  DynamoDBDocumentClient,
  ScanCommand,
  GetCommand,
  PutCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb'

const doc = DynamoDBDocumentClient.from(new DynamoDBClient({}))

const TABLES = {
  vehicles: process.env.VEHICLES_TABLE,
  rentals: process.env.RENTALS_TABLE,
}

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
