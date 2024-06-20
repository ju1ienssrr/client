import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import 'leaflet-routing-machine';

function AnimatedMarker({ start, end, interval, onArrived }) {
  const [position, setPosition] = useState(start);
  const [route, setRoute] = useState([]);
  const map = useMap();
  const markerRef = useRef(null);
  const routingControlRef = useRef(null);

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
    const intervalId = setInterval(() => {
      if (index >= route.length) {
        clearInterval(intervalId);
        alert('Le livreur est arrivé à destination!');
        onArrived(); // Notify the parent component that the delivery has arrived
      } else {
        setPosition(route[index]);
        index += 1;
      }
    }, interval);

    return () => clearInterval(intervalId);
  }, [route, interval, onArrived]);

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
  const [orderStatus, setOrderStatus] = useState('En cours de livraison');

  const handleArrival = () => {
    setOrderStatus('Livré');
  };

  // Sample contact information
  const deliveryContact = {
    name: 'Jean Dupont',
    phone: '0123456789'
  };

  const supportContact = {
    email: 'support@deliveryapp.com',
    phone: '0987654321'
  };

  let DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div>
      <h1>Suivi de la commande</h1>
      <h2>État actuel : {orderStatus}</h2>
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
        <AnimatedMarker start={start} end={end} interval={interval} onArrived={handleArrival} />
        <Marker position={end}>
          <Popup>Destination</Popup>
        </Marker>
      </MapContainer>
      <div style={{ marginTop: '20px' }}>
        <h3>Informations de contact du livreur :</h3>
        <p>Nom : {deliveryContact.name}</p>
        <p>Téléphone : <a href={`tel:${deliveryContact.phone}`}>{deliveryContact.phone}</a></p>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Contact du support :</h3>
        <p>Email : <a href={`mailto:${supportContact.email}`}>{supportContact.email}</a></p>
        <p>Téléphone : <a href={`tel:${supportContact.phone}`}>{supportContact.phone}</a></p>
      </div>
    </div>
  );
}

export default DeliveryTrackingPage;
