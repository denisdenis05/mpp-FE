import { useRouter } from "next/navigation";
import {
  EDIT_MOVIE_TITLE,
  Movie,
  MOVIE_FIELD_TITLES,
  MovieApiResponse,
} from "../../constants";
import {
  AddButton,
  AutoGrid,
  DashboardContainer,
  ErrorText,
  LogoImage,
  MainContainer,
  Title,
} from "./edit-movie-page.style";
import InputField from "@/components/input-field";
import { useEffect, useState } from "react";
import { useData } from "@/DataContext";
import { validateData } from "../add-movie/add-movie-page.utils";
import { updateEntry } from "./edit-movie-page.utils";
import axios from "axios";
import { checkServerStatus, saveOfflineChange } from "@/DataCaching";

const AddPage = () => {
  const router = useRouter();
  const { index, updateData } = useData();

  const { isLoggedIn } = useData();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, []);

  const [data, setData] = useState<Movie[]>([]);
  const [title, setTitle] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [writer, setWriter] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [MPA, setMPA] = useState<string>("");
  const [rating, setRating] = useState<string>("0");
  const [error, setError] = useState<string>("");
  const [isOnline, setIsOnline] = useState(false);
  const { getToken } = useData();

  const editEntry = async () => {
    if (
      validateData(title, director, writer, genre, MPA, rating, setError) ===
      true
    ) {
      await checkServerStatus(setIsOnline, () => {});
      if (isOnline) {
        await updateEntry(
          data,
          index,
          title,
          director,
          writer,
          genre,
          MPA,
          rating
        );
      } else {
        saveOfflineChange({
          type: "edit",
          payload: {
            id: index,
            title,
            director,
            writer,
            genre,
            mpa: MPA,
            rating: parseFloat(rating),
          },
        });
      }

      router.push("/home");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const requestBody = {
        onlyCount: false,
        paging: {
          pageSize: 1,
          pageNumber: 1,
        },
        filtering: [
          {
            fieldToFilterBy: "Id",
            value: index.toString(),
            operation: "eq",
          },
        ],
        sorting: {
          fieldToSortBy: "Id",
          order: "asc",
        },
      };

      try {
        const response = await axios.post<MovieApiResponse>(
          "http://localhost:5249/Movies/filter",
          requestBody,
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );

        const movies = response.data.results;
        setData(movies);
      } catch (err) {
        console.error("axios error:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const movie = data[0];

      setTitle(movie.title);
      setDirector(movie.director);
      setWriter(movie.writer);
      setGenre(movie.genre);
      setMPA(movie.mpa);
      setRating(movie.rating.toString());
    }
  }, [data]);

  return (
    <>
      <MainContainer>
        <LogoImage
          onClick={() => {
            router.push("/home");
          }}
        />
        <DashboardContainer>
          <Title>{EDIT_MOVIE_TITLE}</Title>
          <AutoGrid>
            <InputField
              title={MOVIE_FIELD_TITLES.TITLE}
              onChange={setTitle}
              value={title}
            />
            <InputField
              title={MOVIE_FIELD_TITLES.DIRECTOR}
              onChange={setDirector}
              value={director}
            />
            <InputField
              title={MOVIE_FIELD_TITLES.WRITER}
              onChange={setWriter}
              value={writer}
            />
            <InputField
              title={MOVIE_FIELD_TITLES.GENRE}
              onChange={setGenre}
              value={genre}
            />
            <InputField
              title={MOVIE_FIELD_TITLES.MPA}
              onChange={setMPA}
              value={MPA}
            />
            <InputField
              title={MOVIE_FIELD_TITLES.RATING}
              onChange={setRating}
              value={rating}
            />
          </AutoGrid>
          <AddButton onClick={editEntry}>Edit</AddButton>
          {error != "" && <ErrorText>{error}</ErrorText>}
        </DashboardContainer>
      </MainContainer>
    </>
  );
};

export default AddPage;
