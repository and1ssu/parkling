import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import Modal from "react-modal";
import {
  Main,
  Toggle,
  ToggleItem,
  LinkStyle,
  ContainerInput,
  Label,
  ButtonOut,
  ButtonPayment,
  Error,
  ModalStyle,
  ModalText,
  History,
  Back,
  ModalTitle,
  ImageModal,
  SuccessText,
} from "./styles";

import Success from "../../assets/round-done-button.svg";
import Alert from "../../assets/ic_alert.svg";
import InputMask from "react-input-mask";

export default function Entrance() {
  const [plate, setPlate] = useState("");
  const [ativo, setAtivo] = useState(false);
  const [error, setError] = useState(false);
  const [outlIsOpen, setOutIsOpen] = useState(false);
  const [paymentIsOpen, setPaymentIsOpen] = useState(false);
  let navigate = useNavigate();
  const [success, setSuccessIsOpen] = useState(false);
  const [successText, setSuccessText] = useState("");

  function handleInput(event) {
    setPlate(event.target.value);
    if (plate.length >= 7) {
      setAtivo(true);
      setError(false);
    } else if (plate.length < 3) {
      setAtivo(false);
    }
  }

  async function handleOut() {
    try {
      await axios.post(
        `https://parking-lot-to-pfz.herokuapp.com/parking/${plate}/out`
      );
      setError(false);
      setSuccessText("SAÍDA LIBERADA");
      setSuccessIsOpen(true);
      setPlate("");
    } catch (error) {
      handleCloseModal();
      setError(error.response.data.errors.plate[0]);
    }
  }

  async function handlePayment() {
    try {
      await axios.post(
        `https://parking-lot-to-pfz.herokuapp.com/parking/${plate}/pay`
      );
      setError(false);
      setSuccessText("PAGO!");
      setSuccessIsOpen(true);
      setPlate("");
    } catch (error) {
      handleCloseModal();
      setError(error.response.data.errors.plate[0]);
    }
  }

  async function handleHistory() {
    try {
      await axios.get(
        `https://parking-lot-to-pfz.herokuapp.com/parking/${plate}`
      );
      setError(false);
      navigate(`/data?plate=${plate}`);
      setPlate("");
    } catch (error) {
      setError(error.response.data.errors.plate[0]);
    }
  }

  function handleCloseModal() {
    setOutIsOpen(false);
    setPaymentIsOpen(false);
    setSuccessIsOpen(false);
  }

  return (
    <div className="container">
      <Main>
        <Toggle>
          <Link to="/" style={LinkStyle}>
            <ToggleItem ativo={false}>Entrada</ToggleItem>
          </Link>
          <Link to="/exit" style={LinkStyle}>
            <ToggleItem ativo={true}>Saída</ToggleItem>
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
          <Error ativo={error}>
            {" "}
            <img src={Alert} alt="" width={20} />
            Um erro ocorreu, insira uma placa válida{" "}
          </Error>

          <ButtonPayment
            ativo={ativo}
            onClick={() => {
              setPaymentIsOpen(true);
            }}
          >
            PAGAMENTO
          </ButtonPayment>
          <ButtonOut
            ativo={ativo}
            onClick={() => {
              setOutIsOpen(true);
            }}
          >
            SAÍDA
          </ButtonOut>
          <History onClick={handleHistory}>VER HISTORICO</History>

          <Modal
            isOpen={paymentIsOpen}
            style={ModalStyle}
            onRequestClose={handleCloseModal}
            ariaHideApp={false}
          >
            <ModalText>Confirma o pagamento da placa abaixo?</ModalText>
            <ModalTitle>{plate}</ModalTitle>
            <ButtonPayment ativo={ativo} onClick={handlePayment}>
              PAGAMENTO
            </ButtonPayment>
            <Back onClick={handleCloseModal}>Voltar</Back>
          </Modal>

          <Modal
            isOpen={outlIsOpen}
            style={ModalStyle}
            onRequestClose={handleCloseModal}
            ariaHideApp={false}
          >
            <ModalText>Confirma a saída do veiculo da placa abaixo?</ModalText>
            <ModalTitle>{plate}</ModalTitle>
            <ButtonPayment ativo={ativo} onClick={handleOut}>
              Liberar Saída
            </ButtonPayment>
            <Back onClick={handleCloseModal}>Voltar</Back>
          </Modal>

          <Modal
            isOpen={success}
            style={ModalStyle}
            onRequestClose={handleCloseModal}
            ariaHideApp={false}
          >
            <ImageModal src={Success} alt="" />
            <SuccessText>{successText}</SuccessText>
          </Modal>
        </ContainerInput>
      </Main>
    </div>
  );
}
