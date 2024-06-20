import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

function AnimatedMarker({ start, end, interval }) {
  const [position, setPosition] = useState(start);
  const [route, setRoute] = useState([]);
  const map = useMap();
  const markerRef = useRef(null);
  const routingControlRef = useRef(null);
  const deliveryId = 1; // Remplacez par l'ID de la livraison réelle

  useEffect(() => {
    if (!map) return;

    routingControlRef.current = L.Routing.control({
      waypoints: [
        L.latLng(start),
        L.latLng(end)
      ],
      createMarker: () => null, // We create a custom marker
    }).addTo(map);

    routingControlRef.current.on('routesfound', function (e) {
      const routes = e.routes[0].coordinates;
      setRoute(routes);
    });

    return () => {
      try {
        if (routingControlRef.current) {
          routingControlRef.current.getPlan().eachLayer(layer => {
            if (layer && map.hasLayer(layer)) {
              map.removeLayer(layer);
            }
          });
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        }
      } catch (error) {
        console.error('Error while cleaning up routing control:', error);
      }
    };
  }, [start, end, map]);

  useEffect(() => {
    if (route.length === 0) return;

    let index = 0;
    const intervalId = setInterval(async () => {
      if (index >= route.length) {
        clearInterval(intervalId);
        alert('Le livreur est arrivé à destination!');
      } else {
        const newPosition = route[index];
        setPosition(newPosition);
        await updateDeliveryPosition(deliveryId, newPosition);
        index += 1;
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [route, interval]);

  const updateDeliveryPosition = async (deliveryId, position) => {
    try {
      await axios.put(`http://localhost:3005/api/deliveries/${deliveryId}`, {
        latitude: position.lat,
        longitude: position.lng,
      });
    } catch (error) {
      console.error('Error updating delivery position:', error);
    }
  };

  return (
    <Marker position={position} ref={markerRef}>
      <Popup>Delivery in progress</Popup>
    </Marker>
  );
}

function DeliveryTrackingPage() {
  const start = [48.55445700, 7.68174900];
  const end = [48.5823368, 7.7368053];
  const interval = 100; // Adjust the interval value to change the speed

  let DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div>
      <h1>Delivery Tracking</h1>
      <MapContainer
        center={start}
        zoom={13}
        scrollWheelZoom={true} // Enable scroll wheel zoom
        style={{ height: "600px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AnimatedMarker start={start} end={end} interval={interval} />
        <Marker position={end}>
          <Popup>Destination</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default DeliveryTrackingPage;
