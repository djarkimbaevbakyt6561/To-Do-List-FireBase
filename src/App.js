import { Route, Routes } from "react-router";
import "./App.css";
import { Todos } from "./components/todos/Todos";

function App() {
  return (
    <div className="App">
      <Todos />
    </div>
  );
}

export default App;