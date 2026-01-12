import { createContext, useState, useEffect, useCallback } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUserState] = useState(null);
  const [isUserReady, setIsUserReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");

    try {
      const parsed = JSON.parse(stored);
      if (parsed && typeof parsed === "object") {
        setUserState(parsed);
      }
    } catch (error) {
      console.warn("Error al parsear el usuario de localStorage:", error);
      localStorage.removeItem("user");
    } finally {
      setIsUserReady(true); // <- Marcamos que terminó de cargar
    }
  }, []);

  const setUser = useCallback((userData) => {
    setUserState(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  }, []);

  const clearUser = useCallback(() => {
    setUserState(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, clearUser, isUserReady }}>
      {children}
    </UserContext.Provider>
  );
};
