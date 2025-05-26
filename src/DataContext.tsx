"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

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
  pageNumber: number;
  updatePageNumber: (newIndex: number) => void;
  setData: (data: DataItem[]) => void;
  getData: () => DataItem[];
  updateData: (newData: DataItem[]) => void;
  updateIndex: (newIndex: number) => void;
  isLoggedIn: () => boolean;
  getToken: () => string | undefined;
  addToken: (token: string) => void;
  getUsername: () => string | undefined;
  addUsername: (username: string) => void;
  logout: () => void;
}

// Cookie utilities
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
};

const getCookie = (name: string): string | undefined => {
  if (typeof document === "undefined") return undefined;

  const nameEQ = name + "=";
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return undefined;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
};

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
  const [token, setToken] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedToken = getCookie("authToken");
    const storedUsername = getCookie("username");

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const isLoggedIn = () => {
    return Boolean(token);
  };

  const getToken = () => token;

  const addToken = (newToken: string) => {
    setToken(newToken);
    setCookie("authToken", newToken, 7);
  };

  const getUsername = () => username;

  const addUsername = (newUsername: string) => {
    setUsername(newUsername);
    setCookie("username", newUsername, 7);
  };

  const logout = () => {
    setToken(undefined);
    setUsername(undefined);
    deleteCookie("authToken");
    deleteCookie("username");
  };

  const updateData = (newData: DataItem[]) => {
    setData(newData);
  };

  const updateIndex = (newIndex: number) => {
    setIndex(newIndex);
  };

  const updatePageNumber = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const getData = () => data;

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
    logout,
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
