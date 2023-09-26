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
  const [menuOpen, setMenuOpen] = useState(false);  
  
  const vendedores = ['Vendedor 1', 'Vendedor 2', 'Vendedor 3', 'Vendedor 4'];

  const [probabilidadAutoVendido1, setProbabilidadAutoVendido1] = useState(0.2);
  const [probabilidadAutoVendido2, setProbabilidadAutoVendido2] = useState(0.5);
  const [probabilidadAutoVendido3, setProbabilidadAutoVendido3] = useState(0.8);
  const [probabilidadAutoVendido4, setProbabilidadAutoVendido4] = useState(0.95);
  const [probabilidadAutoVendido5, setProbabilidadAutoVendido5] = useState(0.99);

  const [probabilidadCompacto, setProbabilidadCompacto] = useState(0.5);
  const [probabilidadMediano, setProbabilidadMediano] = useState(0.85);
  const [probabilidadLujo, setProbabilidadLujo] = useState(0.99);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

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
  const calcularComision = (autosVendidos, tipoAuto, rndComisionMediano, rndComisionLujo) => {
    let comision = 0;

    if (tipoAuto === 'Compacto') {
      comision = 250 * autosVendidos;
    } 
    else if (tipoAuto === 'Mediano') {
      if (rndComisionMediano <= 0.4) {
        comision = 400 * autosVendidos;
      } 
      else {
        comision = 500 * autosVendidos;
      }
    } 
    else if (tipoAuto === 'Lujo') {
      if (rndComisionLujo <= 0.35) {
        comision = 1000 * autosVendidos;
      } 
      else if (rndComisionLujo <= 0.75) {
        comision = 1500 * autosVendidos;
      } 
      else {
        comision = 2000 * autosVendidos;
      }
    }

    return comision;
  };

  const calcularComisionPromedio = (comision) => {
    const comisionPromedio = comision/7;
    return comisionPromedio;
  }

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

  //Ciclo for para generar las simulaciones
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
  
      if (rndAutosVendidos < probabilidadAutoVendido1) {
        autosVendidos = 0;
      } else if (rndAutosVendidos < probabilidadAutoVendido2) {
        autosVendidos = 1;
      } else if (rndAutosVendidos < probabilidadAutoVendido3) {
        autosVendidos = 2;
      } else if (rndAutosVendidos < probabilidadAutoVendido4) {
        autosVendidos = 3;
      } else if (rndAutosVendidos < probabilidadAutoVendido5) {
        autosVendidos = 4;
      }
  
      //CONDICIONALES PARA SABER TIPO AUTO Y RANDOM PARA COMISIONES
      let tipoAuto = '';
      let rndTipoAuto = Math.random();

      let rndComisionMediano = 0;
      let rndComisionLujo = 0;
  
      if (autosVendidos === 0) {
        rndTipoAuto = 0;
        tipoAuto = '-';
        rndComisionMediano = '-';
        rndComisionLujo = '-';
      } else if (rndTipoAuto < probabilidadCompacto) {
        tipoAuto = 'Compacto';
      } else if (rndTipoAuto < probabilidadMediano) {
        tipoAuto = 'Mediano';
      } else if (rndTipoAuto < probabilidadLujo) {
        tipoAuto = 'Lujo';
      }       
      
      if (tipoAuto === 'Compacto') {
        rndComisionMediano = '-';
        rndComisionLujo = '-';
      } else if (tipoAuto === 'Mediano') {
        rndComisionMediano = Math.random().toFixed(4);
        rndComisionLujo = '-';
      } else if (tipoAuto === 'Lujo') {
        rndComisionMediano = '-';
        rndComisionLujo = Math.random().toFixed(4);
      }      

      //Random para el vendedor
      const rndVendedor = Math.random();       

      //Asignamos como variable vendedor a la funcion asignarVendedor pasandole como propiedad el random
      const vendedor = asignarVendedor(rndVendedor);

      //Asignamos como variable comision a la funcion calcularComision como hicimos antes con el vendedor
      const comision = calcularComision(autosVendidos, tipoAuto, rndComisionMediano, rndComisionLujo);

      const comisionPromedio = calcularComisionPromedio(comision);
  
      //Datos para mostrar en el array
      const nuevaSimulacion = {
        semana: i + 1,
        rndVendedor: rndVendedor.toFixed(4),
        vendedor,
        rndAutosVendidos: rndAutosVendidos.toFixed(4),
        autosVendidos,
        rndTipoAuto: rndTipoAuto.toFixed(4),
        tipoAuto,
        rndComisionMediano: rndComisionMediano,
        rndComisionLujo: rndComisionLujo,
        comision,
        comisionPromedio
      };
  
      //Hacemos el push al array simulacionesNuevas declarado al principio 
      simulacionesNuevas.push(nuevaSimulacion);
    }
  
    setSimulaciones(simulacionesNuevas);
  };  

  //Funcion para mostrar filas específicas en la tabla mas la ultima
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
          <td>{simulacion ? simulacion.rndComisionMediano : '-'}</td>
          <td>{simulacion ? simulacion.rndComisionLujo : '-'}</td>
          <td>${simulacion ? simulacion.comision : '-'}</td>
          <td>${simulacion ? simulacion.comisionPromedio.toFixed(2) : '-'}</td>
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
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndComisionMediano : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndComisionLujo : '-'}</td>
        <td>${simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comision : '-'}</td>
        <td>${simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comisionPromedio.toFixed(2) : '-'}</td>
      </tr>
    );

    filasMostradas.push(ultimaFila);

    return filasMostradas;
  };

  //ARREGLAR ESTO ACA, NO SE COMO CONTROLAR LA ACUMULACIONDEPROBABILIDAD
  //const acumulacionDeProbabilidad = (probabilidadAutoVendido1-0)+(probabilidadAutoVendido2-probabilidadAutoVendido1)+(probabilidadAutoVendido3-probabilidadAutoVendido2)+(probabilidadAutoVendido4-probabilidadAutoVendido3)+(probabilidadAutoVendido5-probabilidadAutoVendido4);
  //console.log(acumulacionDeProbabilidad);

  //Funcion para los errores
  const comprobarErrores = () => {
    if (filaInicial > cantidadSimulaciones &&  filaInicial > filaFinal) {
      return "Error: Fila inicial es mayor que fila final y estamos fuera de rango";
    } else if (filaInicial > cantidadSimulaciones) {
      return "Error: Simulación fuera del rango";
    } else if (filaInicial > filaFinal) {
      return "Error: Fila inicial es mayor que fila final";
    } else if (filaFinal > cantidadSimulaciones) {
      return "Error: Fila final es mayor a la cantidad de simulaciones a generar, fuera de rango"
    } else if ( probabilidadAutoVendido1 >= 1 || probabilidadAutoVendido2 >= 1 || probabilidadAutoVendido3 >= 1 || probabilidadAutoVendido4 >= 1 || probabilidadAutoVendido5 >= 1) {
      return "Error: Ninguna probabilidad puede ser mayor o igual que 1";
    } else if (
      probabilidadAutoVendido1 === probabilidadAutoVendido2 ||
      probabilidadAutoVendido1 === probabilidadAutoVendido3 ||
      probabilidadAutoVendido1 === probabilidadAutoVendido4 ||
      probabilidadAutoVendido1 === probabilidadAutoVendido5 ||
      probabilidadAutoVendido2 === probabilidadAutoVendido3 ||
      probabilidadAutoVendido2 === probabilidadAutoVendido4 ||
      probabilidadAutoVendido2 === probabilidadAutoVendido5 ||
      probabilidadAutoVendido3 === probabilidadAutoVendido4 ||
      probabilidadAutoVendido3 === probabilidadAutoVendido5 ||
      probabilidadAutoVendido4 === probabilidadAutoVendido5
    ) {
      return "Error: No puede haber dos limites superiores iguales entre las probabilidades de autos vendidos";
    } //AGREGAR MAS VALIDACIONES
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

      <div className='probabilidades' style={{display:'flex', justifyContent:'center'}}>
        <div className='menu-button'>
          <Button variant="contained" style={{marginTop:'10px', marginBottom:'10px'}} onClick={openMenu}> ☰ Probabilidades </Button>
          {menuOpen && (
            <div className="menu-input">
              <div className='probautovendido' style={{display:'flex', flexDirection:'row', marginBottom:'10px', gap: '10px'}}>
                <TextField id="filled-number" variant="filled" label="Limite superior autos vendidos 0" type="number" value={probabilidadAutoVendido1} onChange={(e) => setProbabilidadAutoVendido1(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Limite superior autos vendidos 1" type="number" value={probabilidadAutoVendido2} onChange={(e) => setProbabilidadAutoVendido2(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Limite superior autos vendidos 2" type="number" value={probabilidadAutoVendido3} onChange={(e) => setProbabilidadAutoVendido3(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Limite superior autos vendidos 3" type="number" value={probabilidadAutoVendido4} onChange={(e) => setProbabilidadAutoVendido4(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Limite superior autos vendidos 4" type="number" value={probabilidadAutoVendido5} onChange={(e) => setProbabilidadAutoVendido5(Number(e.target.value))}/>
              </div>

              <div className='tipoautovendido' style={{display:'flex', flexDirection:'row', marginBottom:'10px', gap: '10px'}}>
                <TextField id="filled-number" variant="filled" label="Limite superior tipo auto Compacto" type="number" value={probabilidadCompacto} onChange={(e) => setProbabilidadCompacto(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Limite superior tipo auto Mediano" type="number" value={probabilidadMediano} onChange={(e) => setProbabilidadMediano(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Limite superior tipo auto Lujo" type="number" value={probabilidadLujo} onChange={(e) => setProbabilidadLujo(Number(e.target.value))}/>
              </div>

              <div className='botoncerrar'>
                <Button variant="contained" style={{marginBottom:'10px', marginTop:'10px'}} onClick={closeMenu}> Cerrar </Button>
              </div>
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
            <th>Rnd Mediano</th>
            <th>Rnd Lujo</th>
            <th>Comisión</th>
            <th>Comisión promedio semanal</th>
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