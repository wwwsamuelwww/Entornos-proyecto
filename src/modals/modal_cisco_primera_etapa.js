import React, {useState, useEffect} from  'react';
import '../css/modal_window_style.css'
import {Col, Container, Row } from 'react-bootstrap';

function ModalCiscoPrimeraEtapa({estado1, cambiarEstado1, comandosVariable}) {

  const [inputComando, setInputComandos] = useState('');
  const [outputComando, setOutputComando] = useState('');

  const [mensaje, setMensaje] = useState('');

    const salirVentanaModal =  () => {
        cambiarEstado1(false);
    };

    const handleInputChange = (event) => {
      setInputComandos(event.target.value);
    };
  
    return (
      estado1 && (
        <div className="Overlay">
          <div className="ContenedorModal">
            <div className="EncabezadoModal">
              <div className="tituloEvento">
                <h1>Primera Etapa</h1>
              </div>

              <button className="BotonSalir" onClick={salirVentanaModal}>
                salir
              </button>
            </div>
            <Container
              className="overflow-auto my-4"
              style={{ overflowY: "scroll", height: "380px" }}
            >
              <div className="console">
                {comandosVariable.map((comando) => {
                  return (
                    <>
                      <Row className="mb-3">
                        <Row>
                          <Col>
                            <pre>{">"} {comando.comando}</pre>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <p>
                            {comando.explicacion}
                            </p>
                          </Col>
                        </Row>
                      </Row>
                    </>
                  );
                })}

                <pre>{outputComando}</pre>
              </div>
            </Container>
          </div>
        </div>
      )
    );
  }
  
  export default ModalCiscoPrimeraEtapa;