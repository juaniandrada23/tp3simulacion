import React, { useState } from 'react';
import './Styles/style.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Principal = () => {
  //Decelaracion de variables principales
  const [simulaciones, setSimulaciones] = useState([]);
  const [cantidadSimulaciones, setCantidadSimulaciones] = useState(10);
  const [comisionesTotales, setComisionesTotales] = useState({});
  const [filaInicial, setFilaInicial] = useState(1);
  const [filaFinal, setFilaFinal] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState('');
  const vendedores = ['Vendedor 1', 'Vendedor 2', 'Vendedor 3', 'Vendedor 4'];

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  //Funcion para calcular las comisiones totales de cada vendedor
  const calcularComisionesTotales = () => {
    const comisionesPorVendedor = {};

    for (const vendedor of vendedores) {
      const comisionTotal = simulaciones.reduce((total, simulacion) => {
        if (simulacion.vendedor === vendedor) {
          return total + simulacion.comision;
        }
        return total;
      }, 0);

      comisionesPorVendedor[vendedor] = comisionTotal;
    }

    setComisionesTotales(comisionesPorVendedor);
  };

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

  //Funcion para refrescar la pag
  const realizarRefresh = () => {
    window.location.reload();    
  }

  const realizarSimulacion = () => {
    if (error) {
      setError('');
    }
  
    const errorSimulacion = comprobarErrores();
    if (errorSimulacion) {
      setError(errorSimulacion);
      return;
    }

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

  //Función para mostrar filas específicas en la tabla mas la ultima
  const mostrarFilas = () => {
    const filasMostradas = simulaciones.slice(filaInicial - 1, filaFinal).map((simulacion, index) => (
        <tr key={index} style={{ textAlign: 'center' }}>
          <td>{simulacion ? simulacion.semana : '-'}</td>
          <td>{simulacion ? simulacion.rndVendedor : '-'}</td>
          <td>{simulacion ? simulacion.vendedor : '-'}</td>
          <td>{simulacion ? simulacion.rndAutosVendidos : '-'}</td>
          <td>{simulacion ? simulacion.autosVendidos : '-'}</td>
          <td>{simulacion ? simulacion.rndTipoAuto : '-'}</td>
          <td>{simulacion ? simulacion.tipoAuto : '-'}</td>
          <td>${simulacion ? simulacion.comision : '-'}</td>
        </tr>
      ));

    const ultimaFila = (
      <tr key="ultima" style={{ textAlign: 'center' }}>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].semana : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndVendedor : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].vendedor : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndAutosVendidos : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].autosVendidos : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndTipoAuto : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].tipoAuto : '-'}</td>
        <td>${simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comision : '-'}</td>
      </tr>
    );

    filasMostradas.push(ultimaFila);

    return filasMostradas;
  };

  const comprobarErrores = () => {
    if (filaInicial > cantidadSimulaciones &&  filaInicial > filaFinal) {
      return "Error: Fila inicial es mayor que fila final y estamos fuera de rango";
    } else if (filaInicial > cantidadSimulaciones) {
      return "Error: Simulación fuera del rango";
    } else if (filaInicial > filaFinal) {
      return "Error: Fila inicial es mayor que fila final";
    }
    if (error) {
      setError('');
    }
    return null; 
  };

  return (
    <div>
    
      <div className='divTotal'>

        <div className='intro'>
          <h1>TP3 SIM GRUPO 12 4K4</h1>
          <label style={{marginBottom:'10px'}}>Cantidad de semanas a simular:</label>
          <TextField id="filled-number" variant="filled" label="Numero de simulaciones" type="number" value={cantidadSimulaciones} onChange={(e) => setCantidadSimulaciones(Number(e.target.value))}/>
        </div>

        <div className='desdehasta'>
          <label>Mostrar desde la semana:</label>
          <TextField id="filled-number" variant="filled" label="Fila Inicial" type="number" value={filaInicial} onChange={(e) => setFilaInicial(Number(e.target.value))}/>
          <label>hasta la semana:</label>
          <TextField id="filled-number" variant="filled" label="Fila Final" type="number" value={filaFinal} onChange={(e) => setFilaFinal(Number(e.target.value))}/>
        </div>

        <div className='botones'>
          <Button variant="contained" onClick={realizarSimulacion}>Generar Simulación</Button>
          <Button variant="contained" onClick={openModal}>Mostrar Comisiones</Button>
        </div>

        <div className='reiniciar' style={{display:'flex', flexDirection:'row',alignItems:'center', justifyContent:'center'}}>
          <Button variant="contained" onClick={() => realizarRefresh()}>Reiniciar</Button>
        </div>

        <div className='error' style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
          {error && (
            <div style={{ color: 'red', textAlign: 'center', marginBottom:'10px'}}>
              {error}
            </div>
          )}
        </div>

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
          {mostrarFilas()}
        </tbody>
      </table>
      
      <Modal open={modalOpen} onClose={closeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Comisiones Totales por Vendedor
          </Typography>
          <ul>
            {Object.entries(comisionesTotales).map(([vendedor, comisionTotal]) => (
              <li key={vendedor}>{vendedor}: ${comisionTotal}</li>
            ))}
          </ul>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
          <Button variant="contained" onClick={calcularComisionesTotales}>Calcular Comisiones Totales</Button>
          <Button onClick={closeModal}>Cerrar</Button>
          </div>
        </Box>
      </Modal>

    </div>
  );
};

export default Principal;