'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { authService, getApiBaseUrl } from '../shared/services/client'

type AuthUser = {
  id: string
  email: string | null
  username: string | null
  avatar?: string | null
}

type AuthContextValue = {
  user: AuthUser | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (params: { accessToken: string; user?: AuthUser }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const stored = window.localStorage.getItem('accessToken')
    if (stored) setAccessToken(stored)
    else setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!accessToken) {
      setUser(null)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    authService
      .getMe(accessToken)
      .then((data) => {
        setUser({
          id: data.sub ?? data.id ?? '',
          email: data.email ?? '',
          username: data.username ?? '',
          avatar: data.avatar ?? null,
        })
      })
      .catch(() => {
        window.localStorage.removeItem('accessToken')
        window.localStorage.removeItem('refreshToken')
        setAccessToken(null)
        setUser(null)
      })
      .finally(() => setIsLoading(false))
  }, [accessToken])

  const login = useCallback(
    ({ accessToken: token, user }: { accessToken: string; user?: AuthUser }) => {
      window.localStorage.setItem('accessToken', token)

      setAccessToken(token)

      if (user) setUser(user)
    },
    []
  )

  const logout = useCallback(() => {
    const token = accessToken
    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
    setAccessToken(null)
    setUser(null)

    if (token) {
      authService.logout(token).catch(() => {})
    }
  }, [accessToken])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      accessToken,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      logout,
    }),
    [user, accessToken, isLoading, login, logout]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export { getApiBaseUrl }
