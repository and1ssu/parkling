import React from "react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./Global.css";
import RouterParking from "./Routes/Routes";
function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <RouterParking />
      </BrowserRouter>
    </>
  );
}

export default App;
