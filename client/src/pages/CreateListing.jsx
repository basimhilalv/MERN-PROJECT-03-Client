import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { app } from "../fireBase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listLoading, setListLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({
    offer: false,
    forRent: false,
    forSale: false,
    imageUrls: [],
    devices: [],
  });
  console.log(formData);
  console.log(images);
  const handleImageSubmit = (e) => {
    if (images.length > 0 && images.length + formData.imageUrls.length < 7) {
      setLoading(true);
      const promise = [];
      for (let i = 0; i < images.length; i++) {
        promise.push(storeImage(images[i]));
      }
      Promise.all(promise)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageError(false);
          setLoading(false);
        })
        .catch((err) => {
          setImageError("Image upload failed (maximum size 2MB)");
        });
    } else {
      setImageError("you can only upload maxiumum 6 images");
      setLoading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleDeviceChange = (e) => {
    if (e.target.checked) {
      setFormData({
        ...formData,
        devices: [...formData.devices, e.target.value],
      });
    } else {
      setFormData({
        ...formData,
        devices: formData.devices.filter((device) => device !== e.target.value),
      });
    }
  };
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }else {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleDeleteImage = (url) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((imgurl) => imgurl !== url),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      if (formData.imageUrls.length < 1) {
        return setError("Upload atleast 1 image to continue");
      }
      if (formData.discountPrice > formData.regularPrice) {
        return setError("Discount Price must be less than regular price");
      }
      setListLoading(true);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setListLoading(false);
        return;
      }
      setError(null);
      setListLoading(false);
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setListLoading(false);
      setError(error.message);
    }
  };

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
            minLength="3"
            onChange={handleChange}
            required
          />
          <textarea
            type="text"
            placeholder="Add Description..."
            className="border-none bg-blue-100 bg-opacity-25 text-blue-100 focus:outline-none p-3 rounded-lg"
            id="description"
            maxLength="150"
            minLength="3"
            onChange={handleChange}
            required
          ></textarea>
          <input
            type="text"
            placeholder="Created By"
            className="border-none bg-blue-100 text-blue-100 bg-opacity-25 p-3 focus:outline-none rounded-lg"
            id="created"
            maxLength="62"
            minLength="3"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Seller Info"
            className="border-none p-3 bg-blue-100 text-blue-100 bg-opacity-25 focus:outline-none rounded-lg"
            id="seller"
            maxLength="62"
            minLength="3"
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
          {/* <div className="bg-blue-100 bg-opacity-25  rounded-lg p-3">
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
          </div> */}
          {/* Rent or sale  */}
          <div className="flex bg-blue-100 bg-opacity-25 rounded-lg text-blue-100 flex-wrap justify-between gap-3 p-3 ">
            <div>
              <label>
                {" "}
                <input
                  type="checkbox"
                  onChange={handleChange}
                  value="true"
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
                  onChange={handleChange}
                  value="true"
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
                  onChange={handleChange}
                  value="true"
                  name="offer"
                  id="offer"
                />{" "}
                Offer
              </label>
            </div>
          </div>

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
              onChange={(e) => setImages(e.target.files)}
              className="rounded-lg bg-opacity-25 p-3 bg-blue-200"
              accept="image/*"
              multiple
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="bg-transparent border-green-500 border-solid border-2 font-semibold text-blue-200 rounded-lg p-3"
            >
              {loading ? "Uploading..." : "UPLOAD"}
            </button>
          </div>
          <p className="text-red-300 text-sm">{imageError && imageError}</p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url) => {
              console.log(url);
              return (
                <div
                  key={url}
                  className="flex justify-between items-center text-center bg-blue-100 p-3 rounded-lg bg-opacity-25"
                >
                  <img
                    src={url}
                    alt="listings_pics"
                    className="w-40 h-20 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      handleDeleteImage(url);
                    }}
                    className="bg-red-600 h-8 w-20 uppercase text-white font-semibold rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          <button
            disabled={loading || listLoading}
            type="submit"
            className=" bg-green-800 my-2 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 text-center"
          >
            {listLoading ? "Creating..." : "Create Listing"}
          </button>
          {error && <p className="text-red-500 text-sm mt-5"> {error} </p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
