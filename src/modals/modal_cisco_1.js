import React, {useState, useEffect} from  'react';
import '../css/modal_window_style.css'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import HelpIcon from '@mui/icons-material/Help';
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

function ModalCisco1({estado1, cambiarEstado1}) {

  const [inputComando, setInputComandos] = useState('');
  const [outputComando, setOutputComando] = useState('');
  const [comandoCorrecto, setComandoCorrecto] = useState(false);
  const [posicionComando, setPosicionComando] = useState(0);
  const [comandos, setComandos] = useState([
    ["router", "rip"],
    ["network", "192.168.3.0"],
  ])
  const [mensaje, setMensaje] = useState('');

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
      //let comandos = [
        //["router", "rip"],
        //["network", "192.168.3.0"],
      //];
      let comando_ingresado_separado = command.trim().split(" ");

      if (comandos[posicionComando].length !== comando_ingresado_separado.length) {
        setMensaje("Pista para el estudiante");
        return "Comando no reconocido. Mantenga cursor en ? para mas informacion";
      }
      return compararComando(comandos[posicionComando], comando_ingresado_separado)

    };

    const compararComando = (comando_esperado, comando_ingresado)=>{

      for (let i = 0; i < comando_esperado.length; i++) {
        if (comando_esperado[i] !== comando_ingresado[i].toLowerCase()) {
          setMensaje("Pista para el estudiante");
          return (
            'Comando no reconocido. Error en "' +
            comando_ingresado[i] +
            '". Mantenga cursor en ? para mas informacion'
          );
        }

        if (i === comando_esperado.length - 1) {
          let nueva_posicion = posicionComando + 1;
          if(nueva_posicion >= comandos.length){
            document.getElementById('Entrada de comandos1').readOnly = true;
            return "Correcto. Este router ya se encuentra configurado!";
          }
          setPosicionComando(nueva_posicion)
          return "Correcto.";
        }
      }
    }

    return (
      estado1 && (
        <div className="Overlay">
          <div className="ContenedorModal">
            <div className="EncabezadoModal">
              <div className="tituloEvento">
                <h1>Consola de Comandos Cisco No 1</h1>
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
                        id='Entrada de comandos1'
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
  
  export default ModalCisco1;