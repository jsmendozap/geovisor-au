import React, { useEffect } from "react";
import CountUp from "react-countup";
import { from, op } from "arquero";

const Row = ({ data, which, img }) => {
  return (
    <div className="flex">
      <img src={img} width="30px" alt="dna" className="mr-3" />
      <Body data={data} which={which} />
    </div>
  );
};

export default Row;

const Body = ({ data, which }) => {
  const count =
    which === 1
      ? data.length
      : from(data)
          .rollup({
            count: op.array_agg_distinct(
              which == 2 ? "nom_cientifico" : "familia"
            ),
          })
          .objects();

  const text = which === 1 ? "Árboles" : which === 2 ? "Especies" : "Familias";

  return (
    <div className="flex mb-2">
      <span>
        {
          <CountUp
            end={which === 1 ? count : count[0].count.length}
            separator="."
            className="text-xl text-green-700 mr-1"
          />
        }
      </span>
      <span className="font-[Mukta] text-lg">{text}</span>
    </div>
  );
};
