import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/swiper-bundle.css";
import { SwiperSlide,Swiper } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import Listing from "../components/ListingTile";


const Home = () => {
  SwiperCore.use([Navigation]);
  const [offerList, setOfferList] = useState([]);
  const [rentList, setRentList] = useState([]);
  const [saleList, setSaleList] = useState([]);

  useEffect(() => {
    const fetchOfferList = async () => {
      try {
        const res = await fetch("/api/listing/get-all?offer=true&limit=3");
        const data = await res.json();
        setOfferList(data);
        fetchRentList();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentList = async () => {
      try {
        const res = await fetch("/api/listing/get-all?forRent=true&limit=3");
        const data = await res.json();
        setRentList(data);
        fetchSaleList();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleList = async () => {
      try {
        const res = await fetch("/api/listing/get-all?forSale=true&limit=3");
        const data = await res.json();
        setSaleList(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferList();
  }, []);

  console.log(offerList);
  console.log(saleList);
  console.log(rentList);
  return (
    <div>
      <div className="max-w-6xl m-auto p-28 px-3 flex flex-col ">
        <h1 className="text-blue-200 font-bold text-3xl sm:text-6xl">
          Experience your <span className="text-blue-400">dream</span> <br /> world
          from us.
        </h1>
        <p className="text-gray-400 text-sm my-4">
          Experience the virtual world of gaming for all. <br /> baz.playz brings the
          best for your choice.{" "}
        </p>
        <Link to={"/search/"}>
          <p className="text-lg text-blue-800">Lets get started...</p>
        </Link>
      </div>
      <div>
        <Swiper navigation>
          {offerList &&
            offerList.length > 0 &&
            offerList.map((list) => (
              <SwiperSlide>
                <div
                  key={list._id}
                  className="h-[400px]"
                  style={{
                    background: `url(${list.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="flex flex-col max-w-7xl mx-auto p-3 gap-8 my-10">
        <div className="flex flex-row">
        {offerList && offerList.length > 0 && (
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl text-blue-200 font-semibold">Recent offers</h1>
              <Link to={"/search/"} className="text-blue-400 text-sm">
                Show more offers
              </Link>
            </div>
            <div className="flex sm:flex-row flex-col">
              {offerList.map((list)=><Listing list={list}/>)}
            </div>
          </div>
          ) } 
        </div>
        <div className="flex flex-row">
        {rentList && rentList.length > 0 && (
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl text-blue-200 font-semibold">Rent for a month</h1>
              <Link to={"/search/"} className="text-blue-400 text-sm">
                Show more offers
              </Link>
            </div>
            <div className="flex sm:flex-row flex-col">
              {rentList.map((list)=><Listing list={list}/>)}
            </div>
          </div>
          ) } 
        </div>
        <div className="flex flex-row">
        {saleList && saleList.length > 0 && (
          <div className="flex flex-col">
            <div>
              <h1 className="text-3xl text-blue-200 font-semibold">For Sale</h1>
              <Link to={"/search/"} className="text-blue-400 text-sm">
                Show more offers
              </Link>
            </div>
            <div className="flex sm:flex-row flex-col">
              {saleList.map((list)=><Listing list={list}/>)}
            </div>
          </div>
          ) } 
        </div>
        
      </div>
    </div>
  );
};

export default Home;
