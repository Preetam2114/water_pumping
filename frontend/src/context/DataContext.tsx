import { useQuery } from "@tanstack/react-query";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

// @ts-expect-error It is not taking props don't know why
import { Query } from "appwrite";
import { databases } from "../utils/init-appwrite";
import { PlantDataArray } from "../types/arduinoData";

interface DataContextProps {
  data: PlantDataArray;
  isLoading: boolean;
  isSuccess: boolean;
  error: object;
  isError: boolean;
}

const DataContext = createContext<DataContextProps | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    // throw new Error("useAuth must be used within an AuthContextProvider");
    console.log("useData must be used within an DataContextProvider");
  }
  return context;
};

export const DataContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["soilData"],
    queryFn: async () => {
      const res = await databases.listDocuments("6488522930f583a33d5c", "64885246482c3298bfb5", [
        Query.orderDesc("$createdAt")
      ]);
      return res;
    }
  });

  const value: DataContextProps = {
    isLoading,
    isSuccess,
    isError,
    error: error as object,
    data
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
