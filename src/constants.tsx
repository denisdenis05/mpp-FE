export const DASHBOARD_TITLE = "Dashboard";
export const HOME_PAGE_TITLE = "Home page";
export const ADD_MOVIE_TITLE = "Add movie";
export const EDIT_MOVIE_TITLE = "Edit movie";

export const HOME_PAGE_TEXT = "Home page";
export const ADMIN_PAGE_TEXT = "Admin page";

export const ip = "172.30.241.231";

export const MOVIE_FIELD_TITLES = {
  TITLE: "Movie Title",
  DIRECTOR: "Director",
  WRITER: "Writer",
  GENRE: "Genre",
  MPA: "MPA",
  RATING: "Rating",
};

export interface Movie {
  id: number;
  title: string;
  director: string;
  writer: string;
  genre: string;
  mpa: string;
  rating: number;
}

export interface MovieApiResponse {
  results: Movie[];
  numberFound: number;
  numberRetrieved: number;
}

export const COLUMNS: (keyof Movie)[] = [
  "title",
  "director",
  "writer",
  "genre",
  "mpa",
  "rating",
];
