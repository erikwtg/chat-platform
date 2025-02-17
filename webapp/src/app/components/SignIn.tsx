import { useState } from "react";

import { Button } from "./Button";
import { useAuth } from "../hooks/useAuth";

interface SignInProps {
  className?: string;
}

export function SignIn({
  className,
  }: SignInProps ) 
{
  const { signIn, loading, setIsSignIn } = useAuth();

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPassword, setCheckPassword] = useState('')

  const handleSignIn = async () => {
    if (username === '' || email === '' || password === '' || checkPassword === '') {
      alert("Preencha todos os campos")
      return
    }

    if (password !== checkPassword) {
      alert("As senhas não conferem")
      return
    }

    const response = await signIn({ username, email, password })

    if ('error' in response) {
      alert(response.message)
      return
    }

    setIsSignIn(false)
  }

  const handleSignOut = () => {
    setIsSignIn(false)
  }

  return (
    <div className={`${className}`}>
      <h2 className="text-lg font-semibold mb-4">Cadastro</h2>
      <input
        id="username"
        type="text"
        className="bg-gray-700 text-green-400 p-2 rounded-md w-full mb-4"
        placeholder="Nome"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="off"
      />
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
        placeholder="Nova Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
      />
      <input
        id="checkPassword"
        type="text"
        className="bg-gray-700 text-green-400 p-2 rounded-md w-full mb-4"
        placeholder="Confirmar Nova Senha"
        value={checkPassword}
        onChange={(e) => setCheckPassword(e.target.value)}
        autoComplete="off"
      />
      
      
      <div className="flex flex-col gap-4 w-full">
        <Button className={loading ? 'opacity-50 cursor-not-allowed bg-gray-500' : ''} onClick={handleSignIn} disabled={loading}>
          Cadastrar {loading ? '...' : ''}
        </Button>

        <button onClick={handleSignOut}>
          Acho que lembrei
        </button>
      </div>
    </div>
  )
}