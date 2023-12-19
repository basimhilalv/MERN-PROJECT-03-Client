import React from 'react'
import { FaCode, FaShoppingCart  } from 'react-icons/fa';
import { MdOutlineDone, MdCurrencyRupee } from 'react-icons/md';
import { RxCross2 } from 'react-icons/rx';
import { Link } from 'react-router-dom';

const ListingTile = ({list}) => {
  return (

    <div>
        <Link to={`/listing/${list._id}`}>
        <div className="flex flex-col sm:flex-row mx-auto p-6 ">
            <div className="h-68 w-48 rounded-lg overflow-hidden align-middle items-center">
              <img
                src={list.imageUrls[0]}
                alt="gameCover"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="p-3 flex flex-col ">
              <span className="text-2xl text-blue-100 font-bold">
                {list.name}
              </span>
              <span className="text-md text-blue-200 font-semibold flex items-center mt-2 gap-2">
                <FaCode />
                {list.created}
              </span>
              <span className="text-md text-blue-200 font-semibold flex items-center gap-2">
                <FaShoppingCart />
                {list.seller}
              </span>
              {list.forSale ? (
                <p className="text-md text-green-400 font-semibold flex items-center gap-2">
                  <MdOutlineDone />
                  For Sale
                </p>
              ) : (
                <p>
                  <RxCross2 />
                  Not for sale
                </p>
              )}
              {list.forRent ? (
                <p className="text-md text-green-400 font-semibold flex items-center gap-2">
                  <MdOutlineDone />
                  For Rent
                </p>
              ) : (
                <p className="text-md text-red-500 font-semibold flex items-center gap-2">
                  <RxCross2 />
                  Not for Rent
                </p>
              )}
              {list.offer ? (
                <p className="text-md text-blue-200 font-semibold flex items-center gap-2">
                  <MdOutlineDone />
                  Discount
                </p>
              ) : (
                ""
              )}
              {list.offer ? (
                <div className="flex gap-2">
                  <button className="bg-red-700 justify-center h-8 p-2 text-white rounded-lg my-2 font-bold text-sm items-center mt-4 line-through gap-1 flex">
                    <MdCurrencyRupee className="text-xs mt-1" />
                    {list.regularPrice}
                  </button>
                  <button className="bg-green-700 justify-center h-10 p-3 text-white rounded-lg my-2 font-bold text-xl items-center gap-1 flex">
                    <MdCurrencyRupee className="text-sm mt-2" />
                    {list.discountPrice}
                  </button>
                </div>
              ) : (
                <div>
                  <button className="bg-green-700 justify-center h-10 p-3 text-white rounded-lg my-2 font-bold text-xl items-center gap-1 flex">
                    <MdCurrencyRupee className="text-sm mt-2" />
                    {list.regularPrice}
                  </button>
                </div>
              )}
            </div>
          </div>
          </Link>
    </div>
  )
}

export default ListingTile