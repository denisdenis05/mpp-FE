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
}

export const DataContext = createContext<DataContextType | undefined>(
  undefined
);

interface DataProviderProps {
  children: ReactNode;
}

const mockData = [
  {
    Title: "Inception",
    Director: "Christopher Nolan",
    Writer: "Christopher Nolan",
    Genre: "Sci-Fi",
    MPA: "PG-13",
    Rating: 8.8,
  },
  {
    Title: "The Dark Knight",
    Director: "Christopher Nolan",
    Writer: "Jonathan Nolan, Christopher Nolan",
    Genre: "Action, Crime, Drama",
    MPA: "PG-13",
    Rating: 9.0,
  },
  {
    Title: "The Matrix",
    Director: "The Wachowskis",
    Writer: "The Wachowskis",
    Genre: "Action, Sci-Fi",
    MPA: "R",
    Rating: 8.7,
  },
  {
    Title: "The Shawshank Redemption",
    Director: "Frank Darabont",
    Writer: "Stephen King, Frank Darabont",
    Genre: "Drama",
    MPA: "R",
    Rating: 9.3,
  },
  {
    Title: "The Godfather",
    Director: "Francis Ford Coppola",
    Writer: "Mario Puzo, Francis Ford Coppola",
    Genre: "Crime, Drama",
    MPA: "R",
    Rating: 9.2,
  },
  {
    Title: "Pulp Fiction",
    Director: "Quentin Tarantino",
    Writer: "Quentin Tarantino",
    Genre: "Crime, Drama",
    MPA: "R",
    Rating: 8.9,
  },
  {
    Title: "Fight Club",
    Director: "David Fincher",
    Writer: "Chuck Palahniuk, Jim Uhls",
    Genre: "Drama",
    MPA: "R",
    Rating: 8.8,
  },
  {
    Title: "The Avengers",
    Director: "Joss Whedon",
    Writer: "Joss Whedon",
    Genre: "Action, Adventure, Sci-Fi",
    MPA: "PG-13",
    Rating: 8.0,
  },
  {
    Title: "Interstellar",
    Director: "Christopher Nolan",
    Writer: "Jonathan Nolan, Christopher Nolan",
    Genre: "Adventure, Drama, Sci-Fi",
    MPA: "PG-13",
    Rating: 8.6,
  },
  {
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Director: "Peter Jackson",
    Writer: "J.R.R. Tolkien, Fran Walsh",
    Genre: "Adventure, Drama, Fantasy",
    MPA: "PG-13",
    Rating: 8.8,
  },
  {
    Title: "Forrest Gump",
    Director: "Robert Zemeckis",
    Writer: "Winston Groom, Eric Roth",
    Genre: "Drama, Romance",
    MPA: "PG-13",
    Rating: 8.8,
  },
  {
    Title: "The Lion King",
    Director: "Roger Allers, Rob Minkoff",
    Writer: "Irene Mecchi, Jonathan Roberts",
    Genre: "Animation, Adventure, Drama",
    MPA: "G",
    Rating: 8.5,
  },
  {
    Title: "Star Wars: Episode V - The Empire Strikes Back",
    Director: "Irvin Kershner",
    Writer: "George Lucas, Leigh Brackett",
    Genre: "Action, Adventure, Fantasy",
    MPA: "PG",
    Rating: 8.7,
  },
  {
    Title: "The Godfather: Part II",
    Director: "Francis Ford Coppola",
    Writer: "Mario Puzo, Francis Ford Coppola",
    Genre: "Crime, Drama",
    MPA: "R",
    Rating: 9.0,
  },
  {
    Title: "The Prestige",
    Director: "Christopher Nolan",
    Writer: "Christopher Nolan",
    Genre: "Drama, Mystery, Sci-Fi",
    MPA: "PG-13",
    Rating: 8.5,
  },
  {
    Title: "Shutter Island",
    Director: "Martin Scorsese",
    Writer: "Dennis Lehane, Laeta Kalogridis",
    Genre: "Mystery, Thriller",
    MPA: "R",
    Rating: 8.1,
  },
  {
    Title: "The Departed",
    Director: "Martin Scorsese",
    Writer: "William Monahan",
    Genre: "Crime, Drama, Thriller",
    MPA: "R",
    Rating: 8.5,
  },
  {
    Title: "Gladiator",
    Director: "Ridley Scott",
    Writer: "David Franzoni, John Logan",
    Genre: "Action, Adventure, Drama",
    MPA: "R",
    Rating: 8.5,
  },
  {
    Title: "Goodfellas",
    Director: "Martin Scorsese",
    Writer: "Nicholas Pileggi, Martin Scorsese",
    Genre: "Crime, Drama",
    MPA: "R",
    Rating: 8.7,
  },
];

export function DataProvider({ children }: DataProviderProps) {
  const [data, setData] = useState<DataItem[]>(mockData);
  const [index, setIndex] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(0);

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
