import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import styled from "styled-components";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

import { Route } from "react-router-dom";

import "./utilities/fontAwesome/FontAwesomeIconLib";
import { toast } from "react-toastify";
import Login from "./pages/Login";

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
      <Route exact path="/" component={Login} />
      <Route path="/dashboard" component={Sidebar} />
      <Route path="/dashboard" component={Dashboard} />
    </Div>
  );
}

const Div = styled.div``;

export default App;
