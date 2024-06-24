import React, {useState, useEffect} from  'react';
import ModalCisco2 from '../modals/modal_cisco_2';
import Button from 'react-bootstrap/Button';
import {
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import BarraSuperior from '../components/BarraSuperior';
import { Modal, Col, Row, Form } from 'react-bootstrap';
import CanvasComponentRip from '../components/CanvasComponentRip';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import Container from 'react-bootstrap/Container';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

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

function SimulacionRipTerceraEtapa() {

  const primera_red = cookies.get('primera_red');
  const segunda_red = cookies.get('segunda_red');
  const direccion_pc = cookies.get('direccion_pc');
  const puerta_enlace = cookies.get('puerta_enlace');
  const mascara = cookies.get('mascara');
  const pistas_3ra_etapa_rip = cookies.get('pistas_3ra_etapa_rip');
  const puntuacion_primera_etapa = cookies.get('puntuacion_primera_etapa');
  
  useEffect(() => {
    configurarComandos();
    console.log(puntuacion_primera_etapa)
  }, []);

  const [inputComando, setInputComandos] = useState('');
  const [outputComando, setOutputComando] = useState('');
  const [posicionComando, setPosicionComando] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [puntuacion, setPuntuacion] = useState(100);
  const [puntuacionTotal, setPuntuacionTotal] = useState(0);
  const [cantidad_errores, setCantidadErrores] = useState(0);
  const [siguienteEtapa, setSiguienteEtapa] = useState(true);

  const [puntuacion3raEtapa, setPuntuacion3raEtapa] = useState(false);
  const [modalCisco3raEtapa, setModalCisco3raEtapa] = useState(false);
  const [puntuacionTotal3raEtapa, setPuntuacionTotal3raEtapa] = useState(false);

  const [comandos, setComandos] = useState([
    ["enable"],
    ["configure", "terminal"],
    ["router", "rip"],
    ["version", "2"],
    ["network", "primera_red"],
    ["network", "segunda_red"],
    ["exit"],
  ]);

  const [errors, setErrors] = useState({});
  
    const [values, setValues] = useState({
        estado_modal_1 : false,
        direccion_ip : "",
        mascara : "",
        puerta_enlace: "",
    });

    const [comandoPCPrimeraEtapa, setComandoPCPrimeraEtapa] = useState([
      {nombre: "Direccion IP", direccion_ip: "enable", explicacion: "El comando enable se utiliza para acceder al modo EXEC privilegiado"},
      {nombre: "Mascara de subred", mascara: "enable", explicacion: "El comando enable se utiliza para acceder al modo EXEC privilegiado"},
      {nombre: "Puerta de enlace predeterminada", puerta_enlace: "enable", explicacion: "El comando enable se utiliza para acceder al modo EXEC privilegiado"},
    ]);

    const [showModal, setShowModal] = useState(false);
    const [lineColor, setLineColor] = useState('white');
    const [estado_modal2, setEstadoModal2] = useState(false);

    const cambiarEstadoModal2 = (nuevoEstado) => {
      setEstadoModal2(nuevoEstado)
    };

    const generarDesafio = () => {

      let max = 10;
      let min = 5;

      var numeroAleatorio = Math.random();

      // Ajustar el número al rango dado y redondearlo al entero más cercano
      var numeroEnRango = Math.floor(numeroAleatorio * (max - min + 1)) + min;
    };

    const cerrarModal = () => {
      setShowModal(false); // Cerrar la ventana emergente
    };

    const handleSubmit =  (e) => {
      const validationErrors = {};

      if (!values.direccion_ip.trim()) {
        validationErrors.direccion_ip = "Este campo es obligatorio";
      }else if(values.direccion_ip !== direccion_pc){
        validationErrors.direccion_ip = "Comando incorrecto";
      }
  
      if (!values.mascara.trim()) {
        validationErrors.mascara = "Este campo es obligatorio";
      }else if(values.mascara !== mascara){
        validationErrors.mascara = "Comando incorrecto";
      }

      if (!values.puerta_enlace.trim()) {
        validationErrors.puerta_enlace = "Este campo es obligatorio";
      }else if(values.puerta_enlace !== puerta_enlace){
        validationErrors.puerta_enlace = "Comando incorrecto";
      }
  
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        cerrarModal()
        Swal.fire('PC configurada correctamente', '','success');
      }

    };

    const abrirModalPC = () => {
      setShowModal(true);
    };

    const handleInputChange = (event) => {
      setInputComandos(event.target.value);
    };
  
    const handleCommandSubmit = (event) => {

      event.preventDefault();
      // Procesar el comando
      const result = processCommand(inputComando);
      // Actualizar el estado de salida con el resultado
      setOutputComando(outputComando + '> ' + inputComando + '\n' + result + '\n');
      // Limpiar el estado de entrada
      setInputComandos('');
    };

    const processCommand = (command) => {

      let comando_ingresado_separado = command.trim().split(" ");

      if (comandos[posicionComando].length !== comando_ingresado_separado.length) {
        //setMensaje("Pista para el estudiante");
        setMensaje(pistas_3ra_etapa_rip[posicionComando]);
        setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
        setCantidadErrores(cantidad_errores => cantidad_errores + 1);
        return "Comando no reconocido. Mantenga cursor en ? para mas informacion";
      }
      return compararComando(comandos[posicionComando], comando_ingresado_separado)

    };

    const compararComando = (comando_esperado, comando_ingresado)=>{

      for (let i = 0; i < comando_esperado.length; i++) {
        if (comando_esperado[i] !== comando_ingresado[i].toLowerCase()) {
          //setMensaje("Pista para el estudiante");
          setMensaje(pistas_3ra_etapa_rip[posicionComando]);
          setPuntuacion(prevPuntuacion => prevPuntuacion - 1);
          setCantidadErrores(cantidad_errores => cantidad_errores + 1);
          return (
            'Comando no reconocido. Error en "' +
            comando_ingresado[i] +
            '". Mantenga cursor en ? para mas informacion'
          );
        }

        if (i === comando_esperado.length - 1) {
          let nueva_posicion = posicionComando + 1;
          if(nueva_posicion >= comandos.length){
            document.getElementById('Entrada de comandos2').readOnly = true;
            return "Correcto. Este router ya se encuentra configurado!";
          }
          setPosicionComando(nueva_posicion)
          //indice = indice + 1;
          return "Correcto.";
        }
      }
    }

    const pasarSiguienteEtapa = () => {
      if(siguienteEtapa){
        setPuntuacionTotal(Number(((puntuacion + puntuacion_primera_etapa)/3).toFixed(1)));
        setPuntuacion3raEtapa(false);
        setPuntuacionTotal3raEtapa(true);
      }else{
        
      }
    };

    const evaluar3raEtapa = () => {
      setPuntuacion3raEtapa(true);
    };

    const terminarEjercicio = () => {
      window.location.href = "./"
    };

    const configurarComandos = () => {
      actualizarComando("primera_red", primera_red);
      actualizarComando("segunda_red", segunda_red);
    };

    const actualizarComando = (valorAnterior, nuevoValor) => {
      setComandos((prevState) => {
        // Creamos una nueva copia del array comandos
        const nuevoEstado = prevState.map((comandoArray) => {
          // Creamos una nueva copia del array interno si contiene el valorAnterior
          if (comandoArray.includes(valorAnterior)) {
            return comandoArray.map((item) => (item === valorAnterior ? nuevoValor : item));
          }
          return comandoArray; // Retornamos el array interno sin cambios si no contiene valorAnterior
        });
        return nuevoEstado;
      });
    };

    const handleChange = (e) => {
      const {name, value} = e.target;
      setValues({
          ...values,
          [name]:value,
      });
    }
  
  return (
    <>
      <ModalCisco2
        estado1={estado_modal2}
        cambiarEstado1={cambiarEstadoModal2}
      />

      <Modal
        show={puntuacion3raEtapa}
        onHide={() => setPuntuacion3raEtapa(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Evaluacion de 3ra etapa</Modal.Title>
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
          <Button variant="primary" onClick={() => pasarSiguienteEtapa()}>
            Obtener puntaje total
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={puntuacionTotal3raEtapa}
        onHide={() => setPuntuacionTotal3raEtapa(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Puntaje Total</Modal.Title>
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
                  value={puntuacionTotal}
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
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => terminarEjercicio()}>
            Terminar ejercicio
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={cerrarModal}>
        <Modal.Header closeButton className="bg-info shadow-sm ">
          <Modal.Title>Configuracion de PC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {comandoPCPrimeraEtapa.map((comando) => {
            return <></>;
          })}
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Direccion IP:
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre_categoria"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">
              Mascara de subred:
            </label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="imagen" className="form-label">
              Puerta de enlace predeterminada:
            </label>
            <input
              type="text"
              id="imagen"
              name="imagen"
              className="form-control"
            />
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
        show={modalCisco3raEtapa}
        onHide={() => setModalCisco3raEtapa(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton className="bg-info shadow-sm ">
          <Modal.Title>Cisco No 1</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="my-4">
            <div className="console">
              <pre>{outputComando}</pre>
            </div>
          </Container>
          <Container>
            <Row>
              <Col sm={1} style={{ paddingRight: "0px" , marginRight: "10px"}}>
                Router
                <span>&gt; </span>
              </Col>
              <Col style={{ paddingLeft: "0px" }}>
                <Form onSubmit={handleCommandSubmit}>
                  <Form.Group>
                    <Form.Control
                      type="text"
                      placeholder="Ingrese su comando"
                      onChange={handleInputChange}
                      value={inputComando}
                      id="Entrada de comandos2"
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col sm={2}>
                <Button variant="warning" onClick={handleCommandSubmit}>
                  Ingresar
                </Button>
              </Col>

              <Col sm={1}>
                <BootstrapTooltip title={mensaje}>
                  <HelpIcon></HelpIcon>
                </BootstrapTooltip>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModalCisco3raEtapa(false)}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <BarraSuperior titulo="Simulacion de Protocolo RIP" />

      <MDBRow className="my-3">
        <MDBCol className="d-flex align-items-center justify-content-center">
          <h2>Tercera Etapa</h2>
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
              2. Ingresar los comandos enteros.
              <br />
              3. En el caso de equivocarse, pasar el cursor por ? para mas
              informacion.
              <br />
              3. Tras configurar todos los dispositivos, terminar la simulacion.
            </p>
          </div>
        </MDBCol>

        <MDBCol md="2">
          <Button
            variant="danger"
            onClick={() => evaluar3raEtapa()}
          >
            Evaluar Etapa
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
                onClick={() => setModalCisco3raEtapa(true)}
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
                onClick={() => cambiarEstadoModal2(!estado_modal2)}
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

export default SimulacionRipTerceraEtapa;