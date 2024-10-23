import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster';
import 'leaflet-routing-machine';
import { useEffect, useState } from 'react';

const MapComponent = () => {
  const [category, setCategory] = useState('hotel');
  const [map, setMap] = useState(null);
  const [places, setPlaces] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [highlightedLocation, setHighlightedLocation] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [routingControl, setRoutingControl] = useState(null);

  const hotelIcon = L.icon({
    iconUrl: 'https://image.flaticon.com/icons/png/128/149/149060.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  const cafeIcon = L.icon({
    iconUrl: 'https://image.flaticon.com/icons/png/128/149/149059.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -41],
  });

  // Khởi tạo bản đồ
  useEffect(() => {
    const mapInstance = L.map('map').setView([21.028511, 105.804817], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
      const query = `[out:json];node(around:1000,21.028511,105.804817)[${category === 'hotel' ? 'tourism=hotel' : 'amenity=cafe'}];out body;`;

      fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
          markers.clearLayers();
          const fetchedPlaces = data.elements.slice(0, 10).map((element, index) => ({
            id: index,
            lat: element.lat,
            lon: element.lon,
            type: category === 'hotel' ? 'Khách sạn' : 'Quán cà phê',
          }));

          setPlaces(fetchedPlaces);
          setIsSearching(true);

          fetchedPlaces.forEach(place => {
            const marker = L.marker([place.lat, place.lon], {
              icon: category === 'hotel' ? hotelIcon : cafeIcon,
            }).bindPopup(`<b>${place.type}</b><br>Lat: ${place.lat}<br>Lon: ${place.lon}`);
            markers.addLayer(marker);
          });

          map.addLayer(markers);
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    fetchPlaces();

    return () => {
      markers.clearLayers();
    };
  }, [category, map]);

  const handlePlaceClick = (lat, lon) => {
    if (map) {
      setHighlightedLocation([lat, lon]);
      map.flyTo([lat, lon], 18);
    }
  };

  const handleStopSearching = () => {
    setPlaces([]);
    setIsSearching(false);
    setHighlightedLocation(null);
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
          L.latLng(highlightedLocation[0], highlightedLocation[1])
        ],
        lineOptions: {
          styles: [
            {
              color: 'blue',  // Màu của đường đi
              weight: 8,      // Độ rộng của đường đi
              opacity: 0.7    // Độ trong suốt của đường
            }
          ]
        },
        createMarker: () => null,  // Ẩn các waypoint marker
        show: false,  // Ẩn danh sách các hướng dẫn
        addWaypoints: false,  // Không cho phép thêm waypoint
      }).addTo(map);

      setRoutingControl(newRoutingControl);
    }
  }, [highlightedLocation, currentPosition, map]);

  // Lấy vị trí hiện tại của người dùng
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
          console.error('Error getting location:', error);
          alert('Không thể lấy vị trí hiện tại của bạn.');
        }
      );
    } else {
      alert('Trình duyệt của bạn không hỗ trợ geolocation.');
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div style={{ width: '300px', padding: '10px', backgroundColor: '#f4f4f4', overflowY: 'scroll' }}>
        <h3>{category === 'hotel' ? 'Danh sách Khách sạn' : 'Danh sách Quán cà phê'}</h3>
        {isSearching && (
          <>
            <ul>
              {places.map((place) => (
                <li key={place.id} style={{ cursor: 'pointer', marginBottom: '10px' }} onClick={() => handlePlaceClick(place.lat, place.lon)}>
                  <b>{place.type}</b> - Lat: {place.lat}, Lon: {place.lon}
                </li>
              ))}
            </ul>
            <button onClick={handleStopSearching} style={{ marginTop: '10px' }}>Tắt tìm kiếm</button>
          </>
        )}
        {!isSearching && (
          <>
            <button onClick={() => { setCategory('hotel'); setIsSearching(true); }}>Tìm Khách sạn</button>
            <button onClick={() => { setCategory('cafe'); setIsSearching(true); }}>Tìm Quán cà phê</button>
          </>
        )}

        <button onClick={handleFocusCurrentLocation} style={{ marginTop: '10px' }}>Focus Vị trí Hiện tại</button>
      </div>

      <div id="map" style={{ height: '100%', width: '100%' }} />
    </div>
  );
};

export default MapComponent;
