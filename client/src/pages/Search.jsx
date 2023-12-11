import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col mx-auto p-4">
      <div className="bg-blue-200 bg-opacity-25 flex flex-col  p-3 rounded-lg mx-auto">
        <form className="flex flex-row justify-center gap-2 text-blue-100">
          <div className="flex items-center gap-2">
            <input
              type="text"
              className="p-2 rounded-lg bg-blue-100 bg-opacity-25 text-blue-200   border-none gap-2 focus:outline-none"
              placeholder="Search..."
              id="searchTerm"
            />
          </div>
          <div className=" flex items-center gap-2 ">
            <select name="" id="sort_order" className="rounded-lg p-2 bg-blue-100 text-blue-500 bg-opacity-25">
              <option value="">Price High to Low</option>
              <option value="">Price Low to High</option>
              <option value="">Oldest</option>
              <option value="">Latest</option>
            </select>
          </div>
          <div className="flex rounded-lg text-blue-100 flex-wrap items-center my-2 gap-2 ">
            <div>
              <label>
                {" "}
                <input
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
