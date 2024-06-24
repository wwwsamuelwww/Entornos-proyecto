import React, { useRef, useEffect, useState} from 'react';
import entradaConsolaCisco1 from '../images/entradaConsola.png'; 
import entradaEthernetCisco1 from '../images/entradaEthernet.png';
import entradaEthernetCisco11 from '../images/entradaEthernet.png';
import entradaSerialCisco1 from '../images/entradaSerial.png';
import entradaSerialCisco11 from '../images/entradaSerial.png';
import entradaUsbPC from '../images/entradaUsb.png';
import entradaConsolaCisco2 from '../images/entradaConsola.png'; 
import entradaEthernetCisco2 from '../images/entradaEthernet.png';
import entradaEthernetCisco21 from '../images/entradaEthernet.png';
import entradaSerialCisco2 from '../images/entradaSerial.png';
import entradaSerialCisco21 from '../images/entradaSerial.png';
import Swal from 'sweetalert2';

function CanvasComponent({ lineColor,parrafo,botonVerificar,botonGenerar}) {
  const images = [
    { nombreEntrada: 'Serial 1', src: entradaSerialCisco1, x: 150, y: 50, action: 'entradaSerialCisco1'  },
    { nombreEntrada: 'Serial 2', src: entradaSerialCisco11, x: 150, y: 175, action: 'entradaSerialCisco11'  },
    { nombreEntrada: 'Ethernet 1', src: entradaEthernetCisco1, x: 150, y: 300, action: 'entradaEthernetCisco1'  },
    { nombreEntrada: 'Ethernet 2', src: entradaEthernetCisco11, x: 150, y: 425, action: 'entradaEthernetCisco11'  },
    { nombreEntrada: 'Consola', src: entradaConsolaCisco1, x: 150, y: 550, action: 'entradaConsolaCisco1' },
    { nombreEntrada: 'USB', src: entradaUsbPC, x: 630, y: 50, action: 'entradaUsbPC'  },
    { nombreEntrada: 'Serial 1', src: entradaSerialCisco2, x: 1150, y: 50, action: 'entradaSerialCisco2'  },
    { nombreEntrada: 'Serial 2', src: entradaSerialCisco21, x: 1150, y: 175, action: 'entradaSerialCisco21'  },
    { nombreEntrada: 'Ethernet 1', src: entradaEthernetCisco2, x: 1150, y: 300, action: 'entradaEthernetCisco2'  },
    { nombreEntrada: 'Ethernet 2',src: entradaEthernetCisco21, x: 1150, y: 425, action: 'entradaEthernetCisco21'  },
    { nombreEntrada: 'Consola', src: entradaConsolaCisco2, x: 1150, y: 550, action: 'entradaConsolaCisco2'  }
  ];

  useEffect(() => {
    if(botonGenerar === true){
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      setClickedImages([]);
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de dibujar nuevas líneas
    }
  },[botonGenerar])

  useEffect(() => {
    if (botonVerificar === true) {
      let sumaIguales = 0;
      let sumaNoExisten = 0;
      clickedImages.forEach(elementos => {
          let actual = {action1: elementos.action1, action2: elementos.action2};
          const existe = parrafo.some(par => {
            return (par.action1 === actual.action1 && par.action2 === actual.action2) || 
                  (par.action2 === actual.action1 && par.action1 === actual.action2);
          });
          if(existe === true){
            sumaIguales = sumaIguales + 1;
          }
          else{
            sumaNoExisten = sumaNoExisten + 1;
          }
      });
      if(sumaIguales === parrafo.length && sumaNoExisten === 0){
        Swal.fire({
          title: 'La conexion es correcta, felicidades!!!',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
      else{
        Swal.fire({
          title: 'Fallaste, vuelve a intentarlo',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
      console.log('El botón verificar ha sido pulsado');
    }
  },[botonVerificar]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const imageSize = 80;

    setTimeout(() => {
      ctx.font = '20px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText('Cisco 1', 50, 325);
      ctx.fillText('PC', 650, 30);
      ctx.fillText('Cisco 2', 1300, 325);
    }, 10);

    images.forEach(imageData => {
      const img = new Image();
      img.src = imageData.src;
      img.onload = () => {
 
        ctx.drawImage(img, imageData.x, imageData.y,  imageSize, imageSize);
        ctx.font = '20px Arial';
        ctx.fillStyle = 'black';
        ctx.fillText(imageData.nombreEntrada, imageData.x, imageData.y+110);
      };
    });

    ctx.fillStyle = '#FFFFFF';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    canvas.addEventListener('click', handleClick);

    return () => {
      canvas.removeEventListener('click', handleClick);
    };
  }, [images]);
  
  const [clickedImages, setClickedImages] = useState([]); 


  const canvasRef = useRef(null);
  const [firstClickedImage, setFirstClickedImage] = useState(null); // Estado para almacenar la primera imagen pulsada

  function handleClick(event) {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const imageSize = 80; 

    images.forEach(imageData => {
      if (x >= imageData.x && x <= imageData.x + imageSize &&
          y >= imageData.y && y <= imageData.y + imageSize) {
            if(lineColor !== 'white'){
              if (firstClickedImage) {
                let nuevo =  {action1: firstClickedImage.action, x1:firstClickedImage.x, y1: firstClickedImage.y, action2: imageData.action, x2:imageData.x, y2: imageData.y};
                const existeParValido = paresValidos.findIndex(par => {
                  return (par.action1 === nuevo.action1 && par.action2 === nuevo.action2) || 
                        (par.action2 === nuevo.action1 && par.action1 === nuevo.action2)});
                if(existeParValido !== -1){
                  if((existeParValido >= 0 && existeParValido <= 3 && lineColor === 'red') || 
                     (existeParValido >= 4 && existeParValido <= 7 && lineColor === 'green') ||
                     (existeParValido >= 8 && existeParValido <= 9 && lineColor === 'blue')){

                      const existeEnPulsados = clickedImages.some(par => {
                        return (par.action1 === nuevo.action1 && par.action2 === nuevo.action2) || 
                              (par.action2 === nuevo.action1 && par.action1 === nuevo.action2);
                      });
                      const existeEnCadenas = clickedImages.some(cadena => {
                        return cadena.action1 === nuevo.action1 || cadena.action2 === nuevo.action1 ||
                              cadena.action1 === nuevo.action2 || cadena.action2 === nuevo.action2;
                      });
                      if(existeEnPulsados){
                        Swal.fire('Esta conexion ya fue realizada','','error');
                      }
                      if(existeEnCadenas){
                        Swal.fire('Este puerto esta en uso','','error');
                      }
                      if(!existeEnPulsados && !existeEnCadenas){
                        nuevo =  {action1: firstClickedImage.action, x1:firstClickedImage.x, y1: firstClickedImage.y, action2: imageData.action, x2:imageData.x, y2: imageData.y, colorLinea:lineColor};
                        setClickedImages(prevState => [
                          ...prevState,
                              nuevo
                        ]);
                        Swal.fire('Conexion realizada', '','success');
                      }
                     }
                     else{
                      Swal.fire('El cable elegido no es compatible con el puerto elegido','','error');
                     }
                }
                else{
                  Swal.fire('No se permite este tipo de conexion','','error');
                }
            console.log(nuevo);
            setFirstClickedImage(null); 
          } else {
            setFirstClickedImage(imageData);
          }
          // Realizar acciones correspondientes al hacer clic en la imagen aquí
        }
        else{
          Swal.fire('Elija un cable','','warning');
        }
               
      }
    });
  }
    

  const paresValidos = [
     {action1: 'entradaSerialCisco1',action2:'entradaSerialCisco2'},
     {action1: 'entradaSerialCisco1',action2:'entradaSerialCisco21'},
     {action1: 'entradaSerialCisco11',action2:'entradaSerialCisco2'},
     {action1: 'entradaSerialCisco11',action2:'entradaSerialCisco21'},

     {action1: 'entradaEthernetCisco1',action2:'entradaEthernetCisco2'},
     {action1: 'entradaEthernetCisco1',action2:'entradaEthernetCisco21'},
     {action1: 'entradaEthernetCisco11',action2:'entradaEthernetCisco2'},
     {action1: 'entradaEthernetCisco11',action2:'entradaEthernetCisco21'},

     {action1: 'entradaUsbPC',action2:'entradaConsolaCisco1'},
     {action1: 'entradaUsbPC',action2:'entradaConsolaCisco2'}
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Función para dibujar las líneas en el canvas
    function drawLines() {
      
      //ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de dibujar nuevas líneas

      
      ctx.lineWidth = 5; // Grosor de las líneas
      
      clickedImages.forEach(line => {
        ctx.strokeStyle = line.colorLinea; // Color de las líneas
        ctx.beginPath();
        ctx.moveTo(line.x1+40, line.y1+40); // Punto inicial de la línea
        ctx.lineTo(line.x2+40, line.y2+40); // Punto final de la línea
        ctx.stroke(); // Dibujar la línea
      });
    }

    // Llamar a la función drawLines al montar el componente y cada vez que linesData cambie
    drawLines();
    console.log('imagenes clickeadas',clickedImages);
  }, [clickedImages]);

  return (
    <canvas ref={canvasRef} width={1500} height={700} />
  );
}
export default CanvasComponent;
