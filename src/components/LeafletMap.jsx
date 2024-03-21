import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { FeatureLayer } from "react-esri-leaflet";
import { DataContext } from "../App";
import { from, escape } from "arquero";
import * as turf from "@turf/turf";
import proj4 from "proj4";
import MarkerClusterGroup from "react-leaflet-cluster";
import { toast } from "react-toastify";
import { Tooltip } from "antd";
import TooltipSp from "./TooltipSp";

const LeafletMap = () => {
  const [data, setData] = useContext(DataContext);
  const [points, setPoints] = useState();

  const fixCRS = (x, y, which) => {
    const x1 = parseFloat(x.replace(/^(\d{6})/, "$1."));
    const y1 = parseFloat(y.replace(/^(\d{6})/, "$1."));

    const from =
      "+proj=tmerc +lat_0=4.59620041666667 +lon_0=-74.0775079166667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs";
    const to = "+proj=longlat +datum=WGS84 +no_defs";

    const [lon, lat] = proj4(from, to, [x1, y1]);
    return which === 1 ? lon : lat;
  };

  useEffect(() => {
    if (!!data) {
      if (data.length > 0) {
        const query = from(data)
          .select(
            "nom_cientifico",
            "nom_comun",
            "num_arbol",
            "comuna",
            "barrio",
            "x",
            "y"
          )
          .derive({
            x: escape((d) => fixCRS(d.x, d.y, 1)),
            y: escape((d) => fixCRS(d.x, d.y, 2)),
          })
          .objects();

        const featureCollection = turf.featureCollection(
          query.map((entry) => {
            const { x, y, ...properties } = entry;
            return turf.point([entry.x, entry.y], properties);
          })
        );
        setPoints(featureCollection);
        toast.success("Consulta exitosa");
      } else {
        toast.error("No se encontraron coincidencias");
      }
    }
  }, [data]);

  const setColor = ({ properties }) => {
    return { weight: 0.7, color: "lightblue" };
  };

  /*const url =
    //"https://sia.cortolima.gov.co/arcgis/rest/services/Arbolado_Urbano/Arbolado_Urbano/MapServer/4";
    "https://sia.cortolima.gov.co/arcgis/rest/services/Arbolado_Urbano/Arbolado_Urbano/MapServer/1";
  */

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
  //<FeatureLayer url={url} style={setColor} />
  return (
    <div id="map">
      <MapContainer
        className="border border-gray-200"
        zoom={13}
        center={[4.4326518, -75.199]}
        style={{ height: "calc(100vh - 45px)" }}
        maxZoom={40}
        zoomControl={false}
      >
        <MarkerClusterGroup chunkedLoading>
          {points &&
            points.features.map((feature) => {
              const position = feature.geometry.coordinates;
              return (
                <Marker
                  key={feature.properties.num_arbol}
                  position={[position[1], position[0]]}
                >
                  <Popup>
                    <div>
                      <TooltipSp
                        text="Nombre científico"
                        feature={feature.properties.nom_cientifico}
                      />
                      <TooltipSp
                        text="Nombre común"
                        feature={feature.properties.nom_comun}
                      />
                      <TooltipSp
                        text="Barrio"
                        feature={feature.properties.barrio}
                      />
                      <TooltipSp
                        text="Comuna"
                        feature={feature.properties.comuna}
                      />
                    </div>
                  </Popup>
                </Marker>
              );
            })}
        </MarkerClusterGroup>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'"
        />
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  );
};

export default LeafletMap;
