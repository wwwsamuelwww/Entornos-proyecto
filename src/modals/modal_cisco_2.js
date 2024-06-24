import React, {useState, useEffect} from  'react';
import '../css/modal_window_style.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import HelpIcon from '@mui/icons-material/Help';
import Cookies from 'universal-cookie';

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

function ModalCisco2({estado1, cambiarEstado1}) {

  let indice = 0;

  const primera_red = cookies.get('primera_red');
  const segunda_red = cookies.get('segunda_red');
  const pistas_3ra_etapa_rip = cookies.get('pistas_3ra_etapa_rip');
  
  const [inputComando, setInputComandos] = useState('');
  const [outputComando, setOutputComando] = useState('');
  const [posicionComando, setPosicionComando] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [comandos, setComandos] = useState([
    ["enable"],
    ["configure", "terminal"],
    ["router", "rip"],
    ["version", "2"],
    ["network", "primera_red"],
    ["network", "segunda_red"],
    ["exit"],
  ]);

  useEffect(()=>{
    configurarComandos()
  }, []);

    const salirVentanaModal =  () => {
        cambiarEstado1(false);
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
        return "Comando no reconocido. Mantenga cursor en ? para mas informacion";
      }
      return compararComando(comandos[posicionComando], comando_ingresado_separado)

    };

    const compararComando = (comando_esperado, comando_ingresado)=>{

      for (let i = 0; i < comando_esperado.length; i++) {
        if (comando_esperado[i] !== comando_ingresado[i].toLowerCase()) {
          //setMensaje("Pista para el estudiante");
          setMensaje(pistas_3ra_etapa_rip[posicionComando]);
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

    return (
      estado1 && (
        <div className="Overlay">
          <div className="ContenedorModal">
            <div className="EncabezadoModal">
              <div className="tituloEvento">
                <h1>Tercera Etapa</h1>
              </div>

              <button className="BotonSalir" onClick={salirVentanaModal}>
                salir
              </button>
            </div>
            <Container className="my-4">
              <div className="console">
                <pre>{outputComando}</pre>
              </div>
            </Container>
            <Container>
              <Row>
                <Col sm={1} style={{ paddingRight: "0px" }}>
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
                        id='Entrada de comandos2'
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
          </div>
        </div>
      )
    );
  }
  
  export default ModalCisco2;