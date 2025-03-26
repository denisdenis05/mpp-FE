import { addEntry } from "../../app/add-movie/add-movie-page.utils";

test("add a movie entry", () => {
  const initialData = [
    {
      Title: "old",
      Director: "old",
      Writer: "old",
      Genre: "old",
      MPA: "old",
      Rating: 5,
    },
  ];
  const newData = addEntry(
    initialData,
    "test",
    "test",
    "test",
    "test",
    "test",
    4
  );

  expect(newData[1].Title).toBe("test");
});

test("add a movie entry, check length", () => {
  const initialData = [
    {
      Title: "old",
      Director: "old",
      Writer: "old",
      Genre: "old",
      MPA: "old",
      Rating: 5,
    },
  ];
  const newData = addEntry(
    initialData,
    "test",
    "test",
    "test",
    "test",
    "test",
    4
  );

  expect(newData.length).toBe(2);
});
