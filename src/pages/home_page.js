import React, {useState} from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRipple,
} from "mdb-react-ui-kit";
import protocolo_rip from '../images/protocolo_rip.PNG'
import imagen_cableado from '../images/imagen_cableado.png'
import protocolo_bgp from '../images/protocolo_bgp.jpg'
import protocolo_ospf from '../images/protocolo_ospf.jpg'
import BarraSuperior from '../components/BarraSuperior';
import BuildIcon from '@mui/icons-material/Build';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';

const cookies = new Cookies();

function HomePage() {

  const [errors, setErrors] = useState({});

  const [values, setValues] = useState({
    primera_red : "",
    segunda_red : "",
    mascara: "",
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setValues({
        ...values,
        [name]:value,
    });
  }

  const handleChange1eraEtapa = (evento, indice) => {
    actualizarComando(evento.target.value, indice);
  }

  const handleChange2daEtapa = (evento, indice) => {
    actualizarComando2daEtapa(evento.target.value, indice);
  }

  const handleChange3raEtapa = (evento, indice) => {
    pistas3raEtapaRip[indice] = evento.target.value;
  }

  const RedirigirRIP = () => {
    window.location.href = "./simulacionRip";
  };

  const DirigirCableado = () => {
    window.location.href = "./simulacion_cableado";

  };

  const editarSimulacionRip = () => {
    window.location.href = "./simulacionRip";
  };

  const iniciarSimulacionRip = () => {
    window.location.href = "./simulacionRip";
  };

  const editarSimulacionCableado = () => {
    window.location.href = "./simulacionRip";
  };

  const iniciarSimulacionCableado = () => {
    window.location.href = "./simulacionRip";
  };

  const [modalConfiguracionRip, setModalConfiguracionRip] = useState(false);
  const [modalConfiguracion1eraEtapaRip, setModalConfiguracion1eraEtapaRip] = useState(false);
  const [configuracion2daEtapaRip, setConfiguracion2daEtapaRip] = useState(false);
  const [configuracion3raEtapaRip, setConfiguracion3raEtapaRip] = useState(false);

  const [pistas3raEtapaRip, setPistas3raEtapaRip] = useState(['', '', '', '', '', '', '']);

  const [comandos1erEtapa, setComandos1eraEtapa] = useState([
    {comando: "enable", explicacion: ""},
    {comando: "configure terminal", explicacion: ""},
    {comando: "router rip", explicacion: ""},
    {comando: "version 2", explicacion: ""},
    {comando: "" , explicacion: ""},
    {comando: "", explicacion: ""},
    {comando: "exit", explicacion: ""}
  ]);

  const [comandos2daEtapa, setComandosSegundaEtapa] = useState([
    {comando: "configure", respuesta: "terminal", posicion : 1 , pista: "", orden: "primero"},
    {comando: "router", respuesta: "rip", posicion : 1 , pista: "", orden: "segundo"},
    {comando: "2", respuesta: "version", posicion : 0 , pista: "", orden: "tercero"},
    {comando: "network", respuesta: "", posicion : 1 , pista: "", orden: "cuarto"},
    {comando: "network", respuesta: "", posicion : 1 , pista: "", orden: "quinto"},
  ]);

  const guardarConfiguracionRip = (e) => {

    const validationErrors = {};

    if (!values.primera_red.trim()) {
      validationErrors.primera_red = "Este campo es obligatorio";
    }

    if (!values.segunda_red.trim()) {
      validationErrors.segunda_red = "Este campo es obligatorio";
    }

    if (!values.mascara.trim()) {
      validationErrors.mascara = "Este campo es obligatorio";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      
      cookies.set("primera_red", values.primera_red, { path: "/" });
      cookies.set("segunda_red", values.segunda_red, { path: "/" });
      cookies.set("mascara", values.mascara, { path: "/" });
      actualizarRedes1raEtapa(values.primera_red, 4);
      actualizarRedes1raEtapa(values.segunda_red, 5);
      setModalConfiguracionRip(false);
      setModalConfiguracion1eraEtapaRip(true);
    }
  }

  const guardarConfiguracion1eraEtapaRip = () => {
    setModalConfiguracion1eraEtapaRip(false);
    setConfiguracion2daEtapaRip(true);
    cookies.set("comandos_1era_etapa_rip", comandos1erEtapa, { path: "/" });
  };

  const guardarConfiguracion2daEtapaRip = () => {
    actualizarRedes2daEtapa(values.primera_red, 3);
    actualizarRedes2daEtapa(values.segunda_red, 4);
    setConfiguracion2daEtapaRip(false);
    setConfiguracion3raEtapaRip(true);
    cookies.set("comandos_2da_etapa_rip", comandos2daEtapa, { path: "/" });
  };

  const guardarConfiguracion3eraEtapaRip = () => {
    setConfiguracion3raEtapaRip(false);
    cookies.set("pistas_3ra_etapa_rip", pistas3raEtapaRip, { path: "/" });
    console.log(pistas3raEtapaRip);
  };

  const actualizarComando = (nuevoComando, indice) => {
    setComandos1eraEtapa((prevState) => {
      const nuevoEstado = prevState.map((item, index) => {
        if (index === indice) { 
          return { ...item, explicacion: nuevoComando };
        }
        return item;
      });
      return nuevoEstado;
    });
  };

  const actualizarRedes1raEtapa = (nuevoComando, indice) => {
    setComandos1eraEtapa((prevState) => {
      const nuevoEstado = prevState.map((item, index) => {
        if (index === indice) { 
          return { ...item, comando: nuevoComando };
        }
        return item;
      });
      return nuevoEstado;
    });
  };

  const actualizarComando2daEtapa = (nuevoComando, indice) => {
    setComandosSegundaEtapa((prevState) => {
      const nuevoEstado = prevState.map((item, index) => {
        if (index === indice) { 
          return { ...item, pista: nuevoComando };
        }
        return item;
      });
      return nuevoEstado;
    });
  };

  const actualizarRedes2daEtapa = (nuevoComando, indice) => {
    setComandosSegundaEtapa((prevState) => {
      const nuevoEstado = prevState.map((item, index) => {
        if (index === indice) { 
          return { ...item, respuesta: nuevoComando };
        }
        return item;
      });
      return nuevoEstado;
    });
  };

  return (
    <>
      <BarraSuperior titulo="Simulaciones" />

      <Modal
        show={modalConfiguracionRip}
        onHide={() => setModalConfiguracionRip(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Configuracion General de Simulacion Rip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Primera Red:
            </label>
            <input
              type="text"
              id="nombre"
              name="primera_red"
              className="form-control"
              onBlur={handleChange}
            />
            {errors.primera_red && (
              <span className="advertencia-creEve">{errors.primera_red}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">
              Segunda Red:
            </label>
            <input
              type="text"
              id="imagen"
              name="segunda_red"
              className="form-control"
              onBlur={handleChange}
            />
            {errors.segunda_red && (
              <span className="advertencia-creEve">{errors.segunda_red}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">
              Mascara de Red:
            </label>
            <input
              type="text"
              id="imagen"
              name="mascara"
              className="form-control"
              onBlur={handleChange}
            />
            {errors.mascara && (
              <span className="advertencia-creEve">{errors.mascara}</span>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={guardarConfiguracionRip}>
            Guardar Configuracion
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalConfiguracion1eraEtapaRip}
        onHide={() => setModalConfiguracion1eraEtapaRip(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Configuracion de 1era Etapa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comandos1erEtapa.map((comando, index) => {
            return (
              <>
                <Row className="mb-3">
                  <Row>
                    <Col>
                      <pre>
                        {">"} {comando.comando}
                      </pre>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <textarea
                        type="text"
                        id="imagen"
                        name="mascara"
                        className="form-control"
                        onBlur={(evento) =>
                          handleChange1eraEtapa(evento, index)
                        }
                      />
                    </Col>
                  </Row>
                </Row>
              </>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={guardarConfiguracion1eraEtapaRip}>
            Configurar 1era Etapa
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={configuracion2daEtapaRip}
        onHide={() => setConfiguracion2daEtapaRip(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Configuracion de 2da Etapa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comandos2daEtapa.map((comando, index) => {
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
                            disabled
                          />
                        </pre>
                      </Col>
                      <Col xs={2}>
                        <pre>{comando.comando}</pre>
                      </Col>
                      <Col xs={2}></Col>
                    </Row>

                    <Row>
                      <Col>
                        <textarea
                          type="text"
                          id="imagen"
                          name="mascara"
                          className="form-control"
                          onBlur={(evento) =>
                            handleChange2daEtapa(evento, index)
                          }
                        />
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
                          disabled
                        />
                      </Col>
                      <Col xs={2}></Col>
                    </Row>

                    <Row>
                      <Col>
                        <textarea
                          type="text"
                          id="imagen"
                          name="mascara"
                          className="form-control"
                          onBlur={(evento) =>
                            handleChange2daEtapa(evento, index)
                          }
                        />
                      </Col>
                    </Row>
                  </Row>
                )}
              </>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={guardarConfiguracion2daEtapaRip}>
            Configurar 2da Etapa
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={configuracion3raEtapaRip}
        onHide={() => setConfiguracion3raEtapaRip(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Configuracion de 3era Etapa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comandos1erEtapa.map((comando, index) => {
            return (
              <>
                <Row className="mb-3">
                  <Row>
                    <Col>
                      <pre>
                        {">"} {comando.comando}
                      </pre>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <textarea
                        type="text"
                        id="imagen"
                        name="mascara"
                        className="form-control"
                        onBlur={(evento) =>
                          handleChange3raEtapa(evento, index)
                        }
                      />
                    </Col>
                  </Row>
                </Row>
              </>
            );
          })}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={guardarConfiguracion3eraEtapaRip}>
            Configurar 3era Etapa
          </Button>
        </Modal.Footer>
      </Modal>

      <MDBContainer fluid className="my-5 text-center">
        <MDBRow>
          <MDBCol md="12" lg="4" className="mb-4">
            <MDBCard>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom"
              >
                <MDBCardImage src={protocolo_rip} fluid className="w-100" />
                <a href="#!">
                  <div className="mask">
                    <div className="d-flex justify-content-start align-items-end h-100">
                      <h5>
                        <span className="badge bg-primary ms-2">
                          Protocolos
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBRow>
                  <a href="#!" className="text-reset">
                    <h5 className="card-title mb-3">
                      Simulacion de Protocolo RIP V2
                    </h5>
                  </a>
                </MDBRow>

                <MDBRow>
                  <h6 className="mb-3">Una descripcion</h6>
                </MDBRow>

                <MDBRow>
                  <MDBCol>
                    <Button
                      variant="info"
                      onClick={() => setModalConfiguracionRip(true)}
                      style={{
                        backgroundColor: "#65B8A6",
                        borderColor: "#65B8A6",
                      }}
                    >
                      <BuildIcon />
                    </Button>
                  </MDBCol>
                  <MDBCol>
                    <Button
                      variant="info"
                      onClick={() => iniciarSimulacionRip()}
                      style={{
                        backgroundColor: "#65B8A6",
                        borderColor: "#65B8A6",
                      }}
                    >
                      <PlayCircleIcon />
                    </Button>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBCard onClick={DirigirCableado}>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom"
              >
                <MDBCardImage
                  src={imagen_cableado}
                  fluid
                  style={{ width: "66%", height: "280px" }}
                />
                <a href="#!">
                  <div className="mask">
                    <div className="d-flex justify-content-start align-items-end h-100">
                      <h5>
                        <span className="badge bg-primary ms-2">Cableado</span>
                      </h5>
                    </div>
                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <MDBRow>
                  <a href="#!" className="text-reset">
                    <h5 className="card-title mb-3">Simulacion de Cableado</h5>
                  </a>
                </MDBRow>

                <MDBRow>
                  <h6 className="mb-3">Una descripcion</h6>
                </MDBRow>

                <MDBRow>
                  <MDBCol>
                    <Button
                      variant="info"
                      onClick={() => editarSimulacionCableado()}
                      style={{
                        backgroundColor: "#65B8A6",
                        borderColor: "#65B8A6",
                      }}
                    >
                      <BuildIcon />
                    </Button>
                  </MDBCol>
                  <MDBCol>
                    <Button
                      variant="info"
                      onClick={() => iniciarSimulacionCableado()}
                      style={{
                        backgroundColor: "#65B8A6",
                        borderColor: "#65B8A6",
                      }}
                    >
                      <PlayCircleIcon />
                    </Button>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4">
            <MDBCard onClick={() => (window.location.href = "./simulacionBGP")}>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom"
              >
                <MDBCardImage
                  src={protocolo_bgp}
                  fluid
                  className="w-100"
                  style={{ width: "66%", height: "280px" }}
                />
                <a href="#!">
                  <div className="mask">
                    <div className="d-flex justify-content-start align-items-end h-100">
                      <h5>
                        <span className="badge bg-primary ms-2">
                          Protocolos
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <a href="#!" className="text-reset">
                  <h5 className="card-title mb-3">
                    Simulacion de Protocolo BGP
                  </h5>
                </a>
                <a href="#!" className="text-reset">
                  <p></p>
                </a>
                <h6 className="mb-3">Una descripcion</h6>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="12" lg="4" className="mb-4">
            <MDBCard onClick={RedirigirRIP}>
              <MDBRipple
                rippleColor="light"
                rippleTag="div"
                className="bg-image rounded hover-zoom"
              >
                <MDBCardImage src={protocolo_ospf} fluid className="w-100" />
                <a href="#!">
                  <div className="mask">
                    <div className="d-flex justify-content-start align-items-end h-100">
                      <h5>
                        <span className="badge bg-primary ms-2">
                          Protocolos
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="hover-overlay">
                    <div
                      className="mask"
                      style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
                    ></div>
                  </div>
                </a>
              </MDBRipple>
              <MDBCardBody>
                <a href="#!" className="text-reset">
                  <h5 className="card-title mb-3">
                    Simulacion de Protocolo OSPF
                  </h5>
                </a>
                <a href="#!" className="text-reset">
                  <p></p>
                </a>
                <h6 className="mb-3">Una descripcion</h6>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6" lg="4" className="mb-4"></MDBCol>
          <MDBCol md="6" lg="4" className="mb-4"></MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
}

export default HomePage;
