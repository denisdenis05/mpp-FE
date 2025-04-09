import { jest } from "@jest/globals";

// Sample mock data
export const mockData = [
  {
    Title: "Movie 1",
    Director: "Dir A",
    Writer: "W A",
    Genre: "Action",
    MPA: "PG-13",
    Rating: 7,
  },
  {
    Title: "Movie 2",
    Director: "Dir B",
    Writer: "W B",
    Genre: "Comedy",
    MPA: "R",
    Rating: 5,
  },
];

export const useData = jest.fn(() => ({
  data: mockData,
  updateData: jest.fn() as jest.Mock<(newData: typeof mockData) => void>,
}));
