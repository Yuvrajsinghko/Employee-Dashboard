import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true",
  );
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem("isLoggedIn");

    if (storedLoginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);
  const login = (username, password) => {
    if (username === "testuser" && password === "Test123") {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };
  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  return useContext(AuthContext);
}
