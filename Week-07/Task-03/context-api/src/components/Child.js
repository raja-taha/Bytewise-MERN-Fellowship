import React, { useContext } from "react";
import { CountContext } from "../context/CountContext";

const Child = () => {
  const { count } = useContext(CountContext);
  return <div>Child Count: {count}</div>;
};

export default Child;
