import React from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div style={{ color: 'red', fontWeight: 'bold' }}>{text}</div>;

const GoogleMapDisplay = () => {
  const mapStyles = {
    height: '100vh',
    width: '100%',
  };

  const defaultCenter = { lat: 0, lng: 0 }; 

  return (
    <div style={mapStyles}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'YOUR_GOOGLE_MAPS_API_KEY' }}
        defaultCenter={defaultCenter}
        defaultZoom={3}
      >
        <Marker lat={0} lng={0} text="Africa" />
        <Marker lat={35} lng={90} text="Asia" />
        <Marker lat={50} lng={15} text="Europe" />
        <Marker lat={45} lng={-95} text="North America" />
        <Marker lat={-15} lng={-55} text="South America" />
        <Marker lat={-25} lng={135} text="Australia" />
      </GoogleMapReact>
    </div>
  );
};

export default GoogleMapDisplay;
