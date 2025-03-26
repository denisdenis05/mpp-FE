import { useRouter } from "next/navigation";
import { EDIT_MOVIE_TITLE, MOVIE_FIELD_TITLES } from "../../constants";
import {
  AddButton,
  AutoGrid,
  DashboardContainer,
  LogoImage,
  MainContainer,
  Title,
} from "./edit-movie-page.style";
import InputField from "@/components/input-field";
import { useEffect, useState } from "react";
import { useData } from "@/DataContext";
import { validateData } from "../add-movie/add-movie-page.utils";

const AddPage = () => {
  const router = useRouter();
  const { data, index, updateData } = useData();

  const [title, setTitle] = useState<string>("");
  const [director, setDirector] = useState<string>("");
  const [writer, setWriter] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [MPA, setMPA] = useState<string>("");
  const [rating, setRating] = useState<string>("0");

  const editEntry = () => {
    if (validateData(title, director, writer, genre, MPA, rating) === true) {
      data.splice(index, 1);

      updateData(
        data.concat([
          {
            Title: title,
            Director: director,
            Writer: writer,
            Genre: genre,
            MPA: MPA,
            Rating: parseInt(rating),
          },
        ])
      );
      router.push("/admin");
    }
  };
  useEffect(() => {
    setTitle(data[index].Title);
    setDirector(data[index].Director);
    setWriter(data[index].Writer);
    setGenre(data[index].Genre);
    setMPA(data[index].MPA);
    setRating(data[index].Rating.toString());
  }, []);

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
        </DashboardContainer>
      </MainContainer>
    </>
  );
};

export default AddPage;
