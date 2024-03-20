import React from "react";
import { MeterChart } from "@carbon/charts-react";
import { from, escape } from "arquero";

const InfRegion = ({ data }) => {
  const options = {
    height: "200px",
    legend: {
      enabled: true,
    },
    toolbar: {
      enabled: true,
    },
    meter: {
      proportional: {
        total: 101285,
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
    <>
      <MeterChart data={summary(data)} options={options} />
    </>
  );
};

export default InfRegion;
