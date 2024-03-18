import React from "react";
import { MeterChart } from "@carbon/charts-react";
import { from } from "arquero";

const InfOrigin = ({ data }) => {
  const summary = (data) => {
    return from(data)
      .groupby("procedencia")
      .count({ as: "value" })
      .rename({ procedencia: "group" })
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

  const options = {
    title: "Procedencia",
    height: "200px",
    legend: {
      enabled: true,
    },
    toolbar: {
      enabled: false,
    },
    meter: {
      peak: 101285,
    },
    color: {
      pairing: {
        option: 4,
      },
    },
    tooltip: {
      customHTML: (data) => customTooltip(data),
    },
  };

  return (
    <>
      <MeterChart data={summary(data)} options={options} />
    </>
  );
};

export default InfOrigin;
