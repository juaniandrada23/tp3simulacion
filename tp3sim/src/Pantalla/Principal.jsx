import React, { useState } from 'react';
import './Styles/style.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Principal = () => {
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

  //Funcion para refrescar la pag
  const realizarRefresh = () => {
    window.location.reload();    
  }

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

  const [probabilidadAutoVendido1, setProbabilidadAutoVendido1] = useState(20);
  const [probabilidadAutoVendido2, setProbabilidadAutoVendido2] = useState(30);
  const [probabilidadAutoVendido3, setProbabilidadAutoVendido3] = useState(30);
  const [probabilidadAutoVendido4, setProbabilidadAutoVendido4] = useState(15);
  const [probabilidadAutoVendido5, setProbabilidadAutoVendido5] = useState(5);

  const [probabilidadCompacto, setProbabilidadCompacto] = useState(50);
  const [probabilidadMediano, setProbabilidadMediano] = useState(35);
  const [probabilidadLujo, setProbabilidadLujo] = useState(15);

  const [probabilidadComisionMediano1, setprobabilidadComisionMediano1] = useState(40);
  const [probabilidadComisionMediano2, setprobabilidadComisionMediano2] = useState(60);

  const [probabilidadComisionLujo1, setprobabilidadComisionLujo1] = useState(35);
  const [probabilidadComisionLujo2, setprobabilidadComisionLujo2] = useState(40);
  const [probabilidadComisionLujo3, setprobabilidadComisionLujo3] = useState(25);


  //Funcion para calcular las comisiones totales de cada vendedor
  const calcularComisionesTotales = () => {
    const comisionesPorVendedor = {};
  
    for (const vendedor of vendedores) {
      const comisionTotal = simulaciones.reduce((total, simulacion) => {
        if (simulacion.vendedor === vendedor && !isNaN(simulacion.comision)) {
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
      if (rndComisionMediano <= probabilidadComisionMediano1*0.01) {
        comision = 400 * autosVendidos;
      } 
      else if (rndComisionMediano <= probabilidadComisionMediano2*0.01 + probabilidadComisionMediano1*0.01) {
        comision = 500 * autosVendidos;
      }
    } 
    else if (tipoAuto === 'Lujo') {
      if (rndComisionLujo <= probabilidadComisionLujo1*0.01) {
        comision = 1000 * autosVendidos;
      } 
      else if (rndComisionLujo <= probabilidadComisionLujo2*0.01 + probabilidadComisionLujo1*0.01) {
        comision = 1500 * autosVendidos;
      } 
      else if (rndComisionLujo <= probabilidadComisionLujo3*0.01 + probabilidadComisionLujo2*0.01 + probabilidadComisionLujo1*0.01) {
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

  //--------------------------------------------------------Ciclo for para generar las simulaciones------------------------------------------------------------------
  const realizarSimulacion = () => {
    if (error) {
      setError('');
    }
  
    const errorSimulacion = comprobarErrores();
    if (errorSimulacion) {
      setError(errorSimulacion);
      return;
    }

    // Agregar estas variables al principio de la función realizarSimulacion
    let comisionAcumuladaVendedor1 = 0;
    let comisionAcumuladaVendedor2 = 0;
    let comisionAcumuladaVendedor3 = 0;
    let comisionAcumuladaVendedor4 = 0;

    //Array de simulaciones, aca es donde se van a ir guardando
    const simulacionesNuevas = [];
  
    for (let i = 0; i < cantidadSimulaciones; i++) {
      //CALCULO PARA SABER AUTOS VENDIDOS
      const rndAutosVendidos = Math.random() * 0.99;
      let autosVendidos;
  
      if (rndAutosVendidos < probabilidadAutoVendido1*0.01) {
        autosVendidos = 0;
      } else if (rndAutosVendidos < probabilidadAutoVendido2*0.01 + probabilidadAutoVendido1*0.01) {
        autosVendidos = 1;
      } else if (rndAutosVendidos < probabilidadAutoVendido3*0.01 + probabilidadAutoVendido2*0.01 + probabilidadAutoVendido1*0.01) {
        autosVendidos = 2;
      } else if (rndAutosVendidos < probabilidadAutoVendido4*0.01 + probabilidadAutoVendido3*0.01 + probabilidadAutoVendido2*0.01 + probabilidadAutoVendido1*0.01) {
        autosVendidos = 3;
      } else if (rndAutosVendidos <= probabilidadAutoVendido5*0.01 + probabilidadAutoVendido4*0.01 + probabilidadAutoVendido3*0.01 + probabilidadAutoVendido2*0.01 + probabilidadAutoVendido1*0.01) {
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
      } else if (rndTipoAuto < probabilidadCompacto*0.01) {
        tipoAuto = 'Compacto';
      } else if (rndTipoAuto < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
        tipoAuto = 'Mediano';
      } else if (rndTipoAuto < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
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
  
      //AC
      if (vendedor === 'Vendedor 1') {
        comisionAcumuladaVendedor1 += comision;
      } else if (vendedor === 'Vendedor 2') {
        comisionAcumuladaVendedor2 += comision;
      } else if (vendedor === 'Vendedor 3') {
        comisionAcumuladaVendedor3 += comision;
      } else if (vendedor === 'Vendedor 4') {
        comisionAcumuladaVendedor4 += comision;
      }

      // Calcular promediosAC
      const promedioComisionAcumuladaVendedor1 = parseFloat(comisionAcumuladaVendedor1 / (i+1));

      const promedioComisionAcumuladaVendedor2 = parseFloat(comisionAcumuladaVendedor2 / (i+1));

      const promedioComisionAcumuladaVendedor3 = parseFloat(comisionAcumuladaVendedor3 / (i+1));

      const promedioComisionAcumuladaVendedor4 = parseFloat(comisionAcumuladaVendedor4 / (i+1));

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
        comisionAcumuladaVendedor1,
        promedioComisionAcumuladaVendedor1,
        comisionAcumuladaVendedor2,
        promedioComisionAcumuladaVendedor2,
        comisionAcumuladaVendedor3,
        promedioComisionAcumuladaVendedor3,
        comisionAcumuladaVendedor4,
        promedioComisionAcumuladaVendedor4,
      };
  
      //Hacemos el push al array simulacionesNuevas declarado al principio 
      simulacionesNuevas.push(nuevaSimulacion);
    }
    
    const comisionMuyTotal = (comisionAcumuladaVendedor1 + comisionAcumuladaVendedor2 + comisionAcumuladaVendedor3 + comisionAcumuladaVendedor4)/4;
    console.log('COMISION TOTAL', comisionMuyTotal);
  
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
          <td>{simulacion ? simulacion.comisionAcumuladaVendedor1 : '-'}</td>
          <td>{simulacion ? simulacion.promedioComisionAcumuladaVendedor1.toFixed(1) : '-'}</td>
          <td>{simulacion ? simulacion.comisionAcumuladaVendedor2 : '-'}</td>
          <td>{simulacion ? simulacion.promedioComisionAcumuladaVendedor2.toFixed(1) : '-'}</td>
          <td>{simulacion ? simulacion.comisionAcumuladaVendedor3 : '-'}</td>
          <td>{simulacion ? simulacion.promedioComisionAcumuladaVendedor3.toFixed(1) : '-'}</td>
          <td>{simulacion ? simulacion.comisionAcumuladaVendedor4 : '-'}</td>
          <td>{simulacion ? simulacion.promedioComisionAcumuladaVendedor4.toFixed(1) : '-'}</td>
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
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comisionAcumuladaVendedor1 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].promedioComisionAcumuladaVendedor1.toFixed(1) : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comisionAcumuladaVendedor2 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].promedioComisionAcumuladaVendedor2.toFixed(1) : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comisionAcumuladaVendedor3 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].promedioComisionAcumuladaVendedor3.toFixed(1) : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comisionAcumuladaVendedor4 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].promedioComisionAcumuladaVendedor4.toFixed(1) : '-'}</td>
      </tr>
    );

    filasMostradas.push(ultimaFila);

    return filasMostradas;
  };

  const acProbabilidad = (probabilidadAutoVendido1*0.01 + probabilidadAutoVendido2*0.01 + probabilidadAutoVendido3*0.01 + probabilidadAutoVendido4*0.01 + probabilidadAutoVendido5*0.01)-0.001;
  console.log(acProbabilidad);

  const acProbabilidadTipoAuto = (probabilidadCompacto*0.01 + probabilidadMediano*0.01 + probabilidadLujo*0.01); 
  console.log(acProbabilidadTipoAuto);

  const acProbabilidadComisionMediano = (probabilidadComisionMediano1*0.01+probabilidadComisionMediano2*0.01);
  console.log(acProbabilidadComisionMediano);

  const acProbabilidadComisionLujo = (probabilidadComisionLujo1*0.01+probabilidadComisionLujo2*0.01+probabilidadComisionLujo3*0.01);
  console.log(acProbabilidadComisionLujo);

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
    } else if ( acProbabilidad > 1 || acProbabilidadTipoAuto > 1 || acProbabilidadComisionMediano > 1 || acProbabilidadComisionLujo > 1) {
      return "Error: La probabilidad no puede superar el 100%"
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

      <div className='probabilidades' style={{display:'flex', justifyContent:'center'}}>
        <div className='menu-button'>
          <Button variant="contained" style={{marginTop:'10px', marginBottom:'10px'}} onClick={openMenu}> ☰ Probabilidades </Button>
          {menuOpen && (
            <div className="menu-input">
              <div className='probautovendido' style={{display:'flex', flexDirection:'row', marginBottom:'10px', gap: '10px'}}>
                <h4>Probabilidad cantidad autos vendidos</h4>
                <TextField id="filled-number" variant="filled" label="Prob. autos vendidos 0" type="number" value={probabilidadAutoVendido1} onChange={(e) => setProbabilidadAutoVendido1(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Prob. autos vendidos 1" type="number" value={probabilidadAutoVendido2} onChange={(e) => setProbabilidadAutoVendido2(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Prob. autos vendidos 2" type="number" value={probabilidadAutoVendido3} onChange={(e) => setProbabilidadAutoVendido3(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Prob. autos vendidos 3" type="number" value={probabilidadAutoVendido4} onChange={(e) => setProbabilidadAutoVendido4(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Prob. autos vendidos 4" type="number" value={probabilidadAutoVendido5} onChange={(e) => setProbabilidadAutoVendido5(Number(e.target.value))}/>
              </div>

              <div className='tipoautovendido' style={{display:'flex', flexDirection:'row', marginBottom:'10px', gap: '10px'}}>
                <h4>Probabilidad comisiones tipo auto vendido</h4>
                <TextField id="filled-number" variant="filled" label="Prob. tipo auto Compacto" type="number" value={probabilidadCompacto} onChange={(e) => setProbabilidadCompacto(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Prob. tipo auto Mediano" type="number" value={probabilidadMediano} onChange={(e) => setProbabilidadMediano(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Prob. tipo auto Lujo" type="number" value={probabilidadLujo} onChange={(e) => setProbabilidadLujo(Number(e.target.value))}/>
              </div>

              <div className='dineroPorTipoAutoMediano' style={{display:'flex', flexDirection:'row', marginBottom:'10px', gap: '10px'}}>
                <h4>Probabilidad comisiones Auto Mediano</h4>
                <TextField id="filled-number" variant="filled" label="Prob. comision $400 Mediano" type="number" value={probabilidadComisionMediano1} onChange={(e) => setprobabilidadComisionMediano1(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Prob. comision $500 Mediano" type="number" value={probabilidadComisionMediano2} onChange={(e) => setprobabilidadComisionMediano2(Number(e.target.value))}/>
              </div>

              <div className='dineroPorTipoAutoLujo' style={{display:'flex', flexDirection:'row', marginBottom:'10px', gap: '10px'}}>
                <h4>Probabilidad comisiones Auto de Lujo</h4>
                <TextField id="filled-number" variant="filled" label="Prob. comision $1000 Lujo" type="number" value={probabilidadComisionLujo1} onChange={(e) => setprobabilidadComisionLujo1(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Prob. comision $1500 Lujo" type="number" value={probabilidadComisionLujo2} onChange={(e) => setprobabilidadComisionLujo2(Number(e.target.value))}/>
                <TextField id="filled-number" variant="filled" label="Prob. comision $2000 Lujo" type="number" value={probabilidadComisionLujo3} onChange={(e) => setprobabilidadComisionLujo3(Number(e.target.value))}/>
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
            <th>AC Comision V1</th>
            <th>Prom. Comision AC V1</th>
            <th>AC Comision V2</th>
            <th>Prom. Comision AC V2</th>
            <th>AC Comision V3</th>
            <th>Prom. Comision AC V3</th>
            <th>AC Comision V4</th>
            <th>Prom. Comision AC V4</th>
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