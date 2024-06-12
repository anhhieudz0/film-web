import { BreadCrumb } from "./breakCumb.type";
import { Category } from "./category.type";
import { Country } from "./country.type";
import { IMDB } from "./imdb";
import { Modified } from "./modified.type";
import { Params } from "./params.type";
import { SEOOnPage } from "./seoOnPage.type";
import { TMDB } from "./tmdb";

export interface Item {
  tmdb: TMDB;
  imdb: IMDB;
  modified: Modified;
  _id: string;
  name: string;
  slug: string;
  origin_name: string;
  type: string;
  thumb_url: string;
  poster_url: string;
  sub_docquyen: boolean;
  chieurap: boolean;
  time: string;
  episode_current: string;
  quality: string;
  lang: string;
  year: number;
  category: Category[];
  country: Country[];
  episodes: {
    server_data: {
      name: string;
      filename: string;
      link_m3u8: string;
      link_embed: string;
    }[];
    server_name: string;
  }[];
  actor: string[];
  content: string;
  episode_total: string;
  notify: string;
  status: string;
  trailer_url: string;
  view: number;
  director: string[];
}

interface Pagination {
  totalItems: number;
  totalItemsPerPage: number;
  currentPage: number;
  pageRanges: number;
}

export interface Films {
  seoOnPage: SEOOnPage;
  breadCrumb: BreadCrumb[];
  titlePage: string;
  items: Item[];
  item: Item;
  params: Params;
  type_list: string;
  APP_DOMAIN_FRONTEND: string;
  APP_DOMAIN_CDN_IMAGE: string;
}

export interface Film {}

export interface FilmsResponse {
  data: Films;
  message: string;
}
