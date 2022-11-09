import React from "react";
import {  Route, Routes } from "react-router-dom";
import Data from "../pages/Data";
import DataDetail from "../pages/DataDetail";
import Entry from "../pages/Entry";
import Exit from "../pages/Exit";

function RouterParking() {
  return (

      <Routes>
        <Route path="/"  element={<Entry />} />
        <Route path="/exit"  element={<Exit />} />
        <Route path="/data"  element={<Data />} />
        <Route path="/data-detail"  element={<DataDetail />} />
      </Routes>

  );
}

export default RouterParking;
