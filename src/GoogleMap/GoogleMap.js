import React from "react";
import GoogleMapReact from "google-map-react";

const GoogleMap = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 6.672792,
      lng: -1.567306,
    },
    zoom: 15,
  };

  return (
    <div style={{ height: "100%", width: "100%", borderRadius: "40px" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBj4WJPBgp-ZDRPkCLNi5Afh61n6fVMQpQ" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <GoogleMap lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
}
