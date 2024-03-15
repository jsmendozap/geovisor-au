import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import soda from "soda-js";
import { escape, from, op } from "arquero";
import { WaveSpinner } from "react-spinners-kit";
import { MeterChart } from "@carbon/charts-react";
import Row from "./Row";

const Sidebar = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    new soda.Consumer("datos.gov.co")
      .query()
      .withDataset("am4p-tz7w")
      .limit(1000000)
      .getRows()
      .on("success", (rows) => {
        setData(rows);
      });
  }, []);

  const options = {
    title: "Árboles por comuna",
    height: "200px",
    legend: {
      enabled: true,
    },
    meter: {
      proportional: {
        total: 101285,
        unit: "Árboles",
      },
    },
    color: {
      pairing: {
        option: 2,
      },
    },
    tooltip: {
      customHTML: (data) => customTooltip(data),
    },
  };

  const summary = (data) => {
    return from(data)
      .groupby("comuna")
      .count({ as: "value" })
      .derive({ group: escape((d) => parseInt(d.comuna)) })
      .orderby("group", "value")
      .objects();
  };

  const customTooltip = (data) => {
    return `<div>
          <p>
            Comuna: ${data[0].label}
          </p>
          <p>
            Árboles: ${data[0].value.replace(",", ".")}
          </p>
        </div>`;
  };

  return (
    <div className="px-5 py-5">
      <SearchBar />
      {data === null ? (
        <div
          className="sticky top-6 flex flex-col justify-center items-center"
          style={{ height: "60vh" }}
        >
          <div className="flex flex-col pb-5 items-center font-[Mukta]">
            <p>Consultando información</p>
            <p>Por favor espere, esto no tardará mucho</p>
          </div>
          <WaveSpinner size={80} color="#686769" />
        </div>
      ) : (
        <div className="mt-4 ml-2">
          <Row data={data} which={1} text="Número de especies de árboles" />
          <Row data={data} which={2} text="Número de familias" />
          <MeterChart data={summary(data)} options={options} />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
