import { useState, useEffect } from 'react';

function parseJWT(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
}

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsed = parseJWT(token);
      setUser(parsed);
    }
  }, []);

  const isLoggedIn = !!user;

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login"; // 可选跳转
  };

  return { user, isLoggedIn, logout };
}
