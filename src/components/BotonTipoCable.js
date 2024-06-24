import React from 'react';
import '../css/BotonTipoCable.css';

const BotonTipoCable = ({ onClick, left, transform, imagenSrc, borderColor}) => {
    const buttonStyle = {
      backgroundImage: `url(${imagenSrc})`,
      position: 'fixed',
      bottom: '20px',
      left: `${left}%`,
      transform: `translateX(${transform}%)` ,
      borderWidth: '3px', // Grosor del borde en píxeles
      borderStyle: 'solid', // Estilo del borde
      borderColor: borderColor // Establecer el color de borde
    };
  
    return (
      <button onClick={onClick} className="botonCable" style={buttonStyle}></button>
    );
  };

export default BotonTipoCable;