import { createContext, useContext, useEffect, useState } from "react";

import { getAccount } from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("bookBuddyToken") || "",
  );

  const [user, setUser] = useState(null);

  const [loadingUser, setLoadingUser] = useState(true);

  async function loadUser(currentToken) {
    if (!currentToken) {
      setUser(null);
      setLoadingUser(false);
      return;
    }

    try {
      const account = await getAccount(currentToken);

      setUser(account);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("bookBuddyToken");

      setToken("");

      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }

  function login(newToken) {
    localStorage.setItem("bookBuddyToken", newToken);

    setToken(newToken);
  }

  function logout() {
    localStorage.removeItem("bookBuddyToken");

    setToken("");

    setUser(null);
  }

  useEffect(() => {
    loadUser(token);
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        loadUser,
        loadingUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
