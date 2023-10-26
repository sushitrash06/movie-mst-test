import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import type { movieDetail, movieList, movieResponse, responseDetail } from "./types";

const baseUrl = "http://www.omdbapi.com";

// function formatImdbIDToRupiah(imdbID:string) {
//     const firstFiveDigits = imdbID.slice(2, 7);
//     const numberPart = Number(firstFiveDigits);
//     const rupiahFormat = new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//     }).format(numberPart);
  
//     return "Rp " + rupiahFormat;
//   }
  

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl || "",
  }),
  endpoints: (builder) => ({
    listMovie: builder.query<movieResponse, movieList>({
      query: ({ page, type, y }) => ({
        url: '/?s=the a&apikey=e464b2e',
        method: "GET",
        params: {
          page,
          type,
          y,
        },
      }),
    //   transformResponse: (res: any) => {
    //     const data = res.Search.map((data: any) => ({
    //       ...{
    //         Title: data.Title,
    //         Year: data.Year,
    //         imdbID: data.imdbID,
    //         Type: data.Type,
    //         Poster: data.Poster,
    //         price: 1000000
    //       }
    //     }))
    //     res = data
    //     return res
    //   }
    }),
    detailMovie: builder.query<responseDetail, movieDetail>({
        query: ({ i }) => ({
          url: '/?apikey=e464b2e',
          method: "GET",
          params: {
           i
          },
        }),
      }),
  }),
});

export const { useListMovieQuery, useDetailMovieQuery } = movieApi;
