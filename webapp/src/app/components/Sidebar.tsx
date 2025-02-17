import React from 'react';
import { useAuth } from "../hooks/useAuth"
import { Rooms } from "./Rooms"
import { SignIn } from "./SignIn"
import { Login } from "./Login"

export function Sidebar() {
  const { isAuthenticated, isSignIn } = useAuth();

  return (
    <nav className="w-1/6 bg-gray-800 p-4 border-r-2 border-gray-700 flex flex-col max-h-screen">
      {isAuthenticated && (
        <Rooms />
      )}

      {!isSignIn ? (
        <Login className="mt-auto flex flex-col justify-center items-center"/>
      ) : (
        <SignIn className="mt-auto"/>
      )}
    </nav>
  );
}