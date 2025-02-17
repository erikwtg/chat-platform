import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { Button } from "./Button";

interface LoginProps {
  className?: string;
}

export function Login({ className }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const { login, logout, isAuthenticated, setIsSignIn } = useAuth();

  const handleLogin = () => {
    login({ email, password })
  }

  const handleLogout = () => {
    logout()
  }

  const handleSignIn = () => {
    setIsSignIn(true)
  }

  return isAuthenticated ? (
    <div className={`${className}`}>
      <Button onClick={handleLogout}>
        Sair
      </Button>
    </div>
  ) : (
    <div className={`py-4 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Login</h2>
      <input
        id="email"
        type="text"
        className="bg-gray-700 text-green-400 p-2 rounded-md w-full mb-4"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
      />
      <input
        id="password"
        type="text"
        className="bg-gray-700 text-green-400 p-2 rounded-md w-full mb-4"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
      />

      <div className="flex flex-col gap-4 w-full">
        <Button onClick={handleLogin}>
          Entrar
        </Button>

        <button onClick={handleSignIn}>
          Ainda não tenho conta
        </button>
      </div>
    </div>
  );
}