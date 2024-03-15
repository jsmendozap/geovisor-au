import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { FeatureLayer } from "react-esri-leaflet";

const LeafletMap = () => {
  const tooltip = (feature, layer) => {
    layer.on({
      mouseover: () => {
        setHoveredFeature(feature);
      },
      mouseout: () => {
        setHoveredFeature(null);
      },
    });
  };

  const setColor = ({ properties }) => {
    return { weight: 0.7, color: "lightblue" };
  };

  const url =
    //"https://sia.cortolima.gov.co/arcgis/rest/services/Arbolado_Urbano/Arbolado_Urbano/MapServer/4";
    "https://sia.cortolima.gov.co/arcgis/rest/services/Arbolado_Urbano/Arbolado_Urbano/MapServer/1";
  return (
    <div id="map">
      <MapContainer
        className="border border-gray-200"
        zoom={13}
        center={[4.4326518, -75.1900444]}
        style={{ height: "calc(100vh - 45px)" }}
      >
        <FeatureLayer url={url} style={setColor} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'"
        />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
