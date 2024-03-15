import React from "react";
import CountUp from "react-countup";
import { from, op } from "arquero";

const Row = ({ data, which, text }) => {
  const count = (data, which) => {
    const res = from(data)
      .rollup({
        count: op.array_agg_distinct(which == 1 ? "nom_cientifico" : "familia"),
      })
      .objects();

    return res[0].count.length;
  };

  return (
    <div className="pb-4">
      <h2 className="font-medium text-lg">{text}</h2>
      <p className="text-3xl">{<CountUp end={count(data, which)} />}</p>
    </div>
  );
};

export default Row;
