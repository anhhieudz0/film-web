import { FilmsResponse } from "@/types/films.type";
import { Params } from "@/types/params.type";
import axios from "axios";

const FILMS_API = {
  ListFilm: (name: string) => `/api/danh-sach/${name}.json`,
  ListFilmByCategory: (name: string) => `/api/the-loai/${name}.json`,
  ListFilmByCountry: (name: string) => `/api/quoc-gia/${name}.json`,
  Search: "/api/tim-kiem",
  FilmDetails: (name: string) => `/api/phim/${name}.json`,
};

const FilmsService = {
  getListFilm: (name: string, params: Partial<Params>) =>
    axios.get<FilmsResponse>(FILMS_API.ListFilm(name), { params }),
  getListFilmByCategory: (name: string, params: Partial<Params>) =>
    axios.get<FilmsResponse>(FILMS_API.ListFilmByCategory(name), { params }),
  getListFilmByCountry: (name: string, params: Partial<Params>) =>
    axios.get<FilmsResponse>(FILMS_API.ListFilmByCountry(name), { params }),
  getSearchFilm: (params: { keyword: string }) =>
    axios.get<FilmsResponse>(FILMS_API.Search, { params }),
  getFilmDetail: (name: string, params: Partial<Params>) =>
    axios.get<FilmsResponse>(FILMS_API.FilmDetails(name), { params }),
};

export default FilmsService;
