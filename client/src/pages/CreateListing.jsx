import React from "react";

const CreateListing = () => {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-blue-200 font-bold text-center my-7">
        Create a Listing
      </h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-3 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border-none  focus:outline-none p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Add Description..."
            className="border-none focus:outline-none p-3 rounded-lg"
            id="description"
            maxLength="62"
            minLength="10"
            required
          ></textarea>
          <input
            type="text"
            placeholder="Created By"
            className="border-none p-3 focus:outline-none rounded-lg"
            id="created"
            maxLength="62"
            minLength="10"
            required
          />
          <input
            type="text"
            placeholder="Seller Info"
            className="border-none p-3 focus:outline-none rounded-lg"
            id="seller"
            maxLength="62"
            minLength="10"
            required
          />
          <label
            className="text-blue-300 flex flex-col p-2"
            for="compatibility"
          >
            Compatible Devices :
            <div>
              <input
                className="mx-2"
                type="checkbox"
                id="compatibility"
                value="PC"
              />{" "}
              PC (Windows 10 & Above)
            </div>
            <div>
              <input
                className="mx-2"
                type="checkbox"
                id="compatibility"
                value="PS4"
              />{" "}
              Play Station 4
            </div>
            <div>
              <input
                className="mx-2"
                type="checkbox"
                id="compatibility"
                value="PS5"
              />{" "}
              Play Station 5
            </div>
            <div>
              {" "}
              <input
                className="mx-2"
                type="checkbox"
                id="compatibility"
                value="Xbox 3"
              />{" "}
              Xbox 3
            </div>
            <div>
              {" "}
              <input
                className="mx-2"
                type="checkbox"
                id="compatibility"
                value="Android OS"
              />{" "}
              Android OS
            </div>
            <div>
              <input
                className="mx-2"
                type="checkbox"
                id="compatibility"
                value="iOS"
              />{" "}
              iOS
            </div>
          </label>
          <div>
            <label for="offer" className="text-blue-300 flex flex-row p-1">
              Offer Applicable :
              <input
                className="mx-2"
                type="radio"
                id="offer"
                name="offer"
                value="true"
              />{" "}
              Yes
              <input
                className="mx-2"
                type="radio"
                id="offer"
                name="offer"
                value="false"
              />{" "}
              No
            </label>
          </div>
        </div>
        <div className="flex flex-col flex-1 mx-3 gap-3">
            <div className="flex text-blue-200 flex-wrap gap-3 p-2">
                <div>
                <label for="forSale"> <input type="checkbox" name="forSale" id="forSale" /> For Sale</label>
                </div>
                <div>
                <label for="forSale"> <input type="checkbox" name='forRent' id="forRent" /> For Rent</label>
                </div>
            </div>
          <div className="flex flex-row gap-3 text-blue-200">
            <input
              className="border-none p-3 focus:outline-none max-h-12  rounded-lg"
              type="number"
              placeholder="Regular Price"
              id="regularPrice"
            />
            <input
              className="border-none p-3 focus:outline-none max-h-12 rounded-lg"
              type="number"
              id="discountPrice"
              placeholder="Discount Price"
            />
          </div>

          <p className="font-semibold text-blue-200">
            Images:
            <span className="font-normal">
              The first image will be the cover. Maximum 6 files can be uploaded
            </span>
          </p>
          <div className="bg-white rounded-lg p-2 flex items-center justify-between">
            <input type="file" id="images" accept="image/*" multiple />
            <button className="bg-transparent border-green-500 border-solid border-2 font-semibold text-green-800 rounded-lg p-2">
              Upload
            </button>
          </div>
          
        <button className=" bg-green-800 my-2 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 text-center">Create Listing</button>
      
        </div>
        </form>
    </main>
  );
};

export default CreateListing;
