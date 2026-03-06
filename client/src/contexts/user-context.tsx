import { createContext, useState } from "react";
import type { UserLogin } from "../types/user";

interface Context {
  user: UserLogin | undefined,
  setUser: (u: UserLogin) => void,
  cleanUser: () => void,
  loading: boolean,
  setLoading: (l: boolean) => void,
}

export const UserContext = createContext<Context>({
  user: undefined,
  setUser: () => {},
  cleanUser: () => {},
  loading: false,
  setLoading: () => {},
});

const UserProvider = ({children}: {children: React.ReactNode}) => {
  const [user, setUser] = useState<UserLogin | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  function cleanUser() {
    setUser(undefined);
  }

  return (
    <UserContext.Provider value={{ user, setUser, cleanUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;