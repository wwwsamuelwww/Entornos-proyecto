import React, {useState, useEffect} from  'react';
import ModalCisco1 from "../modals/modal_cisco_1";
import ModalCisco2 from '../modals/modal_cisco_2';
import ModalCiscoPrimeraEtapa from '../modals/modal_cisco_primera_etapa';
import ModalCiscoSegundaEtapa from '../modals/modal_cisco_segunda_etapa';
import Button from 'react-bootstrap/Button';
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn,
  MDBModalDialog,
  MDBModalContent,
} from 'mdb-react-ui-kit';
import BarraSuperior from '../components/BarraSuperior';

import imagen_cisco from '../images/imagen_router_cisco.jpg'

function SimulacionBGP() {

    const [values, setValues] = useState({
        estado_modal_1 : false
    });

    const [estado_modal2, setEstadoModal2] = useState(false);
    const [estado_primera_etapa, setPrimeraEtapa] = useState(false);
    const [estado_segunda_etapa, setSegundaEtapa] = useState(false);
    const [mostrarInstrucciones, setMostrarInstrucciones] = useState(false);

    const cambiarEstadoModal1 = (nuevoEstado) => {
        setValues({
            estado_modal_1:nuevoEstado,
        });
    };

    const cambiarEstadoModal2 = (nuevoEstado) => {
      setEstadoModal2(nuevoEstado)
    };

    const cambiarEstadoPrimeraEtapa = (nuevoEstado) => {
      setPrimeraEtapa(nuevoEstado)
    };

    const cambiarEstadoSegundaEtapa = (nuevoEstado) => {
      setSegundaEtapa(nuevoEstado)
    };

    const generarDesafio = () => {

      let max = 10;
      let min = 5;

      var numeroAleatorio = Math.random();

      // Ajustar el número al rango dado y redondearlo al entero más cercano
      var numeroEnRango = Math.floor(numeroAleatorio * (max - min + 1)) + min;
    };

  return (
    <>
      <ModalCisco1
        estado1={values.estado_modal_1}
        cambiarEstado1={cambiarEstadoModal1}
      />

      <ModalCisco2
        estado1={estado_modal2}
        cambiarEstado1={cambiarEstadoModal2}
      />

      <ModalCiscoPrimeraEtapa
        estado1={estado_primera_etapa}
        cambiarEstado1={cambiarEstadoPrimeraEtapa}
      />

      <ModalCiscoSegundaEtapa
        estado1={estado_segunda_etapa}
        cambiarEstado1={cambiarEstadoSegundaEtapa}
      />

      <BarraSuperior titulo="Simulacion de Protocolo BGP" />

      <MDBRow className="my-3">
        <MDBCol className="d-flex align-items-center justify-content-center">
          <h2>Primera Etapa</h2>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <MDBCol md='10'>
          <div className="d-flex justify-content-between align-items-center mb-5">
            {mostrarInstrucciones ? (
              <p style={{ marginLeft: "10px" }}>
                Instrucciones:
                <br />
                1. Seleccionar el cable
                <br />
                2. Seleccionar el dispositivo donde conectar el cable
                <br />
                3. Elegir el puerto a conectar de inicio y puerto final
              </p>
            ) : (
              <p style={{ marginLeft: "10px" }}>
                Desafio:
                <br />
                1.Conectar cable consola a router cisco 1 a puerto consola del
                router cisco
                <br />
                2.Conectar cable ethernet a puerto ethernet 1 de PC con router
                cisco 1 a puerto g0/1
                <br />
                3.Conectar cable serial a puerto serial s0/1 de cisco 1 con
                puerto serial s0/0 de cisco 2
              </p>
            )}
          </div>
        </MDBCol>

        <MDBCol md='2'>
          <Button  variant="primary" onClick={() => window.location.href = "./simulacionRipSegundaEtapa"}>
            Siguiente etapa
          </Button>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-3">
        <MDBCol lg={4} md={12} className="mb-4 mb-lg-0">
          <div className="bg-image hover-overlay ripple shadow-1-strong rounded">
            <img src={imagen_cisco} className="w-100" />
            <a style={{ cursor: "pointer" }}>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
              ></div>
            </a>
          </div>
          <MDBRow>
            <MDBCol className="d-flex align-items-center justify-content-center">
              <Button
                variant="primary"
                onClick={() => cambiarEstadoPrimeraEtapa(!estado_primera_etapa)}
              >
                Mostrar Configuracion
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBCol>

        <MDBCol lg={4} md={12} className="mb-4 mb-lg-0">
          <div className="bg-image hover-overlay ripple shadow-1-strong rounded">
            <img src={imagen_cisco} className="w-100" />
            <a style={{ cursor: "pointer" }}>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
              ></div>
            </a>
          </div>
          <MDBRow>
            <MDBCol className="d-flex align-items-center justify-content-center">
              <Button
                variant="primary"
                onClick={() => cambiarEstadoSegundaEtapa(!estado_segunda_etapa)}
              >
                Mostrar Configuracion
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBCol>

        <MDBCol lg={4} md={12} className="mb-4 mb-lg-0">
          <div className="bg-image hover-overlay ripple shadow-1-strong rounded">
            <img src={imagen_cisco} className="w-100" />
            <a style={{ cursor: "pointer" }}>
              <div
                className="mask"
                style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}
              ></div>
            </a>
          </div>
          <MDBRow>
            <MDBCol className="d-flex align-items-center justify-content-center">
              <Button
                variant="primary"
                onClick={() => cambiarEstadoModal2(!estado_modal2)}
              >
                Mostrar Configuracion
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>
    </>
  );
}

export default SimulacionBGP;