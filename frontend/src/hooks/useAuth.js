// src/hooks/useAuth.js
import { useAuth as useAuthContext } from '../contexts/AuthContext';

/**
 * useAuth hook to access authentication state and actions.
 * Returns: { user, token, login, register, logout, loading }
 */
export function useAuth() {
  return useAuthContext();
}
