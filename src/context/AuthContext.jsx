import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, getUsers, removeCurrentUser, saveCurrentUser, saveUsers } from "../utils/storage";
import { generateId } from "../utils/helpers";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getCurrentUser();

    if (storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

  const register = ({ name, email, password }) => {
    const users = getUsers();

    const existingUser = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      return {
        success: false,
        message: "An Account with this Email Already Exists.",
      };
    }

    const newUser = { id: generateId(), name, email: email.toLowerCase(), password, createdAt: new Date().toISOString() };

    saveUsers([...users, newUser]);

    const sessionUser = { id: newUser.id, name: newUser.name, email: newUser.email };

    saveCurrentUser(sessionUser);
    setUser(sessionUser);

    return {
      success: true,
    };
  };

  const login = ({ email, password }) => {
    const users = getUsers();

    const foundUser = users.find((item) =>item.email.toLowerCase() === email.toLowerCase() &&item.password === password);

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const sessionUser = { id: foundUser.id, name: foundUser.name, email: foundUser.email };

    saveCurrentUser(sessionUser);
    setUser(sessionUser);

    return {
      success: true,
    };
  };

  const logout = () => {
    removeCurrentUser();
    setUser(null);
  };

  const value = { user, loading, register, login, logout, isAuthenticated: Boolean(user) };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};