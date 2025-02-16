import { useState } from "react"

import { Button } from "./Button";

interface LoginProps {
  className?: string;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  setIsSignIn: (value: boolean) => void;
  // username: string;
  // password: string;
  // setUsername: (value: string) => void;
  // setPassword: (value: string) => void;
  // handleLogin: () => void;
  // handleLogout: () => void;
}

// export function Login({ isLoggedIn, username, setUsername, handleLogin, handleLogout }: LoginProps) {
export function Login({
  className,
  isLoggedIn,
  setIsLoggedIn,
  setIsSignIn,
  // username,
  // setUsername,
  // handleLogin,
  // handleLogout
}: LoginProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [isLoggedIn, setIsLoggedIn] = useState(true)

  const handleLogin = () => {
    console.log(username, password)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const handleSignIn = () => {
    setIsSignIn(true)
  }

  return isLoggedIn ? (
    <div className={`${className}`}>
      <Button onClick={handleLogout}>
        Sair
      </Button>
    </div>
  ) : (
    <div className={`py-4 ${className}`}>
      <h2 className="text-lg font-semibold mb-4">Login</h2>
      <input
        type="text"
        className="bg-gray-700 text-green-400 p-2 rounded-md w-full mb-4"
        placeholder="Nome"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        className="bg-gray-700 text-green-400 p-2 rounded-md w-full mb-4"
        placeholder="Senha"
        value={username}
        onChange={(e) => setPassword(e.target.value)}
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