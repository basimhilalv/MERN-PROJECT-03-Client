import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaCode,
  FaShoppingCart,
  FaWindows,
  FaApple,
  FaXbox,
  FaPlaystation,
} from "react-icons/fa";
import { DiAndroid } from "react-icons/di";
import { MdOutlineDone, MdCurrencyRupee } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import ImageSlider from "../components/ImageSlider";
const Listing = () => {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const listId = params.id;
        const res = await fetch(`/api/listing/${listId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchList();
  }, [params.id]);

  console.log(listing);
  return (
    <main>
      {loading && (
        <p className="text-center text-white text-lg my-7">Loading...</p>
      )}
      {error && (
        <p className="text-center text-white text-lg my-7">
          Something Went Wrong
        </p>
      )}
      {listing && !loading && !error && (
        <div className="flex my-6 flex-col max-w-5xl mx-auto rounded-lg bg-blue-900 overflow-hidden drop-shadow-2xl bg-opacity-50">
          <div className="">
            <ImageSlider urls={listing.imageUrls} />
          </div>
          <div className="flex flex-col sm:flex-row mx-auto p-6">
            <div className="">
              <img
                src={listing.imageUrls[0]}
                alt="gameCover"
                className="w-44 rounded-lg"
              />
            </div>
            <div className="p-3 flex flex-col">
              <span className="text-2xl text-blue-100 font-bold">
                {listing.name}
              </span>
              <span className="text-md text-blue-200 font-semibold flex items-center mt-2 gap-2">
                <FaCode />
                {listing.created}
              </span>
              <span className="text-md text-blue-200 font-semibold flex items-center gap-2">
                <FaShoppingCart />
                {listing.seller}
              </span>
              {listing.forSale ? (
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
              {listing.forRent ? (
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
              {listing.offer ? (
                <p className="text-md text-blue-200 font-semibold flex items-center gap-2">
                  <MdOutlineDone />
                  Discount
                </p>
              ) : (
                ""
              )}
              {listing.offer ? (
                <div className="flex gap-2">
                  <button className="bg-red-700 justify-center h-8 p-2 text-white rounded-lg my-2 font-bold text-sm items-center mt-4 line-through gap-1 flex">
                    <MdCurrencyRupee className="text-xs mt-1" />
                    {listing.regularPrice}
                  </button>
                  <button className="bg-green-700 justify-center h-10 p-3 text-white rounded-lg my-2 font-bold text-xl items-center gap-1 flex">
                    <MdCurrencyRupee className="text-sm mt-2" />
                    {listing.discountPrice}
                  </button>
                </div>
              ) : (
                <div>
                  <button className="bg-green-700 justify-center h-10 p-3 text-white rounded-lg my-2 font-bold text-xl items-center gap-1 flex">
                    <MdCurrencyRupee className="text-sm mt-2" />
                    {listing.regularPrice}
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="bg-blue-100 bg-opacity-10 flex flex-col mx-auto max-w-3xl rounded-lg mb-3 p-4 w-[75%]">
            <p className="p-2 text-blue-200">
              <span className=" text-blue-100 font-semibold my-2 mx-auto rounded-lg h-10">
                Description:{" "}
              </span>
              {listing.description}. purchase now and experience the new world.
              compatible devices of this amazing game is listed below.
            </p>
            <p className="p-2 flex flex-wrap text-blue-100 font-semibold gap-4">
              {listing.devices.includes("PC") && (
                <span className="flex items-center gap-1">
                  <FaWindows className="text-blue-500" />
                  Windows
                </span>
              )}
              {listing.devices.includes("PS5") && (
                <span className="flex items-center gap-1">
                  <FaPlaystation className="text-blue-950" />
                  PlayStation 5
                </span>
              )}
              {listing.devices.includes("PS4") && (
                <span className="flex items-center gap-1">
                  <FaPlaystation className="text-blue-200" />
                  PlayStation 4
                </span>
              )}
              {listing.devices.includes("Xbox 3") && (
                <span className="flex items-center gap-1">
                  <FaXbox className="text-green-500" />
                  Xbox
                </span>
              )}
              {listing.devices.includes("Android OS") && (
                <span className="flex items-center gap-1">
                  <DiAndroid className="text-green-600" />
                  Android
                </span>
              )}
              {listing.devices.includes("iOS") && (
                <span className="flex items-center gap-1">
                  <FaApple className="text-gray-900" />
                  iOS
                </span>
              )}
            </p>
            
          </div>
        </div>
      )}
    </main>
  );
};

export default Listing;
