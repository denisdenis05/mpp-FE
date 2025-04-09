import { updateEntry } from "@/app/edit-movie/edit-movie-page.utils";
import { addEntry } from "../src/app/add-movie/add-movie-page.utils";

test("edit a movie entry", () => {
  const initialData = [
    {
      Title: "old",
      Director: "old",
      Writer: "old",
      Genre: "old",
      MPA: "old",
      Rating: 5,
    },
    {
      Title: "old2",
      Director: "old2",
      Writer: "old2",
      Genre: "old2",
      MPA: "old2",
      Rating: 5,
    },
  ];
  const newData = updateEntry(
    initialData,
    0,
    "test",
    "test",
    "test",
    "test",
    "test",
    4
  );

  expect(newData[1].Title).toBe("test");
  expect(newData[1].Rating).toBe(4);
});

test("edit a movie entry, check length", () => {
  const initialData = [
    {
      Title: "old",
      Director: "old",
      Writer: "old",
      Genre: "old",
      MPA: "old",
      Rating: 5,
    },
    {
      Title: "old2",
      Director: "old2",
      Writer: "old2",
      Genre: "old2",
      MPA: "old2",
      Rating: 5,
    },
  ];
  expect(initialData.length).toBe(2);

  const newData = updateEntry(
    initialData,
    0,
    "test",
    "test",
    "test",
    "test",
    "test",
    4
  );

  expect(newData.length).toBe(2);
});
