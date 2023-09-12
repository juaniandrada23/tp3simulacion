import React, { useState } from 'react';
import './Styles/style.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const Principal = () => {
  //Decelaracion de variables principales
  const [simulaciones, setSimulaciones] = useState([]);
  const [cantidadSimulaciones, setCantidadSimulaciones] = useState(10);
  const vendedores = ['Vendedor 1', 'Vendedor 2', 'Vendedor 3', 'Vendedor 4'];

  //Funcion para calcular comision dependiendo del tipoAuto y los autos vendidos
  const calcularComision = (autosVendidos, tipoAuto) => {
    let comision = 0;
    if (tipoAuto === 'Compacto') {
      comision = 250 * autosVendidos;
    } else if (tipoAuto === 'Mediano') {
      const rndMediano = Math.random();
      if (rndMediano <= 0.4) {
        comision = 400 * autosVendidos;
      } else {
        comision = 500 * autosVendidos;
      }
    } else if (tipoAuto === 'Lujo') {
      const rndLujo = Math.random();
      if (rndLujo <= 0.35) {
        comision = 1000 * autosVendidos;
      } else if (rndLujo <= 0.75) {
        comision = 1500 * autosVendidos;
      } else {
        comision = 2000 * autosVendidos;
      }
    }
    return comision;
  };

  //Funcion para asignar vendedor dependiendo del random
  const asignarVendedor = (rnd) => {
    if (rnd <= 0.249 && rnd > 0) {
      return vendedores[0];
    } else if (rnd >= 0.25 && rnd <= 0.499) {
      return vendedores[1];
    } else if (rnd >= 0.5 && rnd <= 0.749) {
      return vendedores[2];
    } else if (rnd > 0.75 && rnd <= 0.999) {
      return vendedores[3];
    }
  };

  const realizarSimulacion = () => {
    //Array de simulaciones, aca es donde se van a ir guardando
    const simulacionesNuevas = [];
  
    for (let i = 0; i < cantidadSimulaciones; i++) {
      //CALCULO PARA SABER AUTOS VENDIDOS
      const rndAutosVendidos = Math.random();
      let autosVendidos;
  
      if (rndAutosVendidos < 0.2) {
        autosVendidos = 0;
      } else if (rndAutosVendidos < 0.5) {
        autosVendidos = 1;
      } else if (rndAutosVendidos < 0.8) {
        autosVendidos = 2;
      } else if (rndAutosVendidos < 0.95) {
        autosVendidos = 3;
      } else {
        autosVendidos = 4;
      }
  
      //CALCULO PARA SABER TIPO AUTO
      let tipoAuto = '';
      let rndTipoAuto = Math.random();
  
      if (autosVendidos === 0) {
        rndTipoAuto = 0;
        tipoAuto = '-';
      } else if (rndTipoAuto < 0.5) {
        tipoAuto = 'Compacto';
      } else if (rndTipoAuto < 0.75) {
        tipoAuto = 'Mediano';
      } else {
        tipoAuto = 'Lujo';
      }     
  
      //Random para el vendedor
      const rndVendedor = Math.random()-0.001;      

      //Asignamos como variable vendedor a la funcion asignarVendedor pasandole como propiedad el random
      const vendedor = asignarVendedor(rndVendedor);

      //Asignamos como variable comision a la funcion calcularComision como hicimos antes con el vendedor
      const comision = calcularComision(autosVendidos, tipoAuto);
  
      //Datos para mostrar en el array
      const nuevaSimulacion = {
        semana: i + 1,
        rndVendedor: rndVendedor.toFixed(2),
        vendedor,
        rndAutosVendidos: rndAutosVendidos.toFixed(2),
        autosVendidos,
        rndTipoAuto: rndTipoAuto.toFixed(2),
        tipoAuto,
        comision,
      };
  
      //Hacemos el push al array simulacionesNuevas declarado al principio 
      simulacionesNuevas.push(nuevaSimulacion);
    }
  
    setSimulaciones(simulacionesNuevas);
  };  

  return (
    <div>
      <h1>TP3 SIM GRUPO 12 4K4</h1>
      <div className='intro'>
        <label>Cantidad de Simulaciones:</label>
        <TextField id="filled-number" variant="filled" label="Numero de simulaciones" type="number" value={cantidadSimulaciones} onChange={(e) => setCantidadSimulaciones(Number(e.target.value))}/>
      </div>
      <div className='boton'>
        <Button variant="contained" onClick={realizarSimulacion}>Generar Simulación</Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Semana</th>
            <th>RND Vendedor</th>
            <th>Vendedor</th>
            <th>RND Autos vendidos</th>
            <th>Autos Vendidos</th>
            <th>RND Tipo auto</th>
            <th>Tipo Auto</th>
            <th>Comisión</th>
          </tr>
        </thead>
        <tbody>
          {simulaciones.map((simulacion, index) => (
            <tr key={index} style={{ textAlign: 'center' }}>
              <td>{simulacion.semana}</td>
              <td>{simulacion.rndVendedor}</td>
              <td>{simulacion.vendedor}</td>
              <td>{simulacion.rndAutosVendidos}</td>
              <td>{simulacion.autosVendidos}</td>
              <td>{simulacion.rndTipoAuto}</td>
              <td>{simulacion.tipoAuto}</td>
              <td>${simulacion.comision}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Principal;