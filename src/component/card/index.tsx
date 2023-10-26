import React from 'react'
import {MdAddShoppingCart} from 'react-icons/md'

interface Icard {
    title: string,
    type: string;
    img: string;
    year: string;
    price?: number | string;
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    cardClick?: ()=> void,
}
const Card: React.FC<Icard> = (props) => {
    return (
        <div className="w-full rounded overflow-hidden shadow-lg m-2 relative ">
              <img
                className="w-full h-[500px] cursor-pointer"
                src={props.img}
                alt="Sunset in the mountains"
                style={{
                objectFit:"cover"
                }}
                onClick={props.cardClick}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 min-h-[70px]">{props.title} ({props.year})</div>
                <p className=" p-2w-fit text-gray-700 text-base mb-8">{props.price}</p>
                <div className='flex justify-between'>
                <p className=" p-2 bg-slate-300 w-fit border rounded-md text-gray-700 text-base mb-8">{props.type}</p>
                <button
                onClick={props.onClick}
                className='bg-teal-600 text-white max-h-12 hover:bg-teal-500 border-0'
              >
                <div className='flex justify-between'>
                  <p>Add to chart</p>
                  <MdAddShoppingCart size={20} className={'ml-4'}/>
                </div>
              </button>
                </div>
               
              </div>
            </div>
    )

}
export default Card
  