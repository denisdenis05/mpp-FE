import axios from "axios";

export const addEntry = async (
  getToken: any,
  title: any,
  director: any,
  writer: any,
  genre: any,
  MPA: any,
  rating: any
) => {
  const addedMovie = {
    title,
    director,
    writer,
    genre,
    MPA,
    rating,
  };

  try {
    const response = await axios.post(
      `http://localhost:5249/Movies/add`,
      addedMovie,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    console.log("Movie added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error added movie:", error);
    throw error;
  }
};

const validMPARatings = ["G", "PG", "PG-13", "R", "NC-17"];

const validateFields = (
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

export const validateData = (
  title: any,
  director: any,
  writer: any,
  genre: any,
  MPA: any,
  rating: any,
  setError: any
) => {
  const valid = validateFields(title, director, writer, genre, MPA, rating);
  if (valid == false) setError("Data not valid.");
  else setError("");

  return valid;
};
