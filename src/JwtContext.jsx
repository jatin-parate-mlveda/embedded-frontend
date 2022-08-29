import { useContext } from "react";
import { createContext } from "react";

const JwtContext = createContext(null);

export const JwtContextProvider = JwtContext.Provider;

export const useJwtContext = () => {
  return useContext(JwtContext);
};
