export interface movieList {
  page: number;
  type: string;
  y: string;
}

export interface movieDetail {
    i: string
  }

export interface movieItems {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  quantity?: number;
  price?: number | string
}

export interface movieResponse {
  Search: movieItems[];
  totalResults: string;
  Response: string;
}

export interface responseDetail {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Type :  string ,
}
