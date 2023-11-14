import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  signup: async () => {},
  signin: async () => {},
  logout: () => {}
});