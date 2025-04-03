import React, { createContext, ReactNode, useContext, useState } from "react";

interface User {
  email: string;
  password: string;
}


interface UserProviderProps {
    children: ReactNode;
}

interface UserContextType {
    user: User | undefined;
    loginUser: (email: string, password: string) => void;
    signinUser: (email: string, name: string, password: string) => void;
    logoutUser: () => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const loginUser = (email: string, password: string) => {
    const newUser = { email, password };
    setUser(newUser);
  };
  const signinUser = (email: string, name : string, password: string) => {
    const newUser = { email, password};
    setUser(newUser);
  };
  const logoutUser = () => {
    setUser(undefined);
  };
  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, signinUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () : UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be inside userProvider");
  }
  return context;
};
