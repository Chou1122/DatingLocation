import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster";
import "leaflet-routing-machine";
import { useEffect, useState } from "react";

const MapComponent = () => {
  const [category, setCategory] = useState("hotel");
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [highlightedLocation, setHighlightedLocation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);
  const [placeDetails, setPlaceDetails] = useState(null); // Thêm state để lưu chi tiết

  const hotelIcon = L.icon({
    iconUrl: "https://image.flaticon.com/icons/png/128/149/149060.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  const cafeIcon = L.icon({
    iconUrl: "https://image.flaticon.com/icons/png/128/149/149059.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  // Khởi tạo bản đồ
  useEffect(() => {
    const mapInstance = L.map("map").setView([21.028511, 105.804817], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(mapInstance);

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, []);

  // Tìm kiếm các địa điểm
  useEffect(() => {
    if (!map) return;

    const markers = L.markerClusterGroup();

    const fetchPlaces = () => {
      const query = `[out:json];node(around:1000,21.028511,105.804817)[${
        category === "hotel" ? "tourism=hotel" : "amenity=cafe"
      }];out body;`;

      fetch(
        `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(
          query
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          markers.clearLayers();
          const fetchedPlaces = data.elements
            .slice(0, 10)
            .map((element, index) => ({
              id: index,
              lat: element.lat,
              lon: element.lon,
              type: category === "hotel" ? "Khách sạn" : "Quán cà phê",
            }));

          setPlaces(fetchedPlaces);
          setIsSearching(true);

          fetchedPlaces.forEach((place) => {
            const marker = L.marker([place.lat, place.lon], {
              icon: category === "hotel" ? hotelIcon : cafeIcon,
            }).bindPopup(
              `<b>${place.type}</b><br>Lat: ${place.lat}<br>Lon: ${place.lon}`
            );
            markers.addLayer(marker);
          });

          map.addLayer(markers);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    fetchPlaces();

    return () => {
      markers.clearLayers();
    };
  }, [category, map]);

  const handlePlaceClick = async (lat, lon) => {
    if (map) {
      setHighlightedLocation([lat, lon]);
      map.flyTo([lat, lon], 18);

      try {
        // Gọi API để lấy chi tiết địa điểm
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const data = await response.json();
        setPlaceDetails(data);
      } catch (error) {
        console.error("Error fetching place details:", error);
      }
    }
  };

  const handleStopSearching = () => {
    setPlaces([]);
    setIsSearching(false);
    setHighlightedLocation(null);
    setPlaceDetails(null); // Xóa thông tin chi tiết khi tắt tìm kiếm
    if (map) {
      map.setView([21.028511, 105.804817], 13);
    }
  };

  // Hiển thị đường đi
  useEffect(() => {
    if (highlightedLocation && currentPosition && map) {
      if (routingControl) {
        map.removeControl(routingControl);
      }

      const newRoutingControl = L.Routing.control({
        waypoints: [
          L.latLng(currentPosition.lat, currentPosition.lon),
          L.latLng(highlightedLocation[0], highlightedLocation[1]),
        ],
        lineOptions: {
          styles: [
            {
              color: "blue",
              weight: 8,
              opacity: 0.7,
            },
          ],
        },
        createMarker: () => null,
        routeWhileDragging: false,
        addWaypoints: false,
        show: true,
        showAlternatives: true,
        altLineOptions: {
          styles: [{ color: "green", weight: 6, opacity: 0.7 }],
        },
        formatter: new L.Routing.Formatter({
          formatDistance: function (distance) {
            return distance > 1000
              ? (distance / 1000).toFixed(2) + " km"
              : Math.round(distance) + " m";
          },
          formatTime: function (time) {
            const hours = Math.floor(time / 3600);
            const minutes = Math.round((time % 3600) / 60);
            return hours > 0
              ? `${hours} giờ ${minutes} phút`
              : `${minutes} phút`;
          },
          formatInstruction: function () {
            return "";
          },
        }),
        itineraryClassName: "custom-itinerary",
      }).addTo(map);

      setRoutingControl(newRoutingControl);
    }
  }, [highlightedLocation, currentPosition, map]);

  const handleFocusCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lon: longitude });

          if (map) {
            map.flyTo([latitude, longitude], 18);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Không thể lấy vị trí hiện tại của bạn.");
        }
      );
    } else {
      alert("Trình duyệt của bạn không hỗ trợ geolocation.");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100%" }}>
      <div
        style={{
          width: "300px",
          padding: "10px",
          backgroundColor: "#f4f4f4",
          overflowY: "scroll",
        }}
      >
        <h3>
          {category === "hotel"
            ? "Danh sách Khách sạn"
            : "Danh sách Quán cà phê"}
        </h3>
        {isSearching && (
          <>
            <ul>
              {places.map((place) => (
                <li
                  key={place.id}
                  style={{ cursor: "pointer", marginBottom: "10px" }}
                  onClick={() => handlePlaceClick(place.lat, place.lon)}
                >
                  <b>{place.type}</b> - Lat: {place.lat}, Lon: {place.lon}
                </li>
              ))}
            </ul>
            <button onClick={handleStopSearching} style={{ marginTop: "10px" }}>
              Tắt tìm kiếm
            </button>
          </>
        )}
        {!isSearching && (
          <>
            <button
              onClick={() => {
                setCategory("hotel");
                setIsSearching(true);
              }}
            >
              Tìm Khách sạn
            </button>
            <button
              onClick={() => {
                setCategory("cafe");
                setIsSearching(true);
              }}
            >
              Tìm Quán cà phê
            </button>
          </>
        )}

        {placeDetails && (
          <div
            style={{
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#fff",
              borderRadius: "5px",
            }}
          >
            <h4>Thông tin chi tiết</h4>
            <p>
              <strong>Tên:</strong> {placeDetails.display_name}
            </p>
            <p>
              <strong>Vĩ độ:</strong> {placeDetails.lat}
            </p>
            <p>
              <strong>Kinh độ:</strong> {placeDetails.lon}
            </p>
          </div>
        )}

        <button
          onClick={handleFocusCurrentLocation}
          style={{ marginTop: "10px" }}
        >
          Focus Vị trí Hiện tại
        </button>
      </div>

      <div id="map" style={{ height: "100%", width: "100%" }} />
      <style>
        {`
          .leaflet-routing-container {
            background-color: white !important;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
            border-radius: 8px;
          }

          .leaflet-routing-container .leaflet-routing-alt {
            background-color: #f7f7f7 !important;
          }
        `}
      </style>
    </div>
  );
};

export default MapComponent;
