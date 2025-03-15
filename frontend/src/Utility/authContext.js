import { createContext, useState, useEffect, useContext } from "react";

// Create AuthContext
export const AuthContext = createContext(null);

// AuthProvider component to wrap around your app
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("authToken");
      return savedToken ? savedToken : "";
    }
    return "";
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken"); // Remove token if empty
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the useAuth hook to consume the context
export const useAuth = () => {
  return useContext(AuthContext);
};
