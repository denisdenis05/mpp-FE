import axios from "axios";

export const deleteItem = async (index: number, getToken: any) => {
  const updatedMovie = {
    id: index,
  };

  try {
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_API_URL + `/Movies/delete`,
      {
        data: updatedMovie,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );

    console.log("Movie updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating movie:", error);
    throw error;
  }
};
