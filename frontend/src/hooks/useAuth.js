// src/hooks/useAuth.js

import { useAuth as useAuthContext } from '../contexts/AuthContext'

/**
 * useAuth hook to access authentication state and actions.
 * Returns: { user, token, login, register, logout, loading }
 * 
 * @returns {{
 *   user: { id: string, email: string } | null,
 *   token: string | null,
 *   loading: boolean,
 *   login: ({ email: string, password: string }) => Promise<void>,
 *   register: ({ email: string, password: string }) => Promise<void>,
 *   logout: () => void
 * }}
 */
export function useAuth() {
  return useAuthContext()
}
