import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const user = localStorage.getItem("user");
  const [state, dispatch] = useReducer(authReducer, { user: user });

  useEffect(() => {
    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  );
};