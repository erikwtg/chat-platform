import { useState } from "react";

import { Button } from "./Button";

interface SignInProps {
  className?: string;
  // username: string;
  // email: string;
  // password: string;
  // checkPassword: string;
  // setUsername: (value: string) => void;
  // setEmail: (value: string) => void;
  // setPassword: (value: string) => void;
  // setCheckPassword: (value: string) => void;
  // handleSignIn: () => void;
}

export function SignIn({
  className,
    // username,
    // email,
    // password,
    // checkPassword,
    // setUsername,
    // setEmail,
    // setPassword,
    // setCheckPassword,
    // handleSignIn
  }: SignInProps ) 
{
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')

  const handleSignIn = () => {
    console.log(username, email, password, checkPassword)
  }

  return (
    <div className={`${className}`}>
      <h2 className="text-lg font-semibold mb-4">Cadastro</h2>
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
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        className="bg-gray-700 text-green-400 p-2 rounded-md w-full mb-4"
        placeholder="Nova Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        className="bg-gray-700 text-green-400 p-2 rounded-md w-full mb-4"
        placeholder="Confirmar Nova Senha"
        value={checkPassword}
        onChange={(e) => setCheckPassword(e.target.value)}
      />
      <Button onClick={handleSignIn}>
        Cadastrar
      </Button>
    </div>
  )
}