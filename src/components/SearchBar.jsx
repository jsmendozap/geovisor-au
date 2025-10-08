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

  const fetchData = async (e, field) => {
  const filter = capitalize(e.replace(/\s/g, "_"));
  
  const baseURL = '/api/am4p-tz7w.json';
  
  const params = new URLSearchParams({
    [field]: filter,
    $limit: '1000000'
  });
  
  try {
    const response = await fetch(`${baseURL}?${params.toString()}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const rows = await response.json();
    setData(rows);
  } catch (error) {
    console.error("Error:", error);
  }
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
          placeholder={field === "nom_cientifico" ? "Delonix regia" : "Acacio rojo"}
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
