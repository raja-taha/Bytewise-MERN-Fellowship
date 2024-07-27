import React, { createContext, useState } from "react";

export const CountContext = createContext();

export const CountProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <CountContext.Provider value={{ count, incrementCount }}>
      {children}
    </CountContext.Provider>
  );
};
