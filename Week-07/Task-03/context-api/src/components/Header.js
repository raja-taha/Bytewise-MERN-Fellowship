import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { CountContext } from "../context/CountContext";
import Child from "./Child";

const Header = () => {
  const { theme } = useContext(ThemeContext);
  const { count, incrementCount } = useContext(CountContext);

  return (
    <header className={`App-header ${theme}`}>
      <h1>{theme === "light" ? "Light Mode" : "Dark Mode"}</h1>
      <p>Header Count: {count}</p>
      <Child />
      <button onClick={incrementCount}>Increment Count</button>
    </header>
  );
};

export default Header;
