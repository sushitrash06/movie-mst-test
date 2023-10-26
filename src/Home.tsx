import { useState } from "react";
import { useDispatch } from "react-redux";
import Card from "./component/card";
import { Modals } from "./component/Modals";
import PaginationComponent from "./component/pagination";
import { useDetailMovieQuery, useListMovieQuery } from "./stores/slices/api";
import { addToCart } from "./stores/slices/cartSlice";
import { movieItems } from "./stores/slices/types";
import { formatImdbIDToRupiahList } from "./utils";

function Home() {
  const [page, setPage] = useState<number>(0);
  const [idMovie, setIdMovie] = useState<string>("tt3224458");
  const [openModal, setOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data: dataListMovie } = useListMovieQuery(
    {
      page: page + 1,
      type: "",
      y: "",
    },
    { refetchOnMountOrArgChange: true }
  );
  const { data: dataDetail } = useDetailMovieQuery(
    {
      i: idMovie,
    },
    { refetchOnMountOrArgChange: true }
  );


  const priceMovie = dataListMovie?.Search?.map((movie: movieItems) => ({
    ...movie, // Menyalin semua properti yang ada di objek asli
    price: formatImdbIDToRupiahList(movie.imdbID), // Menambahkan kunci "quantity" dengan nilai 1
  }));
  return (
    <div className="m-16">
      <div className="grid pb-14 min-[200px]:grid-cols-1 min-[600px]:grid-cols-2 min-[850px]:grid-cols-3 min-[1100px]:grid-cols-4 min-[1384px]:grid-cols-5 gap-2 b-14">
        {priceMovie?.map((data: movieItems) => {
          return (
            <Card
              price={data.price}
              year={data.Year}
              img={data.Poster}
              title={data.Title}
              type={data.Type}
              cardClick={() => {
                setIdMovie(data.imdbID);
                setOpenModal(true);
              }}
              onClick={() => {
                dispatch(addToCart(data));
              }}
            />
          );
        })}
      </div>
      <div>
        <PaginationComponent
          page={page}
          setPage={setPage}
          total={(dataListMovie && parseInt(dataListMovie?.totalResults)) || 0}
        />
      </div>
      <Modals
        open={openModal}
        setOpen={setOpenModal}
        children={
          <>
            <p className="text-2xl font-bold">
              {dataDetail?.Title} ({dataDetail?.Year})
            </p>
            <div className="flex justify-between mt-8">
              <div>
                <img
                  className="w-full h-[350px]"
                  src={dataDetail?.Poster}
                  alt="Sunset in the mountains"
                  style={{
                    objectFit: "fill",
                  }}
                />
              </div>
              <div className="w-2/4 ml-9">
                <p>{dataDetail?.Plot}</p>
                <div>
                  <p className="font-bold">Actors :</p>
                  <p>{dataDetail?.Actors}</p>
                </div>
                <div>
                  <p className="font-bold">Genre :</p>
                  <p>{dataDetail?.Genre}</p>
                </div>
                <div>
                  <p className="font-bold">Awards :</p>
                  <p>{dataDetail?.Awards}</p>
                </div>
                <div>
                  <p className="font-bold">Director :</p>
                  <p>{dataDetail?.Director}</p>
                </div>
                <div>
                  <p className="font-bold">Rated :</p>
                  <p>{dataDetail?.Rated}</p>
                </div>
                <div>
                  <p className="font-bold">Type :</p>
                  <p>{dataDetail?.Type}</p>
                </div>
              </div>
            </div>
          </>
        }
      />
    </div>
  );
}

export default Home;
