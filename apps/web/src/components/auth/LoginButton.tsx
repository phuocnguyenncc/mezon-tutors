'use client'

import { useCallback } from 'react'
import { useAuth } from '../../context/auth-context'
import { authService } from '../../shared/services/client'

const OAUTH_CHANNEL = 'mezon-oauth-result'

type MezonAuthSuccessMessage = {
  type: 'MEZON_AUTH_SUCCESS'
  data?: {
    user?: {
      id?: string
      email?: string
      avatar?: string | null
    }
    tokens?: {
      accessToken?: string
      refreshToken?: string
    }
  }
}

type MezonAuthErrorMessage = {
  type: 'MEZON_AUTH_ERROR'
  error?: string
}

type MezonAuthMessage = MezonAuthSuccessMessage | MezonAuthErrorMessage

export function LoginButton() {
  const { login, logout, user, isAuthenticated } = useAuth()

  const handleLoginClick = useCallback(async () => {
    if (typeof window === 'undefined') return

    let popup: Window | null = null
    let intervalId: number | null = null

    let broadcastChannel: BroadcastChannel | null = null

    const handleMessage = (event: MessageEvent<MezonAuthMessage>) => {
      if (event.origin !== window.location.origin) return

      const payload = event.data
      if (!payload || typeof payload !== 'object') return

      const type = (payload as { type?: string }).type
      if (type !== 'MEZON_AUTH_SUCCESS' && type !== 'MEZON_AUTH_ERROR') return

      processOAuthPayload(payload as MezonAuthMessage, type)
    }

    const handleBroadcast = (event: MessageEvent<MezonAuthMessage>) => {
      const payload = event.data
      if (!payload || typeof payload !== 'object') return
      const type = (payload as { type?: string }).type
      if (type !== 'MEZON_AUTH_SUCCESS' && type !== 'MEZON_AUTH_ERROR') return
      processOAuthPayload(payload as MezonAuthMessage, type)
    }

    function processOAuthPayload(
      payload: MezonAuthMessage,
      type: 'MEZON_AUTH_SUCCESS' | 'MEZON_AUTH_ERROR'
    ) {
      if (type === 'MEZON_AUTH_SUCCESS') {
        const tokens = (payload as MezonAuthSuccessMessage).data?.tokens
        if (!tokens?.accessToken) {
          console.warn('[OAUTH] MEZON_AUTH_SUCCESS but lack of accessToken')
          return
        }

        window.localStorage.setItem('accessToken', tokens.accessToken)
        if (tokens.refreshToken) {
          window.localStorage.setItem('refreshToken', tokens.refreshToken)
        }

        login({ accessToken: tokens.accessToken })
        cleanup('success')
        return
      }

      console.error('[OAUTH] MEZON_AUTH_ERROR:', (payload as MezonAuthErrorMessage).error)
      cleanup('error')
    }

    const cleanup = (reason?: string) => {
      window.removeEventListener('message', handleMessage as EventListener)
      if (broadcastChannel) {
        broadcastChannel.onmessage = null
        broadcastChannel.close()
        broadcastChannel = null
      }
      if (intervalId !== null) {
        window.clearInterval(intervalId)
        intervalId = null
      }
      if (popup && !popup.closed) {
        popup.close()
      }
    }

    window.addEventListener('message', handleMessage as EventListener)
    try {
      broadcastChannel = new BroadcastChannel(OAUTH_CHANNEL)
      broadcastChannel.onmessage = handleBroadcast as (ev: MessageEvent) => void
    } catch (e) {
      console.warn('[OAUTH] BroadcastChannel not available', e)
    }

    try {
      const url = await authService.getAuthUrl()

      const width = 800
      const height = 500
      const left = window.screenX + (window.outerWidth - width) / 2
      const top = window.screenY + (window.outerHeight - height) / 2

      popup = window.open(
        url,
        'mezon-oauth',
        `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`
      )

      if (!popup) {
        console.error('[OAUTH] popup blocked')
        cleanup('popup_blocked')
        return
      }

      intervalId = window.setInterval(() => {
        if (!popup || !popup.closed) return
        if (intervalId !== null) {
          window.clearInterval(intervalId)
          intervalId = null
        }
        window.setTimeout(() => cleanup('popup_closed'), 500)
      }, 500)
    } catch (error) {
      console.error('[OAUTH] error while starting login', error)
      cleanup('catch')
    }
  }, [login])

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white">
          {user?.username ?? 'Unknown User'}
        </span>
        <button
          type="button"
          onClick={logout}
          className="rounded-full border border-zinc-300 bg-white px-4 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
        >
          Log out
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={handleLoginClick}
      className="flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
    >
      Log In
    </button>
  )
}
