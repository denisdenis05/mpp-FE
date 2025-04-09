import axios from "axios";

export const deleteItem = async (index: number) => {
  const updatedMovie = {
    id: index,
  };

  try {
    const response = await axios.delete(`http://localhost:5249/Movies/delete`, {
      data: updatedMovie,
    });

    console.log("Movie updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};
