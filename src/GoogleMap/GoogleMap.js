import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function GoogleMapDisplay() {
  const defaultProps = {
    center: {
      lat: 6.67307,
      lng: -1.566937,
    },
    zoom: 15,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {/* <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" /> */}
      </GoogleMapReact>
    </div>
  );
}
