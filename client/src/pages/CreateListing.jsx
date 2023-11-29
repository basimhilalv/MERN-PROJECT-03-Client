import React, { useState } from "react";

const CreateListing = () => {
  const [formData, setFormData] = useState({});
  const [devices, setDevices] = useState([]);
  const [images, setImages] = useState([]);
  console.log(formData);
  console.log(devices);
  console.log(images);
  const handleDeviceChange = (e) => {
    if (e.target.checked) {
      setDevices([...devices, e.target.value]);
    } else {
      setDevices(devices.filter((device) => device !== e.target.value));
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = () => {};

  return (
    <main className=" bg-blue-900 p-3 rounded-xl drop-shadow-2xl bg-opacity-50 max-w-4xl mx-auto my-7">
      <h1 className="text-3xl text-blue-200 font-bold text-center mb-7 mt-3">
        Create a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-3 mx-3 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border-none bg-blue-100 bg-opacity-25 text-blue-100 focus:outline-none p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            onChange={handleChange}
            required
          />
          <textarea
            type="text"
            placeholder="Add Description..."
            className="border-none bg-blue-100 bg-opacity-25 text-blue-100 focus:outline-none p-3 rounded-lg"
            id="description"
            maxLength="62"
            minLength="10"
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Created By"
            className="border-none bg-blue-100 text-blue-100 bg-opacity-25 p-3 focus:outline-none rounded-lg"
            id="created"
            maxLength="62"
            minLength="10"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Seller Info"
            className="border-none p-3 bg-blue-100 text-blue-100 bg-opacity-25 focus:outline-none rounded-lg"
            id="seller"
            maxLength="62"
            minLength="10"
            onChange={handleChange}
            required
          />
          {/* compatible devices */}
          <div className="bg-blue-100 bg-opacity-25 rounded-lg">
            <span className="text-blue-100 flex flex-col p-2">
              Compatible Devices :
              <div>
                <input
                  className="mx-2 bg-transparent border"
                  type="checkbox"
                  id="device1"
                  value="PC"
                  onChange={handleDeviceChange}
                />{" "}
                PC (Windows 10 & Above)
              </div>
              <div>
                <input
                  className="mx-2"
                  type="checkbox"
                  id="device2"
                  value="PS4"
                  onChange={handleDeviceChange}
                />{" "}
                Play Station 4
              </div>
              <div>
                <input
                  className="mx-2"
                  type="checkbox"
                  id="device3"
                  value="PS5"
                  onChange={handleDeviceChange}
                />{" "}
                Play Station 5
              </div>
              <div>
                {" "}
                <input
                  className="mx-2"
                  type="checkbox"
                  id="device4"
                  value="Xbox 3"
                  onChange={handleDeviceChange}
                />{" "}
                Xbox 3
              </div>
              <div>
                {" "}
                <input
                  className="mx-2"
                  type="checkbox"
                  id="device5"
                  value="Android OS"
                  onChange={handleDeviceChange}
                />{" "}
                Android OS
              </div>
              <div>
                <input
                  className="mx-2"
                  type="checkbox"
                  id="device6"
                  value="iOS"
                  onChange={handleDeviceChange}
                />{" "}
                iOS
              </div>
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-1 mx-3 gap-3">
          <div className="bg-blue-100 bg-opacity-25  rounded-lg p-3">
            <label className="text-blue-100 flex flex-row ">
              Offer Applicable :
              <input
                className="mx-2"
                type="radio"
                id="offer"
                name="offer"
                onChange={handleChange}
                value="true"
              />{" "}
              Yes
              <input
                className="mx-2"
                type="radio"
                id="offer"
                name="offer"
                onChange={handleChange}
                value="false"
              />{" "}
              No
            </label>
            <label className="text-blue-100 flex flex-row ">
              For Sale :
              <input
                className="mx-2"
                type="radio"
                id="forSale"
                name="forSale"
                onChange={handleChange}
                value="true"
              />{" "}
              Yes
              <input
                className="mx-2"
                type="radio"
                id="forSale"
                name="forSale"
                onChange={handleChange}
                value="false"
              />{" "}
              No
            </label>
            <label className="text-blue-100 flex flex-row ">
              For Rent :
              <input
                className="mx-2"
                type="radio"
                id="forRent"
                name="forRent"
                onChange={handleChange}
                value="true"
              />{" "}
              Yes
              <input
                className="mx-2"
                type="radio"
                id="forRent"
                name="forRent"
                onChange={handleChange}
                value="false"
              />{" "}
              No
            </label>
          </div>
          {/* Rent or sale  */}
          {/* <div className="flex bg-blue-100 bg-opacity-25 rounded-lg text-blue-100 flex-wrap gap-3 p-3 ">
            <div>
              <label for="forSale">
                {" "}
                <input type="checkbox" onChange={handleChange} value='true' name="forSale" id="forSale" /> For Sale
              </label>
            </div>
            <div>
              <label for="forSale">
                {" "}
                <input type="checkbox" onChange={handleChange} value='true' name="forRent" id="forRent" /> For Rent
                (Per Month)
              </label>
            </div>
          </div> */}

          <div className="flex flex-row gap-3 text-blue-200">
            <input
              className="border-none bg-blue-100 bg-opacity-25 p-3 focus:outline-none max-h-12  rounded-lg"
              type="number"
              placeholder="Regular Price"
              onChange={handleChange}
              id="regularPrice"
            />
            <input
              className="border-none bg-blue-100 bg-opacity-25 p-3 focus:outline-none max-h-12 rounded-lg"
              type="number"
              id="discountPrice"
              onChange={handleChange}
              placeholder="Discount Price"
            />
          </div>

          <p className="font-semibold text-blue-200">
            Images:
            <span className="font-normal ml-2">
              The first image will be the cover. Maximum 6 files can be uploaded
            </span>
          </p>
          <div className=" text-blue-100 rounded-lg flex items-center justify-between">
            <input
              type="file"
              id="images"
              onChange={(e)=> setImages(e.target.files)}
              className="rounded-lg bg-opacity-25 p-3 bg-blue-200"
              accept="image/*"
              multiple
            />
            <button className="bg-transparent border-green-500 border-solid border-2 font-semibold text-blue-200 rounded-lg p-3">
              Upload
            </button>
          </div>

          <button className=" bg-green-800 my-2 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 text-center">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
