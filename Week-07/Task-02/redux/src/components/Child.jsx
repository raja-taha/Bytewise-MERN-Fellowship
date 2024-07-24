import React from "react";
import Subchild from "./Subchild";
import { useSelector } from "react-redux";

const Child = () => {
  const data = useSelector((state) => state.show.value);
  return (
    <div>
      <h2>Child -{data}</h2>
      <Subchild />
    </div>
  );
};

export default Child;
