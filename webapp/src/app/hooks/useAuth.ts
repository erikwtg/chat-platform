import { useState } from "react";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const handleSignIn = () => {
    setIsLoggedIn(true);
    setIsSignIn(false);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return { isLoggedIn, isSignIn, handleSignIn, handleSignOut };
}
