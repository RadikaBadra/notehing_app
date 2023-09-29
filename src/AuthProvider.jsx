import { createContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [loggedIn, SetLogged] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userID, setUserID] = useState(localStorage.getItem("userID") || null);

  function isLogIn(token, userID) {
    localStorage.setItem("token", token);
    localStorage.setItem("userID", userID);

    SetLogged(true);
    setToken(token);
    setUserID(userID);
  }

  function isLogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");

    SetLogged(false);
    setToken(null);
    setUserID(null);
  }

  const data = {
    token,
    userID,
    loggedIn,
    isLogIn,
    isLogOut,
  };

  AuthProvider.isLogIn = isLogIn;
  AuthProvider.isLogOut = isLogOut;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}

export default AuthContext;
