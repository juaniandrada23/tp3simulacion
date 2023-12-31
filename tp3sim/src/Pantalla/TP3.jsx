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
  const calcularComision = (comision1, comision2, comision3, comision4, tipoAuto1, tipoAuto2, tipoAuto3, tipoAuto4, rndComisionMediano1, rndComisionLujo1, rndComisionMediano2, rndComisionLujo2, rndComisionMediano3, rndComisionLujo3, rndComisionMediano4, rndComisionLujo4) => {

    if (tipoAuto1 === 'Compacto') {
      comision1 = 250;
    } else if (tipoAuto1 === 'Mediano') {
      if (rndComisionMediano1 <= probabilidadComisionMediano1 * 0.01) {
        comision1 = 400;
      } else if (rndComisionMediano1 <= probabilidadComisionMediano2 * 0.01 + probabilidadComisionMediano1 * 0.01) {
        comision1 = 500;
      }
    } else if (tipoAuto1 === 'Lujo') {
      if (rndComisionLujo1 <= probabilidadComisionLujo1 * 0.01) {
        comision1 = 1000;
      } else if (rndComisionLujo1 <= probabilidadComisionLujo2 * 0.01 + probabilidadComisionLujo1 * 0.01) {
        comision1 = 1500;
      } else if (rndComisionLujo1 <= probabilidadComisionLujo3 * 0.01 + probabilidadComisionLujo2 * 0.01 + probabilidadComisionLujo1 * 0.01) {
        comision1 = 2000;
      }
    }
  
    if (tipoAuto2 === 'Compacto') {
      comision2 = 250;
    } else if (tipoAuto2 === 'Mediano') {
      if (rndComisionMediano2 <= probabilidadComisionMediano1 * 0.01) {
        comision2 = 400;
      } else if (rndComisionMediano2 <= probabilidadComisionMediano2 * 0.01 + probabilidadComisionMediano1 * 0.01) {
        comision2 = 500;
      }
    } else if (tipoAuto2 === 'Lujo') {
      if (rndComisionLujo2 <= probabilidadComisionLujo1 * 0.01) {
        comision2 = 1000;
      } else if (rndComisionLujo2 <= probabilidadComisionLujo2 * 0.01 + probabilidadComisionLujo1 * 0.01) {
        comision2 = 1500;
      } else if (rndComisionLujo2 <= probabilidadComisionLujo3 * 0.01 + probabilidadComisionLujo2 * 0.01 + probabilidadComisionLujo1 * 0.01) {
        comision2 = 2000;
      }
    }
  
    if (tipoAuto3 === 'Compacto') {
      comision3 = 250;
    } else if (tipoAuto3 === 'Mediano') {
      if (rndComisionMediano3 <= probabilidadComisionMediano1 * 0.01) {
        comision3 = 400;
      } else if (rndComisionMediano3 <= probabilidadComisionMediano2 * 0.01 + probabilidadComisionMediano1 * 0.01) {
        comision3 = 500;
      }
    } else if (tipoAuto3 === 'Lujo') {
      if (rndComisionLujo3 <= probabilidadComisionLujo1 * 0.01) {
        comision3 = 1000;
      } else if (rndComisionLujo3 <= probabilidadComisionLujo2 * 0.01 + probabilidadComisionLujo1 * 0.01) {
        comision3 = 1500;
      } else if (rndComisionLujo3 <= probabilidadComisionLujo3 * 0.01 + probabilidadComisionLujo2 * 0.01 + probabilidadComisionLujo1 * 0.01) {
        comision3 = 2000;
      }
    }
  
    if (tipoAuto4 === 'Compacto') {
      comision4 = 250;
    } else if (tipoAuto4 === 'Mediano') {
      if (rndComisionMediano4 <= probabilidadComisionMediano1 * 0.01) {
        comision4 = 400;
      } else if (rndComisionMediano4 <= probabilidadComisionMediano2 * 0.01 + probabilidadComisionMediano1 * 0.01) {
        comision4 = 500;
      }
    } else if (tipoAuto4 === 'Lujo') {
      if (rndComisionLujo4 <= probabilidadComisionLujo1 * 0.01) {
        comision4 = 1000;
      } else if (rndComisionLujo4 <= probabilidadComisionLujo2 * 0.01 + probabilidadComisionLujo1 * 0.01) {
        comision4 = 1500;
      } else if (rndComisionLujo4 <= probabilidadComisionLujo3 * 0.01 + probabilidadComisionLujo2 * 0.01 + probabilidadComisionLujo1 * 0.01) {
        comision4 = 2000;
      }
    }
  
    console.log("Comision del auto 1:", comision1);
    console.log("Comision del auto 2:", comision2);
    console.log("Comision del auto 3:", comision3);
    console.log("Comision del auto 4:", comision4);

    const comision = comision1 + comision2 + comision3 + comision4;
    const comi1 = comision1;
    const comi2 = comision2;
    const comi3 = comision3;
    const comi4 = comision4;
    return {comision: comision,
            comision1: comi1,
            comision2: comi2,
            comision3: comi3,
            comision4: comi4
          };
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
      let rndComisionMediano1 = 0;
      let rndComisionLujo1 = 0;
      let rndComisionMediano2 = 0;
      let rndComisionLujo2 = 0;
      let rndComisionMediano3 = 0;
      let rndComisionLujo3 = 0;
      let rndComisionMediano4 = 0;
      let rndComisionLujo4 = 0;

      let rndTipoAuto1 = Math.random();
      let rndTipoAuto2 = Math.random();
      let rndTipoAuto3 = Math.random();
      let rndTipoAuto4 = Math.random();
      let tipoAuto1 = '';
      let tipoAuto2 = '';
      let tipoAuto3 = '';
      let tipoAuto4 = '';

      let comision1 = 0;
      let comision2 = 0;
      let comision3 = 0;
      let comision4 = 0;
  
      if (autosVendidos === 0) {
        rndTipoAuto1 = 0;
        rndTipoAuto2 = 0;
        rndTipoAuto3 = 0;
        rndTipoAuto4 = 0;
        tipoAuto1 = '-';
        tipoAuto2 = '-';
        tipoAuto3 = '-';
        tipoAuto4 = '-';
        rndComisionMediano1 = '-';
        rndComisionLujo1 = '-';
        rndComisionMediano2 = '-';
        rndComisionLujo2 = '-';
        rndComisionMediano3 = '-';
        rndComisionLujo3 = '-';
        rndComisionMediano4 = '-';
        rndComisionLujo4 = '-';
      } else if ( autosVendidos === 1) {
        if (rndTipoAuto1 < probabilidadCompacto * 0.01) {
          tipoAuto1 = 'Compacto'; 
          rndTipoAuto2 = 0;
          tipoAuto2 = '-';
          rndTipoAuto3 = 0; 
          tipoAuto3 = '-'; 
          rndTipoAuto4 = 0;
          tipoAuto4 = '-';
          rndComisionMediano1 = '-';
          rndComisionLujo1 = '-';
        } else if (rndTipoAuto1 < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto1 = 'Mediano'; 
          rndTipoAuto2 = 0;
          tipoAuto2 = '-';
          rndTipoAuto3 = 0; 
          tipoAuto3 = '-'; 
          rndTipoAuto4 = 0;
          tipoAuto4 = '-';
          rndComisionMediano1 = Math.random().toFixed(4);
          rndComisionLujo1 = '-';
        } else if (rndTipoAuto1 < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto1 = 'Lujo'; 
          rndTipoAuto2 = 0;
          tipoAuto2 = '-';
          rndTipoAuto3 = 0; 
          tipoAuto3 = '-'; 
          rndTipoAuto4 = 0;
          tipoAuto4 = '-';
          rndComisionMediano1 = '-';
          rndComisionLujo1 = Math.random().toFixed(4);
        }
      } else if ( autosVendidos === 2) {
        if (rndTipoAuto1 < probabilidadCompacto * 0.01) {
          tipoAuto1 = 'Compacto';
          rndComisionMediano1 = '-';
          rndComisionLujo1 = '-';
        } else if (rndTipoAuto1 < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto1 = 'Mediano';
          rndComisionMediano1 = Math.random().toFixed(4);
          rndComisionLujo1 = '-';
        } else if ( rndTipoAuto1 < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto1 = 'Lujo';
          rndComisionMediano1 = '-';
          rndComisionLujo1 = Math.random().toFixed(4);
        }

        if (rndTipoAuto2 < probabilidadCompacto * 0.01) {
          tipoAuto2 = 'Compacto';
          rndComisionMediano2 = '-';
          rndComisionLujo2 = '-';
        } else if (rndTipoAuto2 < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto2 = 'Mediano';
          rndComisionMediano2 = Math.random().toFixed(4);
          rndComisionLujo2 = '-';
        } else if (rndTipoAuto2 < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto2 = 'Lujo';
          rndComisionMediano2 = '-';
          rndComisionLujo2 = Math.random().toFixed(4);
        }
        rndTipoAuto3 = 0;
        rndTipoAuto4 = 0;
      } else if ( autosVendidos === 3) {
        if (rndTipoAuto1 < probabilidadCompacto * 0.01) {
          tipoAuto1 = 'Compacto';
          rndComisionMediano1 = '-';
          rndComisionLujo1 = '-';
        } else if (rndTipoAuto1 < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto1 = 'Mediano';
          rndComisionMediano1 = Math.random().toFixed(4);
          rndComisionLujo1 = '-';
        } else if ( rndTipoAuto1 < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto1 = 'Lujo';
          rndComisionMediano1 = '-';
          rndComisionLujo1 = Math.random().toFixed(4);
        }

        if (rndTipoAuto2 < probabilidadCompacto * 0.01) {
          tipoAuto2 = 'Compacto';
          rndComisionMediano2 = '-';
          rndComisionLujo2 = '-';
        } else if (rndTipoAuto2 < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto2 = 'Mediano';
          rndComisionMediano2 = Math.random().toFixed(4);
          rndComisionLujo2 = '-';
        } else if (rndTipoAuto2 < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto2 = 'Lujo';
          rndComisionMediano2 = '-';
          rndComisionLujo2 = Math.random().toFixed(4);
        }

        if (rndTipoAuto3 < probabilidadCompacto * 0.01) {
          tipoAuto3 = 'Compacto';
          rndComisionMediano3 = '-';
          rndComisionLujo3 = '-';
        } else if (rndTipoAuto3 < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto3 = 'Mediano';
          rndComisionMediano3 = Math.random().toFixed(4);
          rndComisionLujo3 = '-';
        } else if (rndTipoAuto3 < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto3 = 'Lujo';
          rndComisionMediano3 = '-';
          rndComisionLujo3 = Math.random().toFixed(4);
        }
        rndTipoAuto4 = 0;
      } else if (autosVendidos === 4) {
        if (rndTipoAuto1 < probabilidadCompacto * 0.01) {
          tipoAuto1 = 'Compacto';
          rndComisionMediano1 = '-';
          rndComisionLujo1 = '-';
        } else if (rndTipoAuto1 < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto1 = 'Mediano';
          rndComisionMediano1 = Math.random().toFixed(4);
          rndComisionLujo1 = '-';
        } else if ( rndTipoAuto1 < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto1 = 'Lujo';
          rndComisionMediano1 = '-';
          rndComisionLujo1 = Math.random().toFixed(4);
        }

        if (rndTipoAuto2 < probabilidadCompacto * 0.01) {
          tipoAuto2 = 'Compacto';
          rndComisionMediano2 = '-';
          rndComisionLujo2 = '-';
        } else if (rndTipoAuto2 < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto2 = 'Mediano';
          rndComisionMediano2 = Math.random().toFixed(4);
          rndComisionLujo2 = '-';
        } else if (rndTipoAuto2 < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto2 = 'Lujo';
          rndComisionMediano2 = '-';
          rndComisionLujo2 = Math.random().toFixed(4);
        }

        if (rndTipoAuto3 < probabilidadCompacto * 0.01) {
          tipoAuto3 = 'Compacto';
          rndComisionMediano3 = '-';
          rndComisionLujo3 = '-';
        } else if (rndTipoAuto3 < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto3 = 'Mediano';
          rndComisionMediano3 = Math.random().toFixed(4);
          rndComisionLujo3 = '-';
        } else if (rndTipoAuto3 < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto3 = 'Lujo';
          rndComisionMediano3 = '-';
          rndComisionLujo3 = Math.random().toFixed(4);
        }

        if (rndTipoAuto4 < probabilidadCompacto * 0.01) {
          tipoAuto4 = 'Compacto';
          rndComisionMediano4 = '-';
          rndComisionLujo4 = '-';
        } else if (rndTipoAuto4 < probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto4 = 'Mediano';
          rndComisionMediano4 = Math.random().toFixed(4);
          rndComisionLujo4 = '-';
        } else if (rndTipoAuto4 < probabilidadLujo*0.01 + probabilidadMediano*0.01 + probabilidadCompacto*0.01) {
          tipoAuto4 = 'Lujo';
          rndComisionMediano4 = '-';
          rndComisionLujo4 = Math.random().toFixed(4);
        }
      }       

      //Random para el vendedor
      const rndVendedor = Math.random();       

      //Asignamos como variable vendedor a la funcion asignarVendedor pasandole como propiedad el random
      const vendedor = asignarVendedor(rndVendedor);

      //Asignamos como variable comision a la funcion calcularComision como hicimos antes con el vendedor
      const comision = calcularComision(comision1, comision2, comision3, comision4, tipoAuto1, tipoAuto2, tipoAuto3, tipoAuto4, rndComisionMediano1, rndComisionLujo1, rndComisionMediano2, rndComisionLujo2, rndComisionMediano3, rndComisionLujo3, rndComisionMediano4, rndComisionLujo4);
  
      //AC
      if (vendedor === 'Vendedor 1') {
        comisionAcumuladaVendedor1 += comision.comision;
      } else if (vendedor === 'Vendedor 2') {
        comisionAcumuladaVendedor2 += comision.comision;
      } else if (vendedor === 'Vendedor 3') {
        comisionAcumuladaVendedor3 += comision.comision;
      } else if (vendedor === 'Vendedor 4') {
        comisionAcumuladaVendedor4 += comision.comision;
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
        rndTipoAuto1: rndTipoAuto1.toFixed(4),
        tipoAuto1,
        rndComisionMediano1: rndComisionMediano1,
        rndComisionLujo1: rndComisionLujo1,
        comision1: comision.comision1,
        rndTipoAuto2: rndTipoAuto2.toFixed(4),
        tipoAuto2,
        rndComisionMediano2: rndComisionMediano2,
        rndComisionLujo2: rndComisionLujo2,
        comision2: comision.comision2,
        rndTipoAuto3: rndTipoAuto3.toFixed(4),
        tipoAuto3,
        rndComisionMediano3: rndComisionMediano3,
        rndComisionLujo3: rndComisionLujo3,
        comision3: comision.comision3,
        rndTipoAuto4: rndTipoAuto4.toFixed(4),
        tipoAuto4,
        rndComisionMediano4: rndComisionMediano4,
        rndComisionLujo4: rndComisionLujo4,
        comision4: comision.comision4,
        comision: comision.comision,
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
          <td>{simulacion ? simulacion.rndTipoAuto1 : '-'}</td>
          <td>{simulacion ? simulacion.tipoAuto1 : '-'}</td>
          <td>{simulacion ? simulacion.rndComisionMediano1 : '-'}</td>
          <td>{simulacion ? simulacion.rndComisionLujo1 : '-'}</td>
          <td>{simulacion ? simulacion.comision1 : '-'}</td>
          <td>{simulacion ? simulacion.rndTipoAuto2 : '-'}</td>
          <td>{simulacion ? simulacion.tipoAuto2 : '-'}</td>
          <td>{simulacion ? simulacion.rndComisionMediano2 : '-'}</td>
          <td>{simulacion ? simulacion.rndComisionLujo2 : '-'}</td>
          <td>{simulacion ? simulacion.comision2 : '-'}</td>
          <td>{simulacion ? simulacion.rndTipoAuto3 : '-'}</td>
          <td>{simulacion ? simulacion.tipoAuto3 : '-'}</td>
          <td>{simulacion ? simulacion.rndComisionMediano3 : '-'}</td>
          <td>{simulacion ? simulacion.rndComisionLujo3 : '-'}</td>
          <td>{simulacion ? simulacion.comision3 : '-'}</td>
          <td>{simulacion ? simulacion.rndTipoAuto4 : '-'}</td>
          <td>{simulacion ? simulacion.tipoAuto4 : '-'}</td>
          <td>{simulacion ? simulacion.rndComisionMediano4 : '-'}</td>
          <td>{simulacion ? simulacion.rndComisionLujo4 : '-'}</td>
          <td>{simulacion ? simulacion.comision4 : '-'}</td>
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
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndTipoAuto1 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].tipoAuto1 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndComisionMediano1 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndComisionLujo1 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comision1 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndTipoAuto2 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].tipoAuto2 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndComisionMediano2 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndComisionLujo2 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comision2 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndTipoAuto3 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].tipoAuto3 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndComisionMediano3 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndComisionLujo3 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comision3 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndTipoAuto4 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].tipoAuto4 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndComisionMediano4 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].rndComisionLujo4 : '-'}</td>
        <td>{simulaciones[simulaciones.length - 1] ? simulaciones[simulaciones.length - 1].comision4 : '-'}</td>
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
            <th>RND Tipo auto1</th>
            <th>Tipo Auto1</th>
            <th style={{backgroundColor:'coral'}}>Rnd Mediano1</th>
            <th style={{backgroundColor:'coral'}}>Rnd Lujo1</th>
            <th style={{backgroundColor:'green'}}>Comision1</th>
            <th>RND Tipo auto2</th>
            <th>Tipo Auto2</th>
            <th style={{backgroundColor:'coral'}}>Rnd Mediano2</th>
            <th style={{backgroundColor:'coral'}}>Rnd Lujo2</th>
            <th style={{backgroundColor:'green'}}>Comision2</th>
            <th>RND Tipo auto3</th>
            <th>Tipo Auto3</th>
            <th style={{backgroundColor:'coral'}}>Rnd Mediano3</th>
            <th style={{backgroundColor:'coral'}}>Rnd Lujo3</th>
            <th style={{backgroundColor:'green'}}>Comision3</th>
            <th>RND Tipo auto4</th>
            <th>Tipo Auto4</th>
            <th style={{backgroundColor:'coral'}}>Rnd Mediano4</th>
            <th style={{backgroundColor:'coral'}}>Rnd Lujo4</th>
            <th style={{backgroundColor:'green'}}>Comision4</th>
            <th style={{backgroundColor:'blue'}}>ComisionTotal</th>
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