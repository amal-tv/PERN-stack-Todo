import { createContext, ReactNode, useState } from "react";
import axios from "axios";

// Define the types for the context
type AuthContextType = {
  userId: null | number;
  login: (username: string, password: string) => Promise<void>;
  signup: (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
};

// Create the context with initial values
const authContext = createContext<AuthContextType>({
  userId: null,
  login: async () => {},
  signup: async () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<null | number>(null);

  // Login function
  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", {
        username,
        password,
      });
      console.log("Server response:", response);
      setUserId(response.data.userId); 
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Signup function
  const signup = async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        email,
        firstName,
        lastName,
        username,
        password,
      });
      console.log("Signup response:", response);
      setUserId(response.data.user.id); // Assuming the response contains the user object with an `id`
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <authContext.Provider value={{ userId, login, signup }}>
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
