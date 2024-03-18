import React, { useState } from "react";
import { Input, Select, Space } from "antd";
import { from, escape } from "arquero";
import * as turf from "@turf/turf";
import soda from "soda-js";
import proj4 from "proj4";

const options = [
  {
    label: <span>Nombre</span>,
    title: "Nombre",
    options: [
      {
        value: "nom_cientifico",
        label: "Científico",
      },
      {
        value: "nom_comun",
        label: "Común",
      },
    ],
  },
];

const capitalize = ([first, ...rest]) =>
  first.toUpperCase() + rest.join("").toLowerCase();

const fixCRS = (x, y, which) => {
  const x1 = parseFloat(x.replace(/^(\d{6})/, "$1."));
  const y1 = parseFloat(y.replace(/^(\d{6})/, "$1."));

  const from =
    "+proj=tmerc +lat_0=4.59620041666667 +lon_0=-74.0775079166667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs";
  const to = "+proj=longlat +datum=WGS84 +no_defs";

  const [lon, lat] = proj4(from, to, [x1, y1]);
  return which === 1 ? lon : lat;
};

const SearchBar = () => {
  const [field, setField] = useState("nom_cientifico");
  const [data, setData] = useState();

  const fetchData = (e, field) => {
    const filter = {};
    filter[field] = capitalize(e.replace(/\s/g, "_"));

    new soda.Consumer("datos.gov.co")
      .query()
      .withDataset("am4p-tz7w")
      .limit(1000000)
      .where(filter)
      .getRows()
      .on("success", (rows) => {
        setData(rows);
      });
  };

  const query =
    data &&
    from(data)
      .select("nom_cientifico", "nom_comun", "comuna", "barrio", "x", "y")
      .derive({
        x: escape((d) => fixCRS(d.x, d.y, 1)),
        y: escape((d) => fixCRS(d.x, d.y, 2)),
      })
      .objects();

  const featureCollection =
    data &&
    turf.featureCollection(
      query.map((entry) => {
        const { x, y, ...properties } = entry;
        return turf.point([entry.x, entry.y], properties);
      })
    );

  return (
    <>
      <Space.Compact className="px-5">
        <Select
          defaultValue="nom_cientifico"
          options={options}
          style={{ width: "180px" }}
          onChange={(e) => setField(e)}
        />
        <Input.Search
          placeholder="Tabebuia rosea"
          allowClear
          onSearch={(e) => {
            fetchData(e, field);
          }}
        />
      </Space.Compact>
    </>
  );
};

export default SearchBar;
