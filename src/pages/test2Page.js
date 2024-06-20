import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

function LiveMarker({ deliveryId, interval }) {
  const [position, setPosition] = useState([0, 0]); // Initialiser avec une position par défaut
  const markerRef = useRef(null);

  useEffect(() => {
    const fetchDeliveryPosition = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/api/deliveries/${deliveryId}`);
        const { latitude, longitude } = response.data;
        setPosition([latitude, longitude]);
      } catch (error) {
        console.error('Error fetching delivery position:', error);
      }
    };

    const intervalId = setInterval(fetchDeliveryPosition, interval);

    return () => clearInterval(intervalId);
  }, [deliveryId, interval]);

  return (
    <Marker position={position} ref={markerRef}>
      <Popup>Delivery in progress</Popup>
    </Marker>
  );
}

function TestPage2() {
  const deliveryId = 1; // Remplacez par l'ID de la livraison réelle
  const interval = 1000; // Intervalle de 1 seconde

  let DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div>
      <h1>Live Delivery Tracking</h1>
      <MapContainer
        center={[48.55445700, 7.68174900]} // Position initiale
        zoom={13}
        scrollWheelZoom={true} // Enable scroll wheel zoom
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LiveMarker deliveryId={deliveryId} interval={interval} />
      </MapContainer>
    </div>
  );
}

export default TestPage2;
