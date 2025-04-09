import axios from "axios";

export const updateEntry = async (
  data: any,
  index: number,
  title: any,
  director: any,
  writer: any,
  genre: any,
  MPA: any,
  rating: any
) => {
  const updatedMovie = {
    id: index,
    title,
    director,
    writer,
    genre,
    MPA,
    rating,
  };

  try {
    const response = await axios.patch(
      `http://localhost:5249/Movies/edit`,
      updatedMovie
    );

    console.log("Movie updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};
