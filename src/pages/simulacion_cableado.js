
import BarraSuperior from '../components/BarraSuperior';
import BotonTipoCable from '../components/BotonTipoCable';
import imagen_cable_serial from '../images/imagen_cable_serial.jpg';
import imagen_cable_ethernet from '../images/imagen_cable_ethernet.jpg';
import imagen_cable_consola from '../images/imagen_cable_consola.jpg';
import CanvasComponent from '../components/CanvasComponent';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

function Simulacion_cableado(props) {

  const desafioSerialesEnLinea = [{opcion: 'Conectar Serial 1 de Cisco 1 a Serial 1 de Cisco 2', action1: 'entradaSerialCisco1',action2:'entradaSerialCisco2'},
                                  {opcion: 'Conectar Serial 2 de Cisco 1 a Serial 2 de Cisco 2',action1: 'entradaSerialCisco11',action2:'entradaSerialCisco21'}];

  const desafioSerialesEnCruz = [{opcion: 'Conectar Serial 1 de Cisco 1 a Serial 2 de Cisco 2',action1: 'entradaSerialCisco1',action2:'entradaSerialCisco21'},
                               {opcion: 'Conectar Serial 2 de Cisco 1 a Serial 1 de Cisco 2',action1: 'entradaSerialCisco11',action2:'entradaSerialCisco2'}];

  const desafioEthernetsEnLinea = [{opcion: 'Conectar Ethernet 1 de Cisco 1 a Ethernet 1 de Cisco 2',action1: 'entradaEthernetCisco1',action2:'entradaEthernetCisco2'},
                                 {opcion: 'Conectar Ethernet 2 de Cisco 1 a Ethernet 2 de Cisco 2',action1: 'entradaEthernetCisco11',action2:'entradaEthernetCisco21'}];

  const desafioEthernetsEnCruz = [{opcion: 'Conectar Ethernet 1 de Cisco 1 a Ethernet 2 de Cisco 2',action1: 'entradaEthernetCisco1',action2:'entradaEthernetCisco21'},
                                {opcion: 'Conectar Ethernet 2 de Cisco 1 a Ethernet 1 de Cisco 2',action1: 'entradaEthernetCisco11',action2:'entradaEthernetCisco2'}];

  const desafioConsola = [{opcion: 'Conectar Consola de Cisco 1 a USB de PC',action1: 'entradaUsbPC',action2:'entradaConsolaCisco1'},
                        {opcion: 'Conectar Consola de Cisco 2 a USB de PC',action1: 'entradaUsbPC',action2:'entradaConsolaCisco2'}];
  
  const [botonDeshabilitado, setBotonDeshabilitado] = useState(false);
  const [lineColor, setLineColor] = useState('white'); // Estado para almacenar el color de las líneas
  const [botonVerificar, setVerificar] = useState(false);
  const [instruccionesAux,setInstrucciones] = useState([]);
  const [contenidoParrafo, setContenidoParrafo] = useState(
    <p style={{ marginLeft: '10px' }}>
      Tutorial:<br />
      1. Seleccionar el cable serial, ethernet o consola de la parte inferior<br />
      2. Con el cable seleccionado elegir los puertos a conectar<br />
      3. Antes de pulsar en el boton de "Generar desafio" usted puede probar las conexiones.<br />
      4. Al generar el desafio se le dara una serie de conexiones a realizar, una vez hecha las conexiones, pulsar en el <br />
      boton verificar.
    </p>
  );
  
  const generarDesafioAleatorioSeriales = () => {
    const numeroDeEscogidos = Math.floor(Math.random() * 2); // Esto generará 0 o 1
    let opciones = [];
    let instruccionParrafo = [];
    let opcionSerial0;
    let opcionSerial1;
    let opcionSerial2;
  
    console.log(numeroDeEscogidos);
  
    if(numeroDeEscogidos === 0){
        // Si randomIndex es 0, escoge la opción1; si es 1, escoge la opción2
        const randomSerial = Math.floor(Math.random() * 2);//1
        const randomIndex = Math.floor(Math.random() * 2);//1
        console.log(randomSerial);
        console.log(randomIndex);
        let opcionesSeriales = [desafioSerialesEnLinea,desafioSerialesEnCruz];
        let opcionEscogida0 = opcionesSeriales[randomSerial];
        let opcionEscogida = opcionEscogida0[randomIndex];
        console.log(opcionEscogida);
        opcionSerial0 = { action1: opcionEscogida.action1, action2: opcionEscogida.action2 };
        console.log(opcionSerial0);
        opciones.push(opcionSerial0);
        instruccionParrafo.push(opcionEscogida.opcion);
    }
    else{
      const randomIndex2 = Math.floor(Math.random() * 2);
      let opcionesSeriales = [desafioSerialesEnLinea,desafioSerialesEnCruz];
      let opcionEscogida = opcionesSeriales[randomIndex2];
      opcionSerial1 = { action1: opcionEscogida[0].action1, action2: opcionEscogida[0].action2 };
      opcionSerial2 = { action1: opcionEscogida[1].action1, action2: opcionEscogida[1].action2 };
      opciones.push(opcionSerial1);
      opciones.push(opcionSerial2);
      console.log(opcionSerial1);
      console.log(opcionSerial2);
      instruccionParrafo.push(opcionEscogida[0].opcion);
      instruccionParrafo.push(opcionEscogida[1].opcion);
    }
     return { opciones, instruccionParrafo };
  };

  const generarDesafioAleatorioEthernets = () => {
    const numeroDeEscogidos = Math.floor(Math.random() * 2); // Esto generará 0 o 1
    let opciones = [];
    let instruccionParrafo = [];
    let opcionEthernet0;
    let opcionEthernet1;
    let opcionEthernet2;
  
    console.log(numeroDeEscogidos);
  
    if(numeroDeEscogidos === 0){
        // Si randomIndex es 0, escoge la opción1; si es 1, escoge la opción2
        const randomEthernet = Math.floor(Math.random() * 2);//1
        const randomIndex = Math.floor(Math.random() * 2);//1
        console.log(randomEthernet);
        console.log(randomIndex);
        let opcionesEthernets = [desafioEthernetsEnLinea,desafioEthernetsEnCruz];
        let opcionEscogida0 = opcionesEthernets[randomEthernet];
        let opcionEscogida = opcionEscogida0[randomIndex];
        console.log(opcionEscogida);
        opcionEthernet0 = { action1: opcionEscogida.action1, action2: opcionEscogida.action2 };
        console.log(opcionEthernet0);
        opciones.push(opcionEthernet0);
        instruccionParrafo.push(opcionEscogida.opcion);
    }
    else{
      const randomIndex2 = Math.floor(Math.random() * 2);
      let opcionesEthernets = [desafioEthernetsEnLinea,desafioEthernetsEnCruz];
      let opcionEscogida = opcionesEthernets[randomIndex2];
      opcionEthernet1 = { action1: opcionEscogida[0].action1, action2: opcionEscogida[0].action2 };
      opcionEthernet2 = { action1: opcionEscogida[1].action1, action2: opcionEscogida[1].action2 };
      opciones.push(opcionEthernet1);
      opciones.push(opcionEthernet2);
      console.log(opcionEthernet1);
      console.log(opcionEthernet2);
      instruccionParrafo.push(opcionEscogida[0].opcion);
      instruccionParrafo.push(opcionEscogida[1].opcion);
    }
    return {opciones,instruccionParrafo};
  };

  const generarDesafioConsola = () => {
   const randomIndex = Math.floor(Math.random() * 2);
   let opciones = [];
   let instruccionParrafo = [];

   if(randomIndex === 0){
      opciones.push({ action1: desafioConsola[0].action1, action2: desafioConsola[0].action2 });
      instruccionParrafo.push(desafioConsola[0].opcion);
   }
   else{
      opciones.push({ action1: desafioConsola[1].action1, action2: desafioConsola[1].action2 });
      instruccionParrafo.push(desafioConsola[1].opcion);
   }
   console.log(opciones);
   
   return {opciones,instruccionParrafo};
};

  const handleClickSerial = () => {
      Swal.fire('Cable serial seleccionado','','warning');
      setLineColor('red'); // Establecer el color de las líneas
    };
  
  const handleClickEthernet = () => {
      Swal.fire('Cable ethernet seleccionado','','warning');
      setLineColor('green'); // Establecer el color de las líneas
  };

  const handleClickConsola = () => {
      Swal.fire('Cable consola seleccionado','','warning');
      setLineColor('blue'); // Establecer el color de las líneas
  };

  const RegresarHomePage = () => {
    window.location.href = "./home_page";
  };

  const verificarPulsado = () =>{
    setVerificar(true);
  }

const aniadirInstrucciones = () => {
  const instrucciones = generarDesafioAleatorioSeriales();
  setInstrucciones(instrucciones.opciones);
  setContenidoParrafo(instrucciones.instruccionParrafo);

  const instrucciones2 = generarDesafioAleatorioEthernets();
  instrucciones2.opciones.forEach(instr => {
    setInstrucciones(prevInstrucciones => [...prevInstrucciones, instr]);
  });
  instrucciones2.instruccionParrafo.forEach(instr => {
    setContenidoParrafo(prevInstrucciones => [...prevInstrucciones, instr]);
  });
  const instrucciones3 = generarDesafioConsola();
  instrucciones3.opciones.forEach(instr => {
    setInstrucciones(prevInstrucciones => [...prevInstrucciones,instr]);
  });
    instrucciones3.instruccionParrafo.forEach(instr => {
    setContenidoParrafo(prevInstrucciones => [...prevInstrucciones, instr]);
  });
  setBotonDeshabilitado(true);
};

useEffect(() => {
  console.log('Instrucciones actualizadas:', instruccionesAux);
}, [instruccionesAux]); // Se ejecutará cuando instrucciones cambie
useEffect(() => {
  console.log('Instrucciones Parrafo:', contenidoParrafo);
},[contenidoParrafo]);

  return (
    <div>
      <BarraSuperior titulo="Simulador de Cableado" />
      <div className="d-flex justify-content-between align-items-center">
        {contenidoParrafo}
        <Button onClick={aniadirInstrucciones} disabled={botonDeshabilitado} >Generar Desafio Aleatorio</Button>
      </div>
      <div>
      <Button color="primary" onClick={RegresarHomePage}>
          Volver al Menu
        </Button>
      </div>
      <div>
      <Button variant="warning" onClick={verificarPulsado} disabled={!botonDeshabilitado}>
          Verificar
        </Button>
      </div>

      <CanvasComponent lineColor={lineColor} parrafo={instruccionesAux} botonVerificar={botonVerificar} botonGenerar={botonDeshabilitado}/>
    
      <BotonTipoCable onClick={handleClickSerial} left={30} transform={-100} imagenSrc={imagen_cable_serial} color={'red'} borderColor="red"></BotonTipoCable>
      <BotonTipoCable onClick={handleClickEthernet} left={50} transform={-100} imagenSrc={imagen_cable_ethernet} color = {'green'} borderColor="green"></BotonTipoCable>
      <BotonTipoCable onClick={handleClickConsola} left={70} transform={-100} imagenSrc={imagen_cable_consola} color = {'blue'} borderColor="blue"></BotonTipoCable>
     
    </div>  
  );
}

export default Simulacion_cableado
