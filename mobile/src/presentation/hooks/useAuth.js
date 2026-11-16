import React, { createContext, useContext, useEffect, useState } from 'react';
import { saveToken, getToken, removeToken } from '../../core/security/tokenStorage';
import { loginRequest, registerRequest } from '../../data/remote/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const t = await getToken();
      if (t) setToken(t);
      setLoading(false);
    })();
  }, []);

  const login = async (credentials) => {
    const res = await loginRequest(credentials);
    await saveToken(res.token);
    setToken(res.token);
    setUser(res.user);
    return res;
  };

  const register = async (data) => {
    const res = await registerRequest(data);
    await saveToken(res.token);
    setToken(res.token);
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    await removeToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, register, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
