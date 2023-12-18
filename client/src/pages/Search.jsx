import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [listing, setListing] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchData, setSearchData] = useState({
    searchTerm: "",
    sort: "createdAt",
    order: "desc",
    forSale: false,
    forRent: false,
    offer: false,
  });

  
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSearchData({ ...searchData, [e.target.id]: e.target.value });
    }
    if (e.target.type === "checkbox") {
      setSearchData({ ...searchData, [e.target.id]: e.target.checked });
    }
    if (e.target.id === "sort_order") {
      const order = e.target.value.split("_")[0] || "createdAt"
      const sort = e.target.value.split("_")[1] || "desc"
      setSearchData({
        ...searchData, sort, order
      })
    }
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm",searchData.searchTerm);
    urlParams.set("offer",searchData.offer);
    urlParams.set("forSale",searchData.forSale);
    urlParams.set("forRent",searchData.forRent);
    urlParams.set("sort",searchData.sort);
    urlParams.set("order",searchData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchQuery = urlParams.get('searchTerm');
    const offerQuery = urlParams.get('offer');
    const saleQuery = urlParams.get('forSale');
    const rentQuery = urlParams.get('forRent');
    const orderQuery = urlParams.get('order');
    const sortQuery = urlParams.get('sort');

    if(searchQuery || offerQuery || saleQuery || rentQuery || orderQuery || sortQuery){
      setSearchData({...searchData,
        searchTerm:searchQuery || "",
        order:orderQuery || "desc",
        sort:sortQuery || "createdAt",
        offer:offerQuery === "true" ? true :false,
        forSale:saleQuery === "true" ? true :false,
        forRent:rentQuery === "true" ? true :false
      });
    }

    const fetchList = async () => {
      setLoading(true);
      const searchOptions = urlParams.toString();
      const res = await fetch(`/api/listing/get-all?${searchOptions}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setLoading(false)
      setListing(data);
    };
    fetchList();
  }, [location.search]);

  console.log(listing)

  return (
    <div className="flex flex-col mx-auto p-4">
      <div className="bg-blue-200 bg-opacity-25 flex flex-col  p-3 rounded-lg mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-2 text-blue-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="p-2 rounded-lg bg-blue-100 bg-opacity-25 text-blue-200   border-none gap-2 focus:outline-none"
              placeholder="Search..."
              value={searchData.searchTerm}
              onChange={handleChange}
              id="searchTerm"
            />
          </div>
          <div className=" flex items-center gap-2 ">
            <select
              onChange={handleChange}
              name=""
              id="sort_order"
              className="focus:outline-none rounded-lg p-2 bg-blue-100 text-blue-100 bg-opacity-25"
            >
              <option value="regularPrice_desc" className="bg-blue-400">
                Price High to Low
              </option>
              <option value="regularPrice_asc" className="bg-blue-400">
                Price Low to High
              </option>
              <option value="createdAt_desc" className="bg-blue-400">
                Oldest
              </option>
              <option value="createdAt_asc" className="bg-blue-400">
                Latest
              </option>
            </select>
          </div>
          <div className="flex rounded-lg text-blue-100 flex-wrap items-center my-2 gap-2 ">
            <div>
              <label>
                {" "}
                <input
                checked={searchData.forSale}
                  onChange={handleChange}
                  type="checkbox"
                  className="w-5"
                  name="forSale"
                  id="forSale"
                />{" "}
                For Sale
              </label>
            </div>
            <div>
              <label>
                {" "}
                <input
                checked={searchData.forRent}
                  onChange={handleChange}
                  type="checkbox"
                  className="w-5"
                  name="forRent"
                  id="forRent"
                />{" "}
                For Rent (Monthly)
              </label>
            </div>
            <div>
              <label>
                {" "}
                <input
                checked={searchData.offer}
                  onChange={handleChange}
                  type="checkbox"
                  className="w-5"
                  name="offer"
                  id="offer"
                />{" "}
                Offer
              </label>
            </div>
          </div>

          <button className=" bg-green-800 my-2 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 text-center">
            Search
          </button>
        </form>
      </div>
      <div className="">Available Listings</div>
    </div>
  );
};

export default Search;
