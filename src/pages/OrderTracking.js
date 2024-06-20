import React from 'react';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const OrderTrackingContainer = styled.div`
  padding: 20px;
  color: white;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const MapSection = styled.div`
  height: 400px;
  width: 100%;
  margin-bottom: 20px;
`;

const ContactSection = styled.div`
  background-color: #34495e;
  border-radius: 10px;
  padding: 10px;
`;

const ContactTitle = styled.h2`
  margin-bottom: 10px;
`;

const OrderTracking = () => {
  return (
    <OrderTrackingContainer>
      <Title>Suivi de la commande</Title>
      <p>État actuel de la commande : En cours de livraison</p>
      <MapSection>
        <MapContainer center={[48.8566, 2.3522]} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[48.8566, 2.3522]}>
            <Popup>
              Livre ur ici
            </Popup>
          </Marker>
        </MapContainer>
      </MapSection>
      <ContactSection>
        <ContactTitle>Options de contact</ContactTitle>
        <p>Contacter la personne de livraison : 06 12 34 56 78</p>
        <p>Support : support@cesieat.com</p>
      </ContactSection>
    </OrderTrackingContainer>
  );
};

export default OrderTracking;