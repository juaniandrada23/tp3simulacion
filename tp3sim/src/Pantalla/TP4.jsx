import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import './Styles/styletp5.css'

const TP5 = () => {
  //Decelaracion de variables principales
  const [simulaciones, setSimulaciones] = useState([]);
  const [cantidadSimulaciones, setCantidadSimulaciones] = useState(10);

  const [filaInicial, setFilaInicial] = useState(1);
  const [filaFinal, setFilaFinal] = useState(10);

  const [ARegistro, setARegistro] = useState(5);
  const [BRegistro, setBRegistro] = useState(8);

  const [ATecnico, setATecnico] = useState(3);
  const [BTecnico, setBTecnico] = useState(10);

  const [AMantenimiento, setAMantenimiento] = useState(60);
  const [BMantenimiento, setBMantenimiento] = useState(63);

  const [media, setMedia] = useState(2);

  const realizarSimulacion = () => {
    const simulacionesNuevas = [];
    let reloj = 0;
    let rndLlegadaTecnico = Math.random();
    let tiempoEntreLlegadaTecnico = AMantenimiento + rndLlegadaTecnico * (BMantenimiento - AMantenimiento);
    let proximaLlegadaTecnico = tiempoEntreLlegadaTecnico;
    
    let rndLlegadaEmpleado = Math.random();
    let tiempoEntreLlegadaEmpleado = -media * Math.log(1 - rndLlegadaEmpleado);
    let proximaLlegadaEmpleado = tiempoEntreLlegadaEmpleado;

    let rndRegistroEmpleado = Math.random();
    let tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
    let finRegistroEmpleado = tiempoEntreRegistro;
  
    let rndMantenimiento = Math.random();
    let tiempoEntreMantenimiento = AMantenimiento + rndMantenimiento * (BMantenimiento - AMantenimiento);
    let finMantenimiento = tiempoEntreMantenimiento;

    let proximaVueltaEmpleado = "";

    // Estado de las terminales
    let terminal1 = 'Libre';
    let terminal2 = 'Libre';
    let terminal3 = 'Libre';
    let terminal4 = 'Libre';

    let finregistroterminal1 = "";
    let finregistroterminal2 = "";
    let finregistroterminal3 = "";
    let finregistroterminal4 = "";
    
    let finmantenimientoterminal1 = "";
    let finmantenimientoterminal2 = "";
    let finmantenimientoterminal3 = "";
    let finmantenimientoterminal4 = "";

    let colaempleados = [];
    let colatecnicos = [];
    
    for (let i = 0; i < cantidadSimulaciones; i++) {
        let evento;
        let tiempo;

        if (i === 0) {
        evento = 'Inicializacion';
        tiempo = 0;
        } else {
        // Crear un objeto con todos los tiempos
        const tiempos = {
            'Llegada Tecnico': proximaLlegadaTecnico,
            'Llegada Empleado': proximaLlegadaEmpleado,
            'Fin Registro Terminal 1': finregistroterminal1,
            'Fin Registro Terminal 2': finregistroterminal2,
            'Fin Registro Terminal 3': finregistroterminal3,
            'Fin Registro Terminal 4': finregistroterminal4,
            'Fin Mantenimiento Terminal 1': finmantenimientoterminal1,
            'Fin Mantenimiento Terminal 2': finmantenimientoterminal2,
            'Fin Mantenimiento Terminal 3': finmantenimientoterminal3,
            'Fin Mantenimiento Terminal 4': finmantenimientoterminal4,
            'Vuelta de empleado': proximaVueltaEmpleado,
        };

        // Filtrar los valores vacíos
        const tiemposNoVacios = Object.entries(tiempos).filter(([key, valor]) => valor !== "");

        // Encontrar el tiempo mínimo y su correspondiente evento
        const minTiempoEvento = tiemposNoVacios.reduce((min, [key, valor]) => valor < min[1] ? [key, valor] : min, [null, Infinity]);

        evento = minTiempoEvento[0];
        tiempo = minTiempoEvento[1];
        }
  
      // Actualizar tiempos según el evento
      if (evento === 'Llegada Tecnico') {
        rndLlegadaTecnico = Math.random();
        tiempoEntreLlegadaTecnico = ATecnico + rndLlegadaTecnico * (BTecnico - ATecnico);
        proximaLlegadaTecnico = tiempo + tiempoEntreLlegadaTecnico;
      
        rndMantenimiento = Math.random();
        tiempoEntreMantenimiento = AMantenimiento + rndMantenimiento * (BMantenimiento - AMantenimiento);
        finMantenimiento = tiempo + tiempoEntreMantenimiento;
      
        // Asignar el técnico a una terminal libre
        let terminalAsignada = null;
        if (terminal1 === 'Libre') {
            terminalAsignada = 'terminal1';
            terminal1 = 'En Mantenimiento';
            finmantenimientoterminal1 = finMantenimiento;
        } else if (terminal2 === 'Libre') {
            terminalAsignada = 'terminal2';
            terminal2 = 'En Mantenimiento';
            finmantenimientoterminal2 = finMantenimiento;
        } else if (terminal3 === 'Libre') {
            terminalAsignada = 'terminal3';
            terminal3 = 'En Mantenimiento';
            finmantenimientoterminal3 = finMantenimiento;
        } else if (terminal4 === 'Libre') {
            terminalAsignada = 'terminal4';
            terminal4 = 'En Mantenimiento';
            finmantenimientoterminal4 = finMantenimiento;
        } else {
            colatecnicos.push(i + 1);
        }
      } else if (evento === 'Llegada Empleado') {
        rndLlegadaEmpleado = Math.random();
        tiempoEntreLlegadaEmpleado = -media * Math.log(1 - rndLlegadaEmpleado);
        proximaLlegadaEmpleado = tiempo + tiempoEntreLlegadaEmpleado;
      
        // Asignar empleado a terminal libre o a la cola
        let terminalAsignada = null;
        if (terminal1 === 'Libre') {
            terminalAsignada = 'terminal1';
            terminal1 = 'Ocupada';
        } else if (terminal2 === 'Libre') {
            terminalAsignada = 'terminal2';
            terminal2 = 'Ocupada';
        } else if (terminal3 === 'Libre') {
            terminalAsignada = 'terminal3';
            terminal3 = 'Ocupada';
        } else if (terminal4 === 'Libre') {
            terminalAsignada = 'terminal4';
            terminal4 = 'Ocupada';
        } else {
            colaempleados.push(i + 1);
            if (colaempleados.length > 5 && !proximaVueltaEmpleado) {
                proximaVueltaEmpleado = tiempo + 30;
            }
        }
      
        // Si se asignó una terminal, calcular rndRegistroEmpleado, tiempoEntreRegistro y finRegistroEmpleado
        if (terminalAsignada) {
            rndRegistroEmpleado = Math.random();
            tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
            finRegistroEmpleado = tiempo + tiempoEntreRegistro;
      
            // Asignar finRegistroEmpleado a la terminal asignada
            if (terminalAsignada === 'terminal1') {
                finregistroterminal1 = finRegistroEmpleado;
            } else if (terminalAsignada === 'terminal2') {
                finregistroterminal2 = finRegistroEmpleado;
            } else if (terminalAsignada === 'terminal3') {
                finregistroterminal3 = finRegistroEmpleado;
            } else if (terminalAsignada === 'terminal4') {
                finregistroterminal4 = finRegistroEmpleado;
            }
        }
      } else if (evento === 'Inicializacion') {
        let terminalAsignada = null;
        terminal1 = 'Libre';
        terminal2 = 'Libre';
        terminal3 = 'Libre';
        terminal4 = 'Libre';
        rndRegistroEmpleado = 0;
        tiempoEntreRegistro = 0;
        finRegistroEmpleado = 0;
      } else if (evento === 'Fin Registro Terminal 1') {
        terminal1 = 'Libre';
        finregistroterminal1 = "";
      
        if (colatecnicos.length > 0) {
            colatecnicos.shift();
      
            rndMantenimiento = Math.random();
            tiempoEntreMantenimiento = ARegistro + rndMantenimiento * (BRegistro - ARegistro);
            finMantenimiento = tiempo + tiempoEntreMantenimiento;
        
            terminal1 = 'En Mantenimiento';
            finmantenimientoterminal1 = finMantenimiento;
        } else if (colaempleados.length > 0 ) {
            colaempleados.shift();
      
            rndRegistroEmpleado = Math.random();
            tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
            finRegistroEmpleado = tiempo + tiempoEntreRegistro;
        
            terminal1 = 'Ocupada';
            finregistroterminal1 = finRegistroEmpleado;
        }
      } else if (evento === 'Fin Registro Terminal 2') {
        terminal2 = 'Libre';
        finregistroterminal2 = "";
      
        if (colatecnicos.length > 0) {
            colatecnicos.shift();
      
            rndMantenimiento = Math.random();
            tiempoEntreMantenimiento = ARegistro + rndMantenimiento * (BRegistro - ARegistro);
            finMantenimiento = tiempo + tiempoEntreMantenimiento;
        
            terminal2 = 'En Mantenimiento';
            finmantenimientoterminal2 = finMantenimiento;
        } else if (colaempleados.length > 0 ) {
            colaempleados.shift();
      
            rndRegistroEmpleado = Math.random();
            tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
            finRegistroEmpleado = tiempo + tiempoEntreRegistro;
        
            terminal2 = 'Ocupada';
            finregistroterminal2 = finRegistroEmpleado;
        }
      } else if (evento === 'Fin Registro Terminal 3') {
        terminal3 = 'Libre';
        finregistroterminal3 = "";
      
        if (colatecnicos.length > 0) {
            colatecnicos.shift();
      
            rndMantenimiento = Math.random();
            tiempoEntreMantenimiento = ARegistro + rndMantenimiento * (BRegistro - ARegistro);
            finMantenimiento = tiempo + tiempoEntreMantenimiento;
        
            terminal3 = 'En Mantenimiento';
            finmantenimientoterminal3 = finMantenimiento;
        } else if (colaempleados.length > 0 ) {
            colaempleados.shift();
      
            rndRegistroEmpleado = Math.random();
            tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
            finRegistroEmpleado = tiempo + tiempoEntreRegistro;
        
            terminal3 = 'Ocupada';
            finregistroterminal3 = finRegistroEmpleado;
        }
      } else if (evento === 'Fin Registro Terminal 4') {
        terminal4 = 'Libre';
        finregistroterminal4 = "";
      
        if (colatecnicos.length > 0) {
            colatecnicos.shift();
      
            rndMantenimiento = Math.random();
            tiempoEntreMantenimiento = ARegistro + rndMantenimiento * (BRegistro - ARegistro);
            finMantenimiento = tiempo + tiempoEntreMantenimiento;
        
            terminal4 = 'En Mantenimiento';
            finmantenimientoterminal4 = finMantenimiento;
        } else if (colaempleados.length > 0 ) {
            colaempleados.shift();
      
            rndRegistroEmpleado = Math.random();
            tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
            finRegistroEmpleado = tiempo + tiempoEntreRegistro;
        
            terminal4 = 'Ocupada';
            finregistroterminal4 = finRegistroEmpleado;
        }
      } else if (evento === 'Fin Mantenimiento Terminal 1') {
        terminal1 = 'Libre';
        finmantenimientoterminal1 = "";
      
        if (colatecnicos.length > 0) {
            colatecnicos.shift();
      
            rndMantenimiento = Math.random();
            tiempoEntreMantenimiento = AMantenimiento + rndMantenimiento * (BMantenimiento - AMantenimiento);
            finMantenimiento = tiempo + tiempoEntreMantenimiento;
        
            terminal1 = 'En Mantenimiento';
            finmantenimientoterminal1 = finMantenimiento;
        } else if (colaempleados.length > 0) {
            colaempleados.shift();
      
            rndRegistroEmpleado = Math.random();
            tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
            finRegistroEmpleado = tiempo + tiempoEntreRegistro;
        
            terminal1 = 'Ocupada';
            finregistroterminal1 = finRegistroEmpleado;
        }
      } else if (evento === 'Fin Mantenimiento Terminal 2') {
        terminal2 = 'Libre';
        finmantenimientoterminal2 = "";
      
        if (colatecnicos.length > 0) {
            colatecnicos.shift();
      
            rndMantenimiento = Math.random();
            tiempoEntreMantenimiento = AMantenimiento + rndMantenimiento * (BMantenimiento - AMantenimiento);
            finMantenimiento = tiempo + tiempoEntreMantenimiento;
        
            terminal2 = 'En Mantenimiento';
            finmantenimientoterminal2 = finMantenimiento;
        } else if (colaempleados.length > 0) {
            colaempleados.shift();
      
            rndRegistroEmpleado = Math.random();
            tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
            finRegistroEmpleado = tiempo + tiempoEntreRegistro;
        
            terminal2 = 'Ocupada';
            finregistroterminal2 = finRegistroEmpleado;
        }
      } else if (evento === 'Fin Mantenimiento Terminal 3') {
        terminal3 = 'Libre';
        finmantenimientoterminal3 = "";
      
        if (colatecnicos.length > 0) {
            colatecnicos.shift();
      
            rndMantenimiento = Math.random();
            tiempoEntreMantenimiento = AMantenimiento + rndMantenimiento * (BMantenimiento - AMantenimiento);
            finMantenimiento = tiempo + tiempoEntreMantenimiento;
        
            terminal3 = 'En Mantenimiento';
            finmantenimientoterminal3 = finMantenimiento;
        } else if (colaempleados.length > 0) {
            colaempleados.shift();
      
            rndRegistroEmpleado = Math.random();
            tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
            finRegistroEmpleado = tiempo + tiempoEntreRegistro;
        
            terminal3 = 'Ocupada';
            finregistroterminal3 = finRegistroEmpleado;
        }
      } else if (evento === 'Fin Mantenimiento Terminal 4') {
        terminal4 = 'Libre';
        finmantenimientoterminal4 = "";
      
        if (colatecnicos.length > 0) {
            colatecnicos.shift();
      
            rndMantenimiento = Math.random();
            tiempoEntreMantenimiento = AMantenimiento + rndMantenimiento * (BMantenimiento - AMantenimiento);
            finMantenimiento = tiempo + tiempoEntreMantenimiento;
        
            terminal4 = 'En Mantenimiento';
            finmantenimientoterminal4 = finMantenimiento;
        } else if (colaempleados.length > 0) {
            colaempleados.shift();
      
            rndRegistroEmpleado = Math.random();
            tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
            finRegistroEmpleado = tiempo + tiempoEntreRegistro;
        
            terminal4 = 'Ocupada';
            finregistroterminal4 = finRegistroEmpleado;
        }
      } else if (evento === 'Vuelta de empleado') {

        // Asignar empleado a terminal libre o a la cola
        let terminalAsignada = null;
        if (terminal1 === 'Libre') {
            terminalAsignada = 'terminal1';
            terminal1 = 'Ocupada';
            proximaVueltaEmpleado = "";
        } else if (terminal2 === 'Libre') {
            terminalAsignada = 'terminal2';
            terminal2 = 'Ocupada';
            proximaVueltaEmpleado = "";
        } else if (terminal3 === 'Libre') {
            terminalAsignada = 'terminal3';
            terminal3 = 'Ocupada';
            proximaVueltaEmpleado = "";
        } else if (terminal4 === 'Libre') {
            terminalAsignada = 'terminal4';
            terminal4 = 'Ocupada';
            proximaVueltaEmpleado = "";
        } else {
            proximaVueltaEmpleado = "";
            colaempleados.push(i + 1);
            if (colaempleados.length > 5) {
                proximaVueltaEmpleado = tiempo + 30;
            }
        }
      
        // Si se asignó una terminal, calcular rndRegistroEmpleado, tiempoEntreRegistro y finRegistroEmpleado
        if (terminalAsignada) {
            rndRegistroEmpleado = Math.random();
            tiempoEntreRegistro = ARegistro + rndRegistroEmpleado * (BRegistro - ARegistro);
            finRegistroEmpleado = tiempo + tiempoEntreRegistro;
      
            // Asignar finRegistroEmpleado a la terminal asignada
            if (terminalAsignada === 'terminal1') {
                finregistroterminal1 = finRegistroEmpleado;
            } else if (terminalAsignada === 'terminal2') {
                finregistroterminal2 = finRegistroEmpleado;
            } else if (terminalAsignada === 'terminal3') {
                finregistroterminal3 = finRegistroEmpleado;
            } else if (terminalAsignada === 'terminal4') {
                finregistroterminal4 = finRegistroEmpleado;
            }
        }
      }
  
      // Datos para mostrar en el array
      const nuevaSimulacion = {
        fila: i + 1,
        evento: evento,
        reloj: tiempo.toFixed(2),
        rndLlegadaEmpleado: rndLlegadaEmpleado.toFixed(2),
        tiempoEntreLlegadaEmpleado: tiempoEntreLlegadaEmpleado.toFixed(2),
        proximaLlegadaEmpleado: proximaLlegadaEmpleado.toFixed(2),

        rndLlegadaTecnico: rndLlegadaTecnico.toFixed(2),
        tiempoEntreLlegadaTecnico: tiempoEntreLlegadaTecnico.toFixed(2),
        proximaLlegadaTecnico: proximaLlegadaTecnico.toFixed(2),

        rndRegistroEmpleado: rndRegistroEmpleado.toFixed(2),
        tiempoEntreRegistro: tiempoEntreRegistro.toFixed(2),
        finRegistroEmpleado: finRegistroEmpleado.toFixed(2),

        rndMantenimiento: rndMantenimiento.toFixed(2),
        tiempoEntreMantenimiento: tiempoEntreMantenimiento.toFixed(2),
        finMantenimiento: finMantenimiento.toFixed(2),

        terminal1: terminal1,
        finregistroterminal1: Math.round(finregistroterminal1* 100) / 100,
        finmantenimientoterminal1: Math.round(finmantenimientoterminal1* 100) / 100,
        
        terminal2: terminal2,
        finregistroterminal2: Math.round(finregistroterminal2* 100) / 100,
        finmantenimientoterminal2: Math.round(finmantenimientoterminal2* 100) / 100,

        terminal3: terminal3,
        finregistroterminal3: Math.round(finregistroterminal3* 100) / 100,
        finmantenimientoterminal3: Math.round(finmantenimientoterminal3* 100) / 100,

        terminal4: terminal4,
        finregistroterminal4: Math.round(finregistroterminal4* 100) / 100,
        finmantenimientoterminal4: Math.round(finmantenimientoterminal4* 100) / 100,


        colaempleados: colaempleados.join(', '),

        colatecnicos: colatecnicos.join(', '),

        proximaVueltaEmpleado: Math.round(proximaVueltaEmpleado* 100) / 100,
      };
  
      // Hacemos el push al array simulacionesNuevas declarado al principio
      simulacionesNuevas.push(nuevaSimulacion);
  
      // Actualizar reloj para la siguiente iteración
      reloj = tiempo;
    }
  
    setSimulaciones(simulacionesNuevas);
  };
  
  //Funcion para mostrar filas específicas en la tabla mas la ultima
  const mostrarFilas = () => {
    const filasMostradas = simulaciones.slice(filaInicial - 1, filaFinal).map((simulacion, index) => (
        <tr key={index} style={{ textAlign: 'center' }}>
          <td>{simulacion ? simulacion.fila : '-'}</td>
          <td>{simulacion ? simulacion.evento : '-'}</td>
          <td>{simulacion ? simulacion.reloj : '-'}</td>
          <td>{simulacion ? simulacion.rndLlegadaEmpleado : '-'}</td>
          <td>{simulacion ? simulacion.tiempoEntreLlegadaEmpleado : '-'}</td>
          <td>{simulacion ? simulacion.proximaLlegadaEmpleado : '-'}</td>
          <td>{simulacion ? simulacion.rndLlegadaTecnico : '-'}</td>
          <td>{simulacion ? simulacion.tiempoEntreLlegadaTecnico : '-'}</td>
          <td>{simulacion ? simulacion.proximaLlegadaTecnico : '-'}</td>
          <td>{simulacion ? simulacion.rndRegistroEmpleado : '-'}</td>
          <td>{simulacion ? simulacion.tiempoEntreRegistro : '-'}</td>
          <td>{simulacion ? simulacion.finRegistroEmpleado : '-'}</td>

          <td>{simulacion ? simulacion.rndMantenimiento : '-'}</td>
          <td>{simulacion ? simulacion.tiempoEntreMantenimiento : '-'}</td>
          <td>{simulacion ? simulacion.finMantenimiento : '-'}</td>

          <td>{simulacion ? simulacion.terminal1 : '-'}</td>
          <td>{simulacion ? simulacion.finregistroterminal1 : '-'}</td>
          <td>{simulacion ? simulacion.finmantenimientoterminal1 : '-'}</td>

          <td>{simulacion ? simulacion.terminal2 : '-'}</td>
          <td>{simulacion ? simulacion.finregistroterminal2 : '-'}</td>
          <td>{simulacion ? simulacion.finmantenimientoterminal2 : '-'}</td>

          <td>{simulacion ? simulacion.terminal3 : '-'}</td>
          <td>{simulacion ? simulacion.finregistroterminal3 : '-'}</td>
          <td>{simulacion ? simulacion.finmantenimientoterminal3 : '-'}</td>

          <td>{simulacion ? simulacion.terminal4 : '-'}</td>
          <td>{simulacion ? simulacion.finregistroterminal4 : '-'}</td>
          <td>{simulacion ? simulacion.finmantenimientoterminal4 : '-'}</td>

          <td>{simulacion ? simulacion.colaempleados : '-'}</td>
          <td>{simulacion ? simulacion.colatecnicos : '-'}</td>

          <td>{simulacion ? simulacion.proximaVueltaEmpleado : '-'}</td>

        </tr>
      ));

    const ultimaFila = (
      <tr key="ultima" style={{ textAlign: 'center' }}>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].fila : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].evento : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].reloj : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndLlegadaEmpleado : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].tiempoEntreLlegadaEmpleado : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].proximaLlegadaEmpleado : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndLlegadaTecnico : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].tiempoEntreLlegadaTecnico : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].proximaLlegadaTecnico : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndRegistroEmpleado : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].tiempoEntreRegistro : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].finRegistroEmpleado : '-'}</td>

        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndMantenimiento : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].tiempoEntreMantenimiento : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].finMantenimiento : '-'}</td>

        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].terminal1 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].finregistroterminal1 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].finmantenimientoterminal1 : '-'}</td>

        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].terminal2 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].finregistroterminal2 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].finmantenimientoterminal2 : '-'}</td>

        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].terminal3 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].finregistroterminal3 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].finmantenimientoterminal3 : '-'}</td>

        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].terminal4 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].finregistroterminal4 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].finmantenimientoterminal4 : '-'}</td>

        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].colaempleados : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].colatecnicos : '-'}</td>

        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].proximaVueltaEmpleado : '-'}</td>

      </tr>
    );

    filasMostradas.push(ultimaFila);

    return filasMostradas;
  };

  return (
    <div style={{padding:'5px'}}>

        <div className='parametros' style={{display:'flex', justifyContent:'space-between', flexDirection:'row', gap:'15px'}}>
            <div className='cantidadsimulaciones' style={{display:'flex', flexDirection:'column'}}>
                <TextField id="filled-number" variant="filled" label="Numero de simulaciones" type="number" value={cantidadSimulaciones} onChange={(e) => setCantidadSimulaciones(Number(e.target.value))}/>
            </div>
            <div className='desdehasta' style={{display:'flex', flexDirection:'column', gap:'10px'}}>
                <TextField id="filled-number" variant="filled" label="Fila Inicial" type="number" value={filaInicial} onChange={(e) => setFilaInicial(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Fila Final" type="number" value={filaFinal} onChange={(e) => setFilaFinal(Number(e.target.value))}/>
                <div className='botones'>
                    <Button variant="contained" onClick={realizarSimulacion}>Generar Simulación</Button>
                </div>
            </div>
            <div className='registroempleado' style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                <label>Registro empleado</label>
                <TextField id="filled-number" variant="filled" label="A Registro" type="number" value={ARegistro} onChange={(e) => setARegistro(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="B Registro" type="number" value={BRegistro} onChange={(e) => setBRegistro(Number(e.target.value))}/>
            </div>
            <div className='mantenimiento' style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                <label>Mantenimiento</label>
                <TextField id="filled-number" variant="filled" label="A Mantenimiento" type="number" value={AMantenimiento} onChange={(e) => setAMantenimiento(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="B Mantenimiento" type="number" value={BMantenimiento} onChange={(e) => setBMantenimiento(Number(e.target.value))}/>
            </div>
            <div className='regresotecnico' style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                <label>Demora tecnico</label>
                <TextField id="filled-number" variant="filled" label="A Tecnico" type="number" value={ATecnico} onChange={(e) => setATecnico(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="B Tecnico" type="number" value={BTecnico} onChange={(e) => setBTecnico(Number(e.target.value))}/>
            </div>
            <div className='llegadaempleados' style={{display:'flex', flexDirection:'column', gap:'5px'}}>
                <label>Llegada empleado</label>
                <TextField id="filled-number" variant="filled" label="Media llegada" type="number" value={media} onChange={(e) => setMedia(Number(e.target.value))}/>
            </div>
        </div>


        <div className='tabla' style={{marginTop:'15px'}}>
        <table>
            <thead>
                <tr>
                    <th>Fila</th>
                    <th>Evento</th>
                    <th>Reloj</th>
                    <th>RNDLlegadaEmpleado</th>
                    <th>TiempoEntreLlegadas</th>
                    <th style={{backgroundColor:'green'}}>ProximaLlegadaEmpleado</th>
                    <th>RNDLlegadaTecnico</th>
                    <th>TiempoEntreLlegadaTecnico</th>
                    <th style={{backgroundColor:'green'}}>ProximaLlegadaTecnico</th>
                    <th>RNDRegistro</th>
                    <th>TiempoEntreRegistro</th>
                    <th>FinRegistro</th>

                    <th>rndMantenimiento</th>
                    <th>tiempoEntreMantenimiento</th>
                    <th style={{backgroundColor:'green'}}>FinMantenimiento</th>

                    <th>Terminal 1</th>
                    <th style={{backgroundColor:'green'}}>Fin Reg Terminal 1</th>
                    <th style={{backgroundColor:'green'}}>Fin Mant Terminal 1</th>
                    <th>Terminal 2</th>
                    <th style={{backgroundColor:'green'}}>Fin Reg Terminal 2</th>
                    <th style={{backgroundColor:'green'}}>Fin Mant Terminal 2</th>
                    <th>Terminal 3</th>
                    <th style={{backgroundColor:'green'}}>Fin Reg Terminal 3</th>
                    <th style={{backgroundColor:'green'}}>Fin Mant Terminal 3</th>
                    <th>Terminal 4</th>
                    <th style={{backgroundColor:'green'}}>Fin Reg Terminal 4</th>
                    <th style={{backgroundColor:'green'}}>Fin Mant Terminal 4</th>
                    <th>Cola empleados</th>
                    <th>Cola tecnicos</th>

                    <th style={{backgroundColor:'green'}}>Proxima vuelta empleado</th>
                </tr>
            </thead>
            <tbody>
                {mostrarFilas()}
            </tbody>
        </table>
        </div>

    </div>
  )
}

export default TP5