"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { adminLogin, adminLogout } from "@/services/api";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("novaStudio_token="));
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      const res = await adminLogin(email, password);
      if (res.success) {
        setIsAuthenticated(true);
      } else {
        throw new Error(res.message || "Login failed");
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminLogout();
    } catch {
      // ignore
    } finally {
      setIsAuthenticated(false);
      document.cookie =
        "novaStudio_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}
