import React from "react";
import { DonutChart } from "@carbon/charts-react";
import { from, op } from "arquero";

const Uicn = ({ data }) => {
  const res = from(data)
    .groupby("uicn")
    .rollup({ value: op.distinct("nom_cientifico") })
    .rename({ uicn: "group" })
    .objects();

  const customTooltip = (data) => {
    let label;
    switch (data[0].label) {
      case "NE":
        label = "No evaluado (NE)";
        break;
      case "DD":
        label = "Datos insuficientes (DD)";
        break;
      case "LC":
        label = "Preocupación menor (LC)";
        break;
      case "NT":
        label = "Casi amenazada (NT)";
        break;
      case "VU":
        label = "Vulnerable (VU)";
        break;
      case "EN":
        label = "En peligro (EN)";
        break;
      case "CR":
        label = "En peligro crítico (CR)";
        break;
      case "EW":
        label = "Extinta en estado silvestre (EW)";
        break;
      case "EX":
        label = "Extinta (EX)";
        break;
    }

    return `<div>
                  <p>
                    Categoría: ${label}
                  </p>
                  <p>
                    Número de especies: ${data[0].value}
                  </p>
                </div>`;
  };

  const options = {
    height: "300px",
    donut: {
      center: {
        label: "Especies",
      },
    },
    pie: {
      labels: {
        enabled: false,
      },
    },
    tooltip: {
      customHTML: (data) => customTooltip(data),
    },
  };

  return (
    <div className="ml-1">
      <DonutChart data={res} options={options} />
    </div>
  );
};

export default Uicn;
