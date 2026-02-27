import { getApiBaseUrl } from './api'

export type AuthTokens = {
  accessToken: string
  refreshToken?: string
}

export type AuthUser = {
  id: string
  email: string
  avatar?: string | null
}

export type ExchangeResponse = {
  user: AuthUser & Record<string, unknown>
  tokens: AuthTokens
}

export type MeResponse = {
  sub?: string
  id?: string
  email?: string
  username?: string
  avatar?: string | null
}

class AuthService {
  private get baseUrl() {
    return getApiBaseUrl()
  }

  async getAuthUrl(): Promise<string> {
    const res = await fetch(`${this.baseUrl}/auth/url`)
    if (!res.ok) throw new Error('Failed to fetch auth url')
    const raw = await res.json()
    const url = raw?.url ?? raw?.data?.url
    if (!url) throw new Error('Invalid auth URL response')
    return url
  }

  async exchangeCode(code: string, state?: string): Promise<ExchangeResponse> {
    const res = await fetch(`${this.baseUrl}/auth/mezon/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, state }),
    })
    const raw = await res.json()
    const data = raw?.data != null ? raw.data : raw

    if (!res.ok) {
      const message = data?.message ?? raw?.message ?? 'Failed to complete login.'
      throw new Error(message)
    }

    if (!data?.tokens?.accessToken) {
      throw new Error('API response missing tokens.accessToken')
    }

    return {
      user: data.user,
      tokens: data.tokens,
    }
  }

  async getMe(accessToken: string): Promise<MeResponse> {
    const res = await fetch(`${this.baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    if (!res.ok) throw new Error('Invalid token')
    const raw = await res.json()
    return raw?.data != null ? raw.data : raw
  }

  async logout(accessToken: string): Promise<void> {
    await fetch(`${this.baseUrl}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    })
  }
}

export const authService = new AuthService()
export default authService
