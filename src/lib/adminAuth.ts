import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
} from '@aws-sdk/client-cognito-identity-provider'

export const ADMIN_SESSION_KEY = 'kpm-admin-session-v1'

const region = (import.meta.env.VITE_AWS_REGION as string | undefined) ?? 'us-east-1'
const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID as string | undefined

interface StoredSession {
  idToken: string
  accessToken: string
  refreshToken?: string
  expiresAt: number
}

interface PendingPasswordChallenge {
  session: string
  username: string
}

let pendingPasswordChallenge: PendingPasswordChallenge | null = null

export function isAdminAuthConfigured() {
  return Boolean(clientId)
}

function readSession(): StoredSession | null {
  try {
    const raw = sessionStorage.getItem(ADMIN_SESSION_KEY)
    if (!raw || raw === 'signed-in') return null
    return JSON.parse(raw) as StoredSession
  } catch {
    return null
  }
}

function writeSession(session: StoredSession) {
  sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session))
}

const client = () => new CognitoIdentityProviderClient({ region })

function storeAuthenticationResult(
  tokens: { IdToken?: string; AccessToken?: string; RefreshToken?: string; ExpiresIn?: number },
  fallbackRefreshToken?: string,
) {
  if (!tokens.IdToken || !tokens.AccessToken) throw new Error('Sign-in did not return tokens.')
  const session: StoredSession = {
    idToken: tokens.IdToken,
    accessToken: tokens.AccessToken,
    refreshToken: tokens.RefreshToken ?? fallbackRefreshToken ?? readSession()?.refreshToken,
    expiresAt: Date.now() + (tokens.ExpiresIn ?? 3600) * 1000,
  }
  writeSession(session)
  return session
}

async function authenticate(params: Record<string, string>, flow: 'USER_PASSWORD_AUTH' | 'REFRESH_TOKEN_AUTH') {
  const result = await client().send(new InitiateAuthCommand({
    AuthFlow: flow,
    ClientId: clientId,
    AuthParameters: params,
  }))
  return storeAuthenticationResult(result.AuthenticationResult ?? {}, params.REFRESH_TOKEN)
}

export async function signInAdmin(email: string, password: string) {
  const username = email.trim().toLowerCase()
  const result = await client().send(new InitiateAuthCommand({
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: clientId,
    AuthParameters: { USERNAME: username, PASSWORD: password },
  }))
  if (result.ChallengeName === 'NEW_PASSWORD_REQUIRED' && result.Session) {
    pendingPasswordChallenge = { session: result.Session, username: result.ChallengeParameters?.USERNAME ?? username }
    return true
  }
  storeAuthenticationResult(result.AuthenticationResult ?? {})
  return false
}

export async function completeAdminPasswordChange(newPassword: string) {
  if (!pendingPasswordChallenge) throw new Error('No password change is pending.')
  const challenge = pendingPasswordChallenge
  const result = await client().send(new RespondToAuthChallengeCommand({
    ChallengeName: 'NEW_PASSWORD_REQUIRED',
    ClientId: clientId,
    Session: challenge.session,
    ChallengeResponses: { USERNAME: challenge.username, NEW_PASSWORD: newPassword },
  }))
  pendingPasswordChallenge = null
  storeAuthenticationResult(result.AuthenticationResult ?? {})
}

export function signOutAdmin() {
  sessionStorage.removeItem(ADMIN_SESSION_KEY)
}

export async function getAdminToken(): Promise<string | null> {
  const session = readSession()
  if (!session) return null
  if (Date.now() < session.expiresAt - 60_000) return session.idToken
  if (!session.refreshToken) return null
  try {
    const refreshed = await authenticate({ REFRESH_TOKEN: session.refreshToken }, 'REFRESH_TOKEN_AUTH')
    return refreshed.idToken
  } catch {
    signOutAdmin()
    return null
  }
}
