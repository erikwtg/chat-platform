"use client"
import { createContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id?: string;
  username?: string;
  email: string;
  password?: string;
}

interface SignInResponse {
  error?: boolean;
  message?: string;
  token?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
  loading: boolean;
  signIn: (data:User) => Promise<SignInResponse | User>;
  login: (user: User) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (user) {
      setUser(JSON.parse(user));
    }

    if (isAuthenticated) {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const signIn = async ({ username, email, password }:  User): Promise<SignInResponse | User> => {
    try {
      setLoading(true);

      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      setTimeout(() => {
        setIsSignIn(false)
      }, 2000)

      return data;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (user: User) => {
    try {
      setLoading(true);
      const data = {
        email: user.email,
        password: user.password,
      };

      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const responseData = await response.json();

      if (response.ok) {
        localStorage.setItem("token", responseData.accessToken);
        localStorage.setItem("refresh_token", responseData.refreshToken);
        localStorage.setItem("isAuthenticated", "true");

        const decoded: any = jwtDecode(responseData.accessToken);

        const userData: User = {
          id: decoded.id,
          email: decoded.email,
          username: decoded.username,
        }

        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);

        setIsAuthenticated(true);
        return responseData;
      } else {
        throw new Error("Falha ao fazer login");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");

    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, isSignIn, isAuthenticated, signIn, setIsSignIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};