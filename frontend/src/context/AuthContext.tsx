import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { account } from "../utils/init-appwrite";
import { useQuery } from "@tanstack/react-query";

interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  password: string;
  hash: string;
  hashOptions: {
    type: string;
    memoryCost: number;
    timeCost: number;
    threads: number;
  };
  registration: string;
  status: boolean;
  passwordUpdate: string;
  email: string;
  phone: string;
  emailVerification: boolean;
  phoneVerification: boolean;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  refetchAuthState: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    // throw new Error("useAuth must be used within an AuthContextProvider");
    console.log("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  // const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState<User | null>(null);
  // async function currentUser() {
  //   try {
  //     const user = await account.get();
  //     if (user) {
  //       setUser(user);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     console.log(user);
  //     setLoading(false);
  //   }
  // }

  async function currentUser() {
    const res = await account.get();
    // console.log(res.$id);
    return res;
  }

  // useEffect(() => {
  //   currentUser();
  // }, []);

  const {
    data: user,
    isLoading: loading,
    error,
    refetch: refetchAuthState
  } = useQuery({
    queryKey: ["UserLoggedInStatus"],
    queryFn: () => currentUser()
  });

  const value: AuthContextProps = {
    user,
    loading,
    refetchAuthState
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
