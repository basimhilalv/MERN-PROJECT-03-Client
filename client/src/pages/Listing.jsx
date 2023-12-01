import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
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
        <div>
          <ImageSlider urls={listing.imageUrls} />
        </div>
      )}
    </main>
  );
};

export default Listing;
