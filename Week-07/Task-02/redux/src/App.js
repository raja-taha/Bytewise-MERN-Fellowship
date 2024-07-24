import "./App.css";
import Child from "./components/Child";
import { useSelector } from "react-redux";

function App() {
  const data = useSelector((state) => state.show.value);
  return (
    <div>
      <h1>Parent - {data}</h1>
      <Child />
    </div>
  );
}

export default App;
