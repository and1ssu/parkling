import React, { useState, useEffect, useCallback } from "react";
import {
  DataBg,
  Plate,
  BackDetail,
  PlateDiv,
  Loading,
  LoadingText,
  LinkStyle,
} from "./styles";

import axios from "axios";
import { Link } from "react-router-dom";

import BackArrow from "../../assets/arrow_l.svg";
import LoadingImage from "../../assets/loading.svg";

import Card from "../../components/Card";

export default function Data() {
  const [carsData, setCarsData] = useState();
  const urlParams = new URLSearchParams(window.location.search);
  const paramPlate = urlParams.get("plate");

  const getCars = useCallback(
    async () => {
     try {
       const { data } = await axios.get(
         `https://parking-lot-to-pfz.herokuapp.com/parking/${paramPlate}`
       );
       setCarsData(data);
     } catch (error) {
       alert(error.response.data.errors.plate[0]);
     }
   }, [paramPlate]);

  useEffect(() => {
    getCars();
  }, [getCars, paramPlate]);

  if (carsData) {
    return (
      <div className="container">
        <DataBg>
          <Link to={`/exit`} style={LinkStyle}>
            <PlateDiv>
              <BackDetail src={BackArrow} />
              <Plate> Placa {carsData[0].plate}</Plate>
            </PlateDiv>
          </Link>
          <ul>
            {carsData.map((car) => (
              <Card
                plate={carsData[0].plate}
                time={car.time}
                paid={car.paid}
                reservation={car.reservation}
              />
            ))}
          </ul>
        </DataBg>
      </div>
    );
  } else {
    return (
      <Loading data-testid="loading">
        <img src={LoadingImage} alt="" />
        <LoadingText>Carregando..</LoadingText>
      </Loading>
    );
  }
}
