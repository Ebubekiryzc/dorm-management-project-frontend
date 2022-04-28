import "./App.css";
import styled from "styled-components";
import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";
import { toast } from "react-toastify";

function App() {
  toast.configure({
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    newestOnTop: false,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    pauseOnHover: true,
    theme: "dark",
  });

  return (
    <Div className="App">
      <Sidebar />
      <Dashboard />
    </Div>
  );
}

const Div = styled.div``;

export default App;
