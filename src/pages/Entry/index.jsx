import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Modal from "react-modal";
import {
  Main,
  Toggle,
  ToggleItem,
  LinkStyle,
  ContainerInput,
  Label,
  Button,
  Error,
  ModalStyle,
  ModalText,
} from "./styles";

import Success from "../../assets/round-done-button.svg";
import Alert from "../../assets/ic_alert.svg";
import InputMask from "react-input-mask";

export default function Entry() {
  const [plate, setPlate] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [error, setError] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function handleInput(event) {
    setPlate(event.target.value);
    if (plate.length >= 7) {
      setAtivo(true);
      setError(false);
    } else if (plate.length < 3) {
      setAtivo(false);
    }
  }

  async function handleSubmit() {
    try {
      await axios.post("https://parking-lot-to-pfz.herokuapp.com/parking", {
        plate: plate,
      });
      setPlate("");
      setIsOpen(true);
    } catch (error) {
      setError(error.response.data.errors.plate[0]);

    }
  }

  return (
    <div className="container">
      <Main>
        <Toggle>
          <Link to="/" style={LinkStyle}>
            <ToggleItem ativo={true}>Entrada</ToggleItem>
          </Link>
          <Link to="/exit" style={LinkStyle}>
            <ToggleItem ativo={false}>Saída</ToggleItem>
          </Link>
        </Toggle>

        <Label>Número da placa:</Label>
        <ContainerInput>
          <InputMask
            mask="aaa-9999"
            maskChar=""
            value={plate}
            onChange={handleInput}
            placeholder="AAA-0000"
            style={{
              textAlign: "center",
              background: "#FFFBE6",
              borderRadius: "4px",
              border: "1px solid #ccc",
              fontSize: "1.5rem",
              padding: "17px",
              height: "67px",
              width: "100",
            }}
          />

          <Error ativo={error === "already parked"}>
            {" "}
            <img src={Alert} alt="" width={20} />
            Um erro ocorreu, placa ja cadastrada
          </Error>

          <Error ativo={error === "is invalid"}>
            {" "}
            <img src={Alert} alt="" width={20} />
            Um erro ocorreu, insira uma placa válida{" "}
          </Error>

          <Button ativo={ativo} onClick={handleSubmit}>
            CONFIRMAR ENTRADA
          </Button>
          <Modal
            isOpen={modalIsOpen}
            style={ModalStyle}
            onRequestClose={() => setIsOpen(false)}
            ariaHideApp={false}
          >
            <img src={Success} alt="" width={60} />
            <ModalText>Registrado!</ModalText>
          </Modal>
        </ContainerInput>
      </Main>
    </div>
  );
}
