import "./App.css";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Div className="App">
      <Sidebar />
      <Dashboard />
    </Div>
  );
}

const Div = styled.div``;

export default App;
