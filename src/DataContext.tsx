"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface DataItem {
  Title: string;
  Director: string;
  Writer: string;
  Genre: string;
  MPA: string;
  Rating: number;
}

interface DataContextType {
  data: DataItem[];
  index: number;
  pageNumber: any;
  updatePageNumber: (newIndex: number) => void;
  setData: (data: DataItem[]) => void;
  getData: () => DataItem[];
  updateData: (newData: DataItem[]) => void;
  updateIndex: (newIndex: number) => void;
  isLoggedIn: () => boolean;
  getToken: () => string | undefined;
  addToken: (token: string) => void;
  getUsername: () => string | undefined;
  addUsername: (token: string) => void;
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

interface DataProviderProps {
  children: ReactNode;
}

export function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<DataItem[]>([]);
  const [index, setIndex] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");

  const isLoggedIn = () => {
    if (token) return true;

    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        return true;
      }
    }

    return false;
  };

  const getToken = () => {
    if (token) return token;

    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        return storedToken;
      }
    }

    return undefined;
  };

  const addToken = (token: string) => {
    setToken(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("authToken", token);
    }
  };

  const getUsername = () => {
    if (username) return username;

    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
        return storedUsername;
      }
    }

    return undefined;
  };

  const addUsername = (user: string) => {
    setUsername(user);
    if (typeof window !== "undefined") {
      localStorage.setItem("username", user);
    }
  };

  const updateData = (newData: DataItem[]) => {
    setData(newData);
  };

  const updateIndex = (newIndex: number) => {
    setIndex(newIndex);
  };

  const updatePageNumber = (newIndex: number) => {
    setIndex(newIndex);
  };

  const getData = () => {
    return data;
  };

  const value: DataContextType = {
    data,
    index,
    pageNumber,
    setData,
    updatePageNumber,
    updateData,
    getData,
    updateIndex,
    isLoggedIn,
    getToken,
    addToken,
    getUsername,
    addUsername,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataContextType {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
