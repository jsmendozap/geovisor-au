import React from "react";
import tree from "../media/tree2.svg";
import shurb from "../media/shurb.svg";
import palm from "../media/palm.svg";
import bamboo from "../media/bamboo.svg";
import { from, op } from "arquero";
import CountUp from "react-countup";
import { Tooltip } from "antd";

const GrowthHabit = ({ data }) => {
  const res = from(data)
    .groupby("habito_creciemiento")
    .rollup({ count: op.distinct("nom_cientifico") })
    .objects();

  return (
    <div className="mt-5 flex justify-between">
      <Group number={res[0].count} img={tree} text="Árboles" />
      <Group number={res[1].count} img={shurb} text="Arbustos" />
      <Group number={res[2].count} img={palm} text="Palmas" />
      <Group number={res[3].count} img={bamboo} text="Bambú" />
    </div>
  );
};

export default GrowthHabit;

const Group = ({ number, img, text }) => {
  return (
    <div className="flex flex-col items-center">
      <Tooltip title={text} arrow={false}>
        <img src={img} width="45px" alt="dna" className="mr-3" />
      </Tooltip>
      <p className="text-lg text-green-700 mt-2">
        <CountUp end={number} separator="." />
      </p>
    </div>
  );
};
