import React, { useContext, useState } from "react";
import { Input, Select, Space } from "antd";
import { DataContext } from "../App";
import soda from "soda-js";

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

const SearchBar = () => {
  const [field, setField] = useState("nom_cientifico");
  const [data, setData] = useContext(DataContext);

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
          placeholder={field === "nom_cientifico" ? "Tabebuia rosea" : "Ocobo"}
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
