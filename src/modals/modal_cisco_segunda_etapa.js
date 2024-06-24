import React, {useState, useEffect} from  'react';
import '../css/modal_window_style.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import '../css/error_mensaje_style.css'
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';

const cookies = new Cookies();

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} placement="top"/>
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.info.dark,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.info.dark,
  },
}));

function ModalCiscoSegundaEtapa({estado1, cambiarEstado1, comandosVariable}) {

  const primera_red = cookies.get('primera_red');
  const segunda_red = cookies.get('segunda_red');

  

  const [pistas, setPistas] = useState(['', '', '', '', '']);

  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    primero: "",
    segundo: "",
    tercero: "",
    cuarto: "",
    quinto: "",
    sexto: "",
  });

    const salirVentanaModal =  () => {
        cambiarEstado1(false);
        setErrors({});
    };

    const handleCommandSubmit = (event) => {
      const validationErrors = {};

      for (let i = 0; i < comandosVariable.length; i++) {
        if (!values[comandosVariable[i].orden].trim()) {
          validationErrors[comandosVariable[i].orden] = "Este campo es obligatorio";
        }else if(values[comandosVariable[i].orden] !== comandosVariable[i].respuesta){
          validationErrors[comandosVariable[i].orden] = "Comando incorrecto";
        }
      }

      if (!values.sexto.trim()) {
        validationErrors.sexto = "Este campo es obligatorio";
      }else if(values.sexto !== "exit"){
        validationErrors.sexto = "Comando incorrecto";
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        salirVentanaModal()
        Swal.fire('Dispositivo configurado correctamente', '','success');
      }
    };

    const handleInput = (e) => {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
      });
    };

    return (
      estado1 && (
        <div className="Overlay">
          <div className="ContenedorModal">
            <div className="EncabezadoModal">
              <div className="tituloEvento">
                <h1>Segunda Etapa</h1>
              </div>

              <button className="BotonSalir" onClick={salirVentanaModal}>
                salir
              </button>
            </div>
            <Container
              className="overflow-auto my-4"
              style={{ overflowY: "scroll", height: "300px" }}
            >
              <div className="console">
                <Row className="mb-3">
                  <Row>
                    <Col>
                      <pre>{">"} enable</pre>
                    </Col>
                  </Row>
                </Row>

                {comandosVariable.map((comando, index) => {
                  return (
                    <>
                      {comando.posicion === 0 ? (
                        <Row className="mb-3">
                          <Row>
                            <Col xs={3}>
                              <pre>
                                {">"}{" "}
                                <input
                                  style={{ width: "100px" }}
                                  name={comando.orden}
                                  onBlur={handleInput}
                                />
                                {errors[comando.orden] && (
                                  <span className="advertencia-creEve">
                                    {errors[comando.orden]}
                                  </span>
                                )}
                              </pre>
                            </Col>
                            <Col xs={2}>
                              <pre>{comando.comando}</pre>
                            </Col>
                            <Col xs={2}>
                              <BootstrapTooltip title={pistas[1]}>
                                <HelpIcon></HelpIcon>
                              </BootstrapTooltip>
                            </Col>
                          </Row>
                        </Row>
                      ) : (
                        <Row className="mb-3">
                          <Row>
                            <Col xs={2} style={{ paddingRight: "0px" }}>
                              <pre>
                                {">"} {comando.comando}{" "}
                              </pre>
                            </Col>
                            <Col xs={2} style={{ paddingLeft: "0px" }}>
                              <input
                                style={{ width: "100px" }}
                                name={comando.orden}
                                onBlur={handleInput}
                              />

                              {errors[comando.orden] && (
                                <span className="advertencia-creEve">
                                  {errors[comando.orden]}
                                </span>
                              )}
                            </Col>

                            <Col xs={2}>
                              <BootstrapTooltip title={comando.pista}>
                                <HelpIcon></HelpIcon>
                              </BootstrapTooltip>
                            </Col>
                          </Row>
                        </Row>
                      )}
                    </>
                  );
                })}

                <Row className="mb-3">
                  <Row>
                    <Col xs={3}>
                      <pre>
                        {">"}{" "}
                        <input
                          style={{ width: "100px" }}
                          name="sexto"
                          onBlur={handleInput}
                        ></input>
                        {errors.sexto && (
                          <span className="advertencia-creEve">
                            {errors.sexto}
                          </span>
                        )}
                      </pre>
                    </Col>
                    <Col xs={2}>
                      <BootstrapTooltip title={pistas[4]}>
                        <HelpIcon></HelpIcon>
                      </BootstrapTooltip>
                    </Col>
                  </Row>
                </Row>
              </div>
            </Container>


            <Container>
              <Row className="d-flex align-items-center justify-content-center">
                <Col
                  sm={4}
                  className="d-flex align-items-center justify-content-center"
                >
                  <Button variant="warning" onClick={handleCommandSubmit}>
                    Ingresar comandos
                  </Button>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      )
    );
  }
  
  export default ModalCiscoSegundaEtapa;