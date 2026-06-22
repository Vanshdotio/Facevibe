import React, { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  refreshUser: async () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user from server (server reads the cookie)
  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/user/me", {
        method: "GET",
        credentials: "include", // IMPORTANT - send cookies
        headers: {
          "Accept": "application/json"
        }
      });
      if (!res.ok) {
        setUser(null);
      } else {
        const json = await res.json();
        setUser(json.user || null); // server should respond { user: { name, avatarUrl, ... } }
      }
    } catch (err) {
      console.error("fetchMe error", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  // login: call backend login endpoint (server sets cookie)
  const login = async (credentials) => {
    // example: credentials = { email, password }
    try {
      const res = await fetch("http://localhost:3000/api/auth/user/login", {
        method: "POST",
        credentials: "include", // ensure cookie returned by server is stored
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Login failed");
      }
      // some servers return user in response after setting cookie
      const data = await res.json().catch(() => null);
      if (data && data.user) {
        setUser(data.user);
      } else {
        // otherwise re-fetch /me to populate user state
        await fetchMe();
      }
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.message || String(err) };
    }
  };

  // logout: call server to clear cookie then clear client state
  const logout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/user/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      // ignore network errors but still clear client
      console.warn("logout error", err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser: fetchMe }}>
      {children}
    </AuthContext.Provider>
  );
}
