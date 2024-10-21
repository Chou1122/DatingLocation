import React, { useState } from "react";

const Location = () => {
  const [location, setLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <h1>Get Current Location</h1>
      <button onClick={getLocation}>Get Location</button>
      {location.latitude && location.longitude ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      ) : (
        <p>{error ? `Error: ${error}` : "Location not available"}</p>
      )}
    </div>
  );
};

export default Location;