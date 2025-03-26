export const addEntry = (
  data: any,
  title: any,
  director: any,
  writer: any,
  genre: any,
  MPA: any,
  rating: any
) => {
  return data.concat([
    {
      Title: title,
      Director: director,
      Writer: writer,
      Genre: genre,
      MPA: MPA,
      Rating: parseInt(rating),
    },
  ]);
};

const validMPARatings = ["G", "PG", "PG-13", "R", "NC-17"];

export const validateData = (
  title: any,
  director: any,
  writer: any,
  genre: any,
  MPA: any,
  rating: any
) => {
  if (rating < 0 || rating > 10) return false;
  if (!validMPARatings.includes(MPA.toUpperCase())) return false;
  if (genre.length < 1 || genre.length > 50) return false;
  if (writer.length < 3 || writer.length > 50) return false;
  if (director.length < 3 || director.length > 50) return false;
  if (title.length < 3 || title.length > 50) return false;
  return true;
};
