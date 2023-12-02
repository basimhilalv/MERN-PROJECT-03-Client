import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Contact = ({ listing }) => {
  const [seller, setSeller] = useState(null);
  const [error, SetError] = useState(false);
  const [message, setMessage] = useState("");
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    SetError(false);
    const fetchSeller = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setSeller(data);
        SetError(false);
      } catch (error) {
        SetError(error.message);
      }
    };
    fetchSeller();
  }, [listing.userRef]);

  return (
    <div>
      {seller && (
        <div className="flex flex-col gap-2">
          <p className="text-blue-100">
            Contact <span className="font-semibold">{seller.username}</span> for{" "}
            <span className="font-semibold">{listing.name}</span>{" "}
          </p>
          <textarea
            value={message}
            name="message"
            id="message"
            onChange={handleChange}
            rows="2"
            placeholder="Write a querry ..."
            className="w-full focus:outline-none text-blue-100 bg-blue-200 bg-opacity-25 p-3 rounded-lg"
          ></textarea>
          <Link to={`mailto:${seller.email}?subject=Regarding ${listing.name}&body=${message}`} className='bg-blue-600 text-white uppercase rounded-lg hover:opacity-80 text-center p-3' >Send Message
          </Link>
        </div>
      )}
    </div>
  );
};

export default Contact;
