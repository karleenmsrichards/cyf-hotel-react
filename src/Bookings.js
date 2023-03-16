import React from "react";
import Search from "./Search.js";
import SearchResults from "./SearchResults.js";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "./LoadingSpinner.js";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const search = searchVal => {
    console.log(`TO DO!", ${searchVal}`);
    const filteredBookings = bookings.filter(item => {
      return (
        item.firstName.toLowerCase().includes(searchVal) ||
        item.surname.toLowerCase().includes(searchVal)
      );
    });
    setBookings(filteredBookings, searchVal);
  };

  useEffect(() => {
    fetch("https://cyf-react.glitch.me")
      // fetch(`https://cyf-react.glitch.me/delayed`)
      // fetch("https://cyf-react.glitch.me/error")
      .then(response => {
        // console.log(response);
        // console.log(response.json());
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // console.log(data);
        setBookings(data);
      })
      .catch(error => {
        console.log(error);
        // setErrorMessage(`Error ${response.status}`);
      })
      .finally(() => setLoading(false));
  }, []);
  console.log(errorMessage);
  return (
    // <div className="App-content">
    //   <div className="container">
    loading === true ? (
      <LoadingSpinner />
    ) : !!errorMessage ? (
      <div>{errorMessage}</div>
    ) : (
      <div>
        <div>
          <Search findingCustomersInfo={search} />
          <SearchResults results={bookings} />
        </div>
      </div>
      // )
    )
  );
};

export default Bookings;
