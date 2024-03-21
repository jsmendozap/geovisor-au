import React from "react";
import trees from "../media/trees.svg";

const Header = () => {
  return (
    <div className="flex flex-row items-center bg-[#162945] py-2 px-4">
      <img src={trees} width="35px" alt="trees" className="mr-2" />
      <span
        className="font-semibold text-xl text-gray-50"
        style={{ fontFamily: "Inclusive Sans", fontSize: "22px" }}
      >
        Arbolado urbano de Ibagué
      </span>
    </div>
  );
};

export default Header;
