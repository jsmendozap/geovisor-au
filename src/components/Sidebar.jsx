import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import soda from "soda-js";
import { WaveSpinner } from "react-spinners-kit";
import Row from "./Row";
import dna from "../media/dna.svg";
import tree from "../media/tree.svg";
import bio from "../media/bio.svg";
import { Collapse } from "antd";
import InfRegion from "./InfRegion";
import GrowthHabit from "./GrowthHabit";

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

  const items = [
    {
      key: "1",
      label: (
        <span className="text-lg" style={{ fontFamily: "Inclusive Sans" }}>
          Cifras biodiversidad
        </span>
      ),
      children: (
        <div>
          <Row data={data} which={1} img={tree} />
          <Row data={data} which={2} img={bio} />
          <Row data={data} which={3} img={dna} />
          <GrowthHabit data={data} />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <span className="text-lg" style={{ fontFamily: "Inclusive Sans" }}>
          Árboles por comuna
        </span>
      ),
      children: <InfRegion data={data} />,
    },
    {
      key: "3",
      label: (
        <span className="text-lg" style={{ fontFamily: "Inclusive Sans" }}>
          Estado de conservación
        </span>
      ),
      children: <span>a</span>,
    },
  ];

  return (
    <div className="py-5 overflow-y-auto border-r border-gray-200">
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
        <div className="mt-5 mx-3">
          <Collapse
            ghost
            items={items}
            expandIconPosition="end"
            defaultActiveKey={["1", "2", "3"]}
          />
          <div className="mt-3 ml-4" style={{ fontFamily: "Inclusive Sans" }}>
            <p className="font-medium text-lg">Fuente de información:</p>
            <a
              href="https://www.datos.gov.co/Ambiente-y-Desarrollo-Sostenible/Censo-de-Arbolado-urbano-en-Ibagu-Sria-Ambiente-y-/am4p-tz7w/about_data"
              target="_blank"
            >
              <li className="ml-3">Datos abiertos</li>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
