import { useRouter } from "next/navigation";
import { ADD_MOVIE_TITLE, MOVIE_FIELD_TITLES } from "../../constants";
import {
  AddButton,
  AutoGrid,
  DashboardContainer,
  ErrorText,
  LogoImage,
  MainContainer,
  Title,
} from "./add-movie-page.style";
import InputField from "@/components/input-field";
import { useEffect, useState } from "react";
import { useData } from "@/DataContext";
import { addEntry, validateData } from "./add-movie-page.utils";
import { checkServerStatus, saveOfflineChange } from "@/DataCaching";

const AddPage = () => {
  const router = useRouter();
  const { data, updateData } = useData();

  const { isLoggedIn } = useData();

  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login");
    }
  }, []);

  const [title, setTitle] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [writer, setWriter] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [MPA, setMPA] = useState<string>("");
  const [rating, setRating] = useState<string>("0");
  const [error, setError] = useState<string>("");
  const [isOnline, setIsOnline] = useState(false);
  const { getToken } = useData();

  const handleAdd = async () => {
    if (
      validateData(title, director, writer, genre, MPA, rating, setError) ===
      true
    ) {
      await checkServerStatus(setIsOnline, () => {});
      if (isOnline) {
        await addEntry(getToken, title, director, writer, genre, MPA, rating);
      } else {
        saveOfflineChange({
          type: "add",
          payload: {
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

  return (
    <>
      <MainContainer>
        <LogoImage
          onClick={() => {
            router.push("/home");
          }}
        />
        <DashboardContainer>
          <Title>{ADD_MOVIE_TITLE}</Title>
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
          <AddButton onClick={handleAdd}>Add new</AddButton>
          {error != "" && <ErrorText>{error}</ErrorText>}
        </DashboardContainer>
      </MainContainer>
    </>
  );
};

export default AddPage;
