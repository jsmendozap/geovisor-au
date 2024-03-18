import React from "react";
import tree from "../media/tree2.svg";
import shurb from "../media/shurb.svg";
import palm from "../media/palm.svg";
import bamboo from "../media/bamboo.svg";
import { from } from "arquero";
import CountUp from "react-countup";
import { Tooltip } from "antd";

const GrowthHabit = ({ data }) => {
  const res = from(data).groupby("habito_creciemiento").count().objects();

  return (
    <div className="mt-5 flex justify-between">
      <Group number={res[0].count} img={tree} text="Árboles" />
      <Group number={res[1].count} img={shurb} text="Arbustos" />
      <Group number={res[2].count} img={bamboo} text="Bamboo" />
      <Group number={res[3].count} img={palm} text="Palmas" />
    </div>
  );
};

export default GrowthHabit;

const Group = ({ number, img, text }) => {
  return (
    <div className="flex flex-col items-center">
      <Tooltip title={text} arrow={false}>
        <p className="text-lg mb-2" style={{ color: "darkblue" }}>
          <CountUp end={number} separator="." />
        </p>
        <img src={img} width="45px" alt="dna" className="mr-3" />
      </Tooltip>
    </div>
  );
};
