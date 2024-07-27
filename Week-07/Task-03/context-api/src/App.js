import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";
import { CountProvider } from "./context/CountContext";

function App() {
  return (
    <ThemeProvider>
      <CountProvider>
        <div className="App">
          <Header />
          <ThemeToggle />
        </div>
      </CountProvider>
    </ThemeProvider>
  );
}

export default App;
