import React from 'react';
import '../css/BarraSuperior.css'; 

function BarraSuperior(props) {
  return (
    <header className="barra-superior">
      <h1>{props.titulo}</h1>
    </header>
  );
}

export default BarraSuperior;
