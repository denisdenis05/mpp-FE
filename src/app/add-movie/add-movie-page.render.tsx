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
import { useState } from "react";
import { useData } from "@/DataContext";
import { addEntry, validateData } from "./add-movie-page.utils";

const AddPage = () => {
  const router = useRouter();
  const { data, updateData } = useData();

  const [title, setTitle] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [writer, setWriter] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [MPA, setMPA] = useState<string>("");
  const [rating, setRating] = useState<string>("0");
  const [error, setError] = useState<string>("");

  const handleAdd = async () => {
    if (
      validateData(title, director, writer, genre, MPA, rating, setError) ===
      true
    ) {
      await addEntry(data, title, director, writer, genre, MPA, rating);
      router.push("/admin");
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
