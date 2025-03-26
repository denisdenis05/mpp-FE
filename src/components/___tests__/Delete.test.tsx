import { deleteItem } from "../edit-delete-item/EditDeleteItem.utils";

test("remove first movie entry", () => {
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
      Title: "new",
      Director: "new",
      Writer: "new",
      Genre: "new",
      MPA: "new",
      Rating: 5,
    },
  ];
  const newData = deleteItem(initialData, 0);

  expect(newData[0].Title).toBe("new");
});

test("remove a movie entry, check length", () => {
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
      Title: "new",
      Director: "new",
      Writer: "new",
      Genre: "new",
      MPA: "new",
      Rating: 5,
    },
  ];
  const newData = deleteItem(initialData, 0);

  expect(newData.length).toBe(1);
});
