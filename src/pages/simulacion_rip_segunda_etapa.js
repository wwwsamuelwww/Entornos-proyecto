import React, {useState, useEffect} from  'react';
import ModalCiscoSegundaEtapa from '../modals/modal_cisco_segunda_etapa';
import Button from 'react-bootstrap/Button';
import {
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import BarraSuperior from '../components/BarraSuperior';
import { Modal } from 'react-bootstrap';
import CanvasComponentRip from '../components/CanvasComponentRip';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { Col, Row } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';

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

function SimulacionRipSegundaEtapa() {

  const primera_red = cookies.get('primera_red');
  const segunda_red = cookies.get('segunda_red');
  const direccion_pc = cookies.get('direccion_pc');
  const puerta_enlace = cookies.get('puerta_enlace');
  const mascara = cookies.get('mascara');
  const comandos_2da_etapa_rip = cookies.get('comandos_2da_etapa_rip');

  useEffect(()=>{
    establecerComandos();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [puntuacion2daEtapa, setPuntuacion2daEtapa] = useState(false);

  const [lineColor, setLineColor] = useState('white');
  const [errors, setErrors] = useState({});
  const [puntuacion, setPuntuacion] = useState(100);
  const [cantidad_errores, setCantidadErrores] = useState(0);
  
  const [comandoVariable, setComandoVariable] = useState([]);

  const [siguienteEtapa, setSiguienteEtapa] = useState(true);

  const [pistas, setPistas] = useState(['', '', '', '', '']);

    const [estado_segunda_etapa, setSegundaEtapa] = useState(false);
    const [modalCisco2daEtapa, setModalCisco2daEtapa] = useState(false);

    const [comandoPC2daEtapa, setComandoPCPrimeraEtapa] = useState([
      {nombre: "Direccion IP", direccion_ip: "enable", explicacion: "El comando enable se utiliza para acceder al modo EXEC privilegiado"},
      {nombre: "Mascara de subred", mascara: "enable", explicacion: "El comando enable se utiliza para acceder al modo EXEC privilegiado"},
      {nombre: "Puerta de enlace predeterminada", puerta_enlace: "enable", explicacion: "El comando enable se utiliza para acceder al modo EXEC privilegiado"},
    ]);

    const [comandosSegundaEtapa, setComandosSegundaEtapa] = useState([
      {comando: "configure", respuesta: "terminal", posicion : 1 , pista: "", orden: "primero"},
      {comando: "router", respuesta: "rip", posicion : 1 , pista: "", orden: "segundo"},
      {comando: "2", respuesta: "version", posicion : 0 , pista: "", orden: "tercero"},
      {comando: "network", respuesta: "", posicion : 1 , pista: "", orden: "cuarto"},
      {comando: "network", respuesta: "", posicion : 1 , pista: "", orden: "quinto"},
    ]);

    const [values, setValues] = useState({
      direccion_ip : "",
      mascara : "",
      puerta_enlace: "",
      primero: "",
      segundo: "",
      tercero: "",
      cuarto: "",
      quinto: "",
      sexto: "",
    });

    const [valuesCisco, setValuesCisco] = useState({
      
    });
    
    const cambiarEstadoSegundaEtapa = (nuevoEstado, comandos) => {
      setSegundaEtapa(nuevoEstado)
      setComandoVariable(comandos)
    };

    const cerrarModal = () => {
      setShowModal(false); // Cerrar la ventana emergente
    };

    const abrirModalPC = () => {
      setShowModal(true);
    };

    const handleChange = (e) => {
      const {name, value} = e.target;
      setValues({
          ...values,
          [name]:value,
      });
    }

    const handleSubmit = (e) => {

      const validationErrors = {};

      if (!values.direccion_ip.trim()) {
        validationErrors.direccion_ip = "Este campo es obligatorio";
        setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
        setCantidadErrores(cantidad_errores => cantidad_errores + 1);
      }else if(values.direccion_ip !== direccion_pc){
        validationErrors.direccion_ip = "Comando incorrecto";
        setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
        setCantidadErrores(cantidad_errores => cantidad_errores + 1);
      }
  
      if (!values.mascara.trim()) {
        validationErrors.mascara = "Este campo es obligatorio";
        setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
        setCantidadErrores(cantidad_errores => cantidad_errores + 1);
      }else if(values.mascara !== mascara){
        validationErrors.mascara = "Comando incorrecto";
        setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
        setCantidadErrores(cantidad_errores => cantidad_errores + 1);
      }

      if (!values.puerta_enlace.trim()) {
        validationErrors.puerta_enlace = "Este campo es obligatorio";
        setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
        setCantidadErrores(cantidad_errores => cantidad_errores + 1);
      }else if(values.puerta_enlace !== puerta_enlace){
        validationErrors.puerta_enlace = "Comando incorrecto";
        setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
        setCantidadErrores(cantidad_errores => cantidad_errores + 1);
      }
  
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        cerrarModal()
        Swal.fire('PC configurada correctamente', '','success');
      }
    }

    

    const handleCommandSubmit = () => {
      const validationErrors = {};

      for (let i = 0; i < comandosSegundaEtapa.length; i++) {
        if (!values[comandosSegundaEtapa[i].orden].trim()) {
          validationErrors[comandosSegundaEtapa[i].orden] = "Este campo es obligatorio";
          setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
          setCantidadErrores(cantidad_errores => cantidad_errores + 1);
        }else if(values[comandosSegundaEtapa[i].orden] !== comandosSegundaEtapa[i].respuesta){
          validationErrors[comandosSegundaEtapa[i].orden] = "Comando incorrecto";
          setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
          setCantidadErrores(cantidad_errores => cantidad_errores + 1);
        }
      }

      if (!values.sexto.trim()) {
        validationErrors.sexto = "Este campo es obligatorio";
        setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
        setCantidadErrores(cantidad_errores => cantidad_errores + 1);
      }else if(values.sexto !== "exit"){
        validationErrors.sexto = "Comando incorrecto";
        setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
        setCantidadErrores(cantidad_errores => cantidad_errores + 1);
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        setModalCisco2daEtapa(false);
        Swal.fire('Dispositivo configurado correctamente', '','success');
      }
    };

    const establecerComandos = () => {
      setComandosSegundaEtapa(comandos_2da_etapa_rip);
      actualizarRedes2daEtapa(primera_red, 3);
      actualizarRedes2daEtapa(segunda_red, 4);
    }

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

    const pasarSiguienteEtapa = () => {
      if(siguienteEtapa){
        cookies.set("puntuacion_primera_etapa", puntuacion + 100, { path: "/" });
        window.location.href = "./simulacionRipTerceraEtapa"
      }else{
        
      }
    };

    const evaluar2daEtapa = () => {
      setPuntuacion2daEtapa(true);
    };

  return (
    <>
      <ModalCiscoSegundaEtapa
        estado1={estado_segunda_etapa}
        cambiarEstado1={cambiarEstadoSegundaEtapa}
        comandosVariable={comandoVariable}
      />

      <Modal
        show={puntuacion2daEtapa}
        onHide={() => setPuntuacion2daEtapa(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Evaluacion de 2da etapa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Row>
                <Col className="d-flex align-items-center justify-content-center">
                  <h3>Puntuacion</h3>
                </Col>
              </Row>
              <Row>
                <Gauge
                  value={puntuacion}
                  startAngle={-110}
                  endAngle={110}
                  width={300}
                  height={300}
                  sx={{
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 40,
                      transform: "translate(0px, 0px)",
                    },
                  }}
                  text={({ value, valueMax }) => `${value} / ${valueMax}`}
                />
              </Row>
            </Col>

            <Col>
              <Row>
                <Col className="d-flex align-items-center justify-content-center">
                  <h3>Errores</h3>
                </Col>
              </Row>
              <Row>
                <Gauge
                  width={250}
                  height={250}
                  value={cantidad_errores}
                  startAngle={-110}
                  endAngle={110}
                  sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 40,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: "#ff0000",
                    },
                  })}
                />
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => pasarSiguienteEtapa()}
          >
            Pasar a siguiente etapa
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton className="bg-info shadow-sm ">
          <Modal.Title>Configuracion de PC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comandoPC2daEtapa.map((comando) => {
            return <></>;
          })}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Direccion IP:
            </label>
            <input
              type="text"
              id="nombre"
              name="direccion_ip"
              className="form-control"
              onBlur={handleChange}
            />
            {errors.direccion_ip && (
              <span className="advertencia-creEve">{errors.direccion_ip}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">
              Mascara de subred:
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
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">
              Puerta de enlace predeterminada:
            </label>
            <input
              type="text"
              id="imagen"
              name="puerta_enlace"
              className="form-control"
              onBlur={handleChange}
            />
            {errors.puerta_enlace && (
              <span className="advertencia-creEve">{errors.puerta_enlace}</span>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cerrarModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={modalCisco2daEtapa}
        onHide={() => setModalCisco2daEtapa(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="bg-info shadow-sm ">
          <Modal.Title>Cisco No 2</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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

              {comandosSegundaEtapa.map((comando, index) => {
                return (
                  <>
                    {comando.posicion === 0 ? (
                      <Row className="mb-3" key={index}>
                        <Row>
                          <Col xs={3}>
                            <pre>
                              {">"}{" "}
                              <input
                                style={{ width: "100px" }}
                                name={comando.orden}
                                onBlur={handleChange}
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
                      <Row className="mb-3" key={index}>
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
                              onBlur={handleChange}
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
                        onBlur={handleChange}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCommandSubmit}>
            Ingresar comandos
          </Button>
        </Modal.Footer>
      </Modal>

      <BarraSuperior titulo="Simulacion de Protocolo RIP" />

      <MDBRow className="my-3">
        <MDBCol className="d-flex align-items-center justify-content-center">
          <h2>Segunda Etapa</h2>
        </MDBCol>
      </MDBRow>

      <MDBRow>
        <MDBCol md="10">
          <div className="d-flex justify-content-between align-items-center mb-5">
            <p style={{ marginLeft: "10px" }}>
              Instrucciones:
              <br />
              1. Dadas las redes {primera_red} y {segunda_red}, y la mascara{" "}
              {mascara} entrar a las configuraciones de los dispositivos.
              <br />
              2. Completar las palabras faltantes en los comandos respectivos.
              <br />
              3. En el caso de equivocarse, pasar el cursor por ? para mas
              informacion.
              <br />
              3. Tras configurar todos los dispositivos, pase a la siguiente
              etapa.
            </p>
          </div>
        </MDBCol>

        <MDBCol md="2">
          <Button variant="danger" onClick={() => evaluar2daEtapa()}>
            Evaluar etapa
          </Button>
        </MDBCol>
      </MDBRow>

      <MDBRow className="mb-3">
        <MDBCol className="mb-4 mb-lg-0">
          <MDBRow className="d-flex align-items-center justify-content-center">
            <MDBCol className="d-flex align-items-center justify-content-center">
              <Button
                variant="primary"
                onClick={() => abrirModalPC()}
                style={{ marginRight: "50px" }}
              >
                Mostrar Configuracion
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBCol>
      </MDBRow>

      <CanvasComponentRip lineColor={lineColor} />

      <MDBRow className="mb-3">
        <MDBCol className="mb-4 mb-lg-0">
          <MDBRow>
            <MDBCol className="d-flex align-items-center justify-content-center">
              <Button
                variant="primary"
                onClick={() => setModalCisco2daEtapa(true)}
                style={{ marginRight: "250px" }}
              >
                Mostrar Configuracion
              </Button>
            </MDBCol>
          </MDBRow>
        </MDBCol>

        <MDBCol className="mb-4 mb-lg-0">
          <MDBRow>
            <MDBCol className="d-flex align-items-center justify-content-center">
              <Button
                variant="primary"
                onClick={() => cambiarEstadoSegundaEtapa(!estado_segunda_etapa)}
                style={{ marginLeft: "210px" }}
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

export default SimulacionRipSegundaEtapa;