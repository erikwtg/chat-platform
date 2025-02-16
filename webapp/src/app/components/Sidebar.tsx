import { useState } from "react"

import { Rooms } from "./Rooms"
import { SignIn } from "./SignIn"
import { Login } from "./Login"

export function Sidebar() {
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rooms, setRooms] = useState<Array<{ id: number; name: string }>>([
    { id: 1, name: 'Sala 1' },
    { id: 2, name: 'Sala 2' },
    { id: 3, name: 'Sala 3' },
  ]);

  const handleCreateRoom = () => {
    console.log('create room');
  };

  return (
    <nav className="w-1/6 bg-gray-800 p-4 border-r-2 border-gray-700 flex flex-col max-h-screen">
      {isLoggedIn && (
        <Rooms rooms={rooms} handleCreateRoom={handleCreateRoom} />
      )}

      {/* Cadastrar nova conta */}
      {!isSignIn ? (
        <Login 
          className="mt-auto flex flex-col justify-center items-center" 
          isLoggedIn={isLoggedIn} 
          setIsLoggedIn={setIsLoggedIn}
          setIsSignIn={setIsSignIn}
        />
      ) : (
        <SignIn className="mt-auto"/>
      )}
    </nav>
  );
}