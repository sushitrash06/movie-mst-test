import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { FaShoppingBag } from "react-icons/fa";
import { useAppSelector } from "../../stores/store";
import { movieItems } from "../../stores/slices/types";
import { useDispatch } from "react-redux";
import { addToCart, removeCart, resetCart } from "../../stores/slices/cartSlice";
import { formatImdbIDToRupiahCart, rupiahToNumber } from "../../utils";
import { Modals } from "../Modals";
import {AiFillCheckCircle} from 'react-icons/ai'

interface MovieItemWithQuantity extends movieItems {
  quantity?: number;
}

export default function Navigate() {
  const { movie } = useAppSelector((s) => s.cart);
  const dispatch = useDispatch()

  const transformData = () => {
    const transformedData: MovieItemWithQuantity[] = [];

    for (const item of movie) {
      const existingItem = transformedData.find((t) => t.imdbID === item.imdbID);

      if (existingItem) {
        existingItem.quantity && existingItem.quantity++;
      } else {
        const newItem: MovieItemWithQuantity = { ...item, quantity: 1 };
        transformedData.push(newItem);
      }
    }

    return transformedData;
  };

  const transformedMovieData = transformData();
  const [openModal, setOpenModal] = useState<boolean>(false);
  
  const [openModalSukses, setOpenModalSukses] = useState<boolean>(false);

  console.log(transformedMovieData)

  return (
    <>
     <Disclosure as="nav" className="bg-gray-800">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <p className="text-xl font-bold text-white">Movie Love</p>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <div className="relative inline-flex items-center  px-2.5 py-1.5 text-xs font-medium">
                        {movie.length > 0 && (
                          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-600 flex justify-center items-center items">
                            <span>{movie.length}</span>
                          </span>
                        )}

                        <FaShoppingBag
                          className="block h-6 w-6"
                          aria-hidden="true"
                          color="white"
                        />
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 w-[350px] z-10 mt-2 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {transformedMovieData.length === 0 && (
                        <div className="m-8">
                          <p>Data Kosong</p>
                        </div>
                      )}
                      {transformedMovieData.map((data,index) => {
                        const price =  data?.price ? rupiahToNumber(data.price) : 0;
                        const quantity = data.quantity ?? 0
                        const dataRupiahQuantity = price * quantity;
                        return (
                          <div key={data.imdbID} className="flex m-5 justify-between">
                            <img
                              src={data.Poster}
                              style={{
                                width: "100px",
                                marginRight: "15px",
                              }}
                              alt="cart"
                            />
                            <div className="max-w-[230px] min-w-[230px]">
                              <p className="font-bold">{data.Title}</p>
                              <p className="font-bold">quantity :</p>
                              <p>{data.quantity}</p>
                              <p className="font-bold">Price :</p>
                              <p>
                              {formatImdbIDToRupiahCart(dataRupiahQuantity)}
                              </p>
                              <div>
                                <button
                                className="bg-slate-600 text-white mr-4"
                                  onClick={() => {
                                    dispatch(removeCart(index))
                                  }}
                                >
                                  -
                                </button>
                                <button
                                className="bg-slate-600 text-white"
                                  onClick={() => {
                                    dispatch(addToCart(data))
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      {
                        transformedMovieData.length > 0 && (
<div>
                      <button onClick={()=>{
                        setOpenModal(true)
                      }} className="bg-slate-600 text-white m-4">Check out</button>
                       <button onClick={()=>{
                        dispatch(resetCart())
                      }} className="bg-red-500 text-white m-4">Hapus Semua</button>
                      </div>
                        )
                      }
                      
                    
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
      
    </Disclosure>
    <Modals
        open={openModal}
        setOpen={setOpenModal}
        children={
          <>
            <p className="text-2xl font-bold">
              Checkout
            </p>
            <div className="mt-8">
            {transformedMovieData.map((data) => {
                        const price =  data?.price ? rupiahToNumber(data.price) : 0;
                        const quantity = data.quantity ?? 0
                        const dataRupiahQuantity = price * quantity;
                        return (
                          <div key={data.imdbID} className="flex m-5 justify-between">
                            <img
                              src={data.Poster}
                              style={{
                                width: "100px",
                                marginRight: "15px",
                              }}
                              alt="cart"
                            />
                            <div className="max-w-[230px] min-w-[230px]">
                              <p className="font-bold">{data.Title}</p>
                              <p className="font-bold">quantity :</p>
                              <p>{data.quantity}</p>
                              <p className="font-bold">Price :</p>
                              <p>
                              {formatImdbIDToRupiahCart(dataRupiahQuantity)}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    
            </div>
            <button className="bg-slate-600 text-white" onClick={()=>{
                setOpenModal(false)
                setOpenModalSukses(true)
            }}>Check out</button>
          </>
        }
      />
       <Modals
        open={openModalSukses}
        setOpen={setOpenModalSukses}
        children={
          <>
            <div className="mt-8 text-center m-auto items-center">
                <AiFillCheckCircle className="text-green-500 m-[25%]" size={70}/>
                <p className="font-bold text-5xl">Sukses</p>
                <button className="w-full mt-5 bg-slate-600 text-white" onClick={()=>{
                setOpenModalSukses(false)
                dispatch(resetCart())
            }}>OK</button>
            </div>
            
          </>
        }
      />
    </>
   
  );
}
