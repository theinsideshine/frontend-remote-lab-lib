import React,{ useEffect , useState}  from 'react'
import Typography from '@mui/material/Typography';

import {Box, Grid ,Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField}  from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {makeStyles} from '@material-ui/core/styles';
import SendIcon from "@material-ui/icons/Send";
import HelpIcon from '@material-ui/icons/Help';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Divider } from '@mui/material';
import { fetchWithoutToken } from '../../helpers/fetch';

import  Swal from 'sweetalert2';


import {  memNameConfig } from '../experiment/MemoryName';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  }
}));


const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'absolute',
    width: 200,
    background: 'linear-gradient(180deg,#496cb2,#6390e9)',   
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  iconos:{
    cursor: 'pointer'
  }, 

  inputMaterial:{
    width: '100%'
  },
  table: {
    minWidth: 200
    
    
  },
  narrowCell: {
    width: 50
  },
   
}));


export const Advanced = () => {

  const styles= useStyles();  

  const [ modalEdit, setmodalEdit ]=useState(false);
  const [ memConfig, setMemConfig ]= useState([]);    
  const [ statusLib, setStatusLib ] = useState('');
  const [ statusServer, setStatusServer ]=useState('');
  const [ serialLib, setSerialLib ] = useState(true);
  const [ selectConsole, setSelectConsole ]=useState({
    uid: 0,
    name: '',
    key: '',
    value: ''
})

  const [ipAddress, setIpAddress] = useState(''); 


  const helpTestServer=()=>{
    Swal.fire(
      'El servidor se encuentra en una ip que expone al levantar',
      'El servidor no se levanta si no tiene el arduino conectado',
      'question'
    )
  }  

  const helpLib=()=>{
    Swal.fire(
      'La libreria se encuentra disponible si no se esta ejecutando el experimento',
      'El modo serial debe estar desactivado. Reinicie el arduino',
      'question'
    )
  }


  const helpSerial=()=>{
    Swal.fire(
      'El modo serial activo se usa para ejecutar el experimento sin conexion al cliente',
      'Desactive el modo serial. Puede tener problemas aleatorios de conectividad.',
      'question'
    )
  }
 const srtTestLib = 'read/status';
 const srtTestServer = 'ping';
 const srtTestSerial = 'read/serial_level';
 const srtDisableSerial = 'save/disable_serial';

  const testConection= async ( strRoute )=>{   
    
    console.log('Test conexion :',strRoute);
    var result, strCmp;


    
        try {                   
                

                const response = await fetchWithoutToken(`${ ipAddress }${strRoute}`);     
                if(!response.ok){
                  throw Swal.fire({  icon: 'error', title: 'Error Servidor'});
                }          
                const body = await response.json();        
    
                console.log(body);

                if ( strRoute === srtTestLib ) { //Fija condicion de comunicacion OK
                  
                  result= body.status ;
                  strCmp = 0;  // body.status === 0 condicion de lib activa, el status devuelve el estado del ensayo 0 detenido "disponible"
                  setStatusLib(false); // Evita que si el status esta ok y hay falla en el servidor quede el estado OK
                }else if  ( strRoute === srtTestServer ) {
                  
                   result= body.message ;
                   strCmp = 'pong!';  
                   setStatusServer(false); // Evita que si el status esta ok y hay falla en el servidor quede el estado OK

                } else if ( strRoute === srtTestSerial){
                 
                  result = body.serial_level; 
                  strCmp = 0;

                }else if ( strRoute === srtDisableSerial){
                 
                  result = body.result; 
                  strCmp = 'ok';

                }

                if (result === strCmp){            
                  
                            if ( strRoute === srtTestLib ) { // Ejecucion condicional 
                              setStatusLib(true);
                              Swal.fire({  icon: 'success', title: 'Lectura correcta '}); 
                            }  else if( strRoute === srtTestServer ) {
                              setStatusServer(true);
                              Swal.fire({  icon: 'success', title: 'Lectura correcta '});                            
                            }  else if( strRoute === srtTestSerial ) {
                              setSerialLib(false);
                              Swal.fire({  icon: 'success', title: 'Lectura correcta '});                            
                            }  else if( strRoute === srtDisableSerial ) {                              
                              Swal.fire({  icon: 'success', title: 'Escritura correcta',text:'por favor lea el modo serie'});                            
                            }                           
                      }else  {
                             
                            if ( strRoute === srtTestLib ) { // Ejecucion condicional
                              setStatusLib(false);
                              Swal.fire({  icon: 'error', title: 'Error Libreria. '});
                              console.log('Error Libreria');
                            } else  if ( strRoute === srtTestServer ) {
                              setStatusServer(false);
                              Swal.fire({  icon: 'error',  title: 'Servidor no encontrado',text: 'Verifique Ip, verifique conexion servidor-arduino'});
                              console.log('Error Servidor');
                            } else  if ( strRoute === srtTestSerial ) {
                              setSerialLib(true);
                              Swal.fire({  icon: 'warning',  title: 'El modo serial esta activo', text: 'Verifiquelo puede tener problemas de conectividad'});
                              console.log('Modo serie activo');
                            }
                            else  if ( strRoute === srtDisableSerial ) {                             
                              Swal.fire({  icon: 'error',  title: 'Error Libreria. ', text: 'No se pudo desactivar serial'});
                              console.log('No se pudo desactivar serial');
                            }
                    }   

        } catch (err) {
        console.log(err);
        }    
  
  }

  const helpExample1=()=>{
    Swal.fire(
      'Uso de la memoria del arduino. ',
      'OutputX = ( InputX + CfgX([0-4] ) + ( 2 * CfgX[5-9] ) si  Input0=10 Cfg0=1 Cfg5= 2 Output0= (10+1)+(2*2)=15' ,
      'question'
    )
  }
  
  const helpExample2=()=>{
    Swal.fire(
      'Se configura el blinkeo del led del arduino, ',
      'Cfg5 = numero de blinks (1-10) ; Cfg6 = tiempo en ms de duracion del blink (100-1000)' ,
      'question'
    )
  }
  const helpExample3=()=>{
    Swal.fire(
      'Se genera una recta de pendiente 1 en la memoria resultados ',
      'Ir a experimento LEER RESULTADOS y bajar resultados' ,
      'question'
    )
  }
  
  const helpExample4=()=>{
    Swal.fire(
      'Se genera una recta de pendiente -1 en en la memoria resultados ',
      'Ir a experimento LEER RESULTADOS y bajar resultados' ,
      'question'
    )
  }


const runExample= async ( strRoute )=>{       
 
      console.log('Ejemplo :',strRoute);
     
          try {
                const response = await fetchWithoutToken(`${ ipAddress }save/${strRoute}`);     
                if(!response.ok){
                  throw Swal.fire({  icon: 'error', title: 'Error Servidor'});
                }          
                const body = await response.json(); 
                console.log(body);
          
                if (body.result === 'ok'){            
                  Swal.fire({  icon: 'success', title: 'Ejemplo ejecutado'});          
          }  
          else  {
            Swal.fire({  icon: 'error', title: 'Error Libreria.',text:' Procure que no se este ejecutando el ejemplo'});
            console.log('Error Libreria'); 
          }   

    } catch (err) {
    console.log(err);
    } 
}

  const ReadConfig= async ( )=>{    
    console.log('Leyendo configuracion');
    try {
                  const response = await fetchWithoutToken(`${ ipAddress }read/all-cfg`);    
                  if(!response.ok){
                    throw Swal.fire({  icon: 'error', title: 'Error Servidor'});
                  } 
                  const body = await response.json(); 
                
                  if(body.read === 'all-cfg') {                
                      
                    console.log(body);
                    setMemConfig([
                      {
                      uid:   0,
                      name: memNameConfig.cfg0,
                      key:   'cfg0',
                      value: body.cfg0
                    },
                    
                      {
                      uid:   1,
                      name: memNameConfig.cfg1,
                      key:   'cfg1',
                      value: body.cfg1
                      },
                      {
                      uid:   2,
                      name: memNameConfig.cfg2,
                      key:   'cfg2',
                      value: body.cfg2
                    },
                    
                      {
                      uid:   3,
                      name: memNameConfig.cfg3,
                      key:   'cfg3',
                      value: body.cfg3
                    },
                    
                      {
                      uid:   4,
                      name: memNameConfig.cfg4,
                      key:   'cfg4',
                      value: body.cfg4
                    },
                    
                      {
                      uid:   5,
                      name: memNameConfig.cfg5,
                      key:   'cfg5',
                      value: body.cfg5
                    },
                    
                      {
                      uid:   6,
                      name: memNameConfig.cfg6,
                      key:   'cfg6',
                      value: body.cfg6
                    },
                    
                      {
                      uid:   7,
                      name: memNameConfig.cfg7,
                      key:   'cfg7',
                      value: body.cfg7
                    },
                    
                      {
                      uid:   8,
                      name: memNameConfig.cfg8,
                      key:   'cfg8',
                      value: body.cfg8
                    },
                    
                      {
                      uid:   9,
                      name: memNameConfig.cfg9,
                      key:   'cfg9',
                      value: body.cfg9
                      }
                
                    ])
                    Swal.fire({  icon: 'success', title: 'Configuracion leida'});
                
                  }  else  {
                    Swal.fire({  icon: 'error', title: 'Error Libreria.',text:' No pudo guardar la configuracion'});
                    console.log('Error Libreria'); 
                  }   
        
            } catch (err) {
            console.log(err);
            }   
  
  }
  
  const WriteConfig= async ( ipAddress )=>{    
    console.log('Escribiendo configuracion');
    console.log(memConfig);
    if (memConfig.length===0){
      Swal.fire({  icon: 'error', title: 'Parametros de configuracion vacios'});
      return;
    }
    
    const data = { cfg0: memConfig[0].value,cfg1: memConfig[1].value,cfg2: memConfig[2].value,cfg3: memConfig[3].value,cfg4: memConfig[4].value,
                   cfg5: memConfig[5].value,cfg6: memConfig[6].value,cfg7: memConfig[7].value,cfg8: memConfig[8].value,cfg9: memConfig[9].value }
                   try {
                          const response = await fetchWithoutToken(`${ ipAddress }save/all-cfg`,data,'PUT');   
                          
                          if(!response.ok){
                            throw Swal.fire({  icon: 'error', title: 'Error Servidor'});
                          }
                          const body = await response.json(); 
                        
                          if(body.result === 'ok') {        
                            console.log(body);
                            Swal.fire({  icon: 'success', title: 'Configuracion guardada'});
                
                          }  else  {
                            Swal.fire({  icon: 'error', title: 'Error Libreria.',text:' No pudo escribir la configuracion'});
                            console.log('Error Libreria'); 
                          }   
                
                    } catch (err) {
                    console.log(err);
                    }    
  
  }
  

  useEffect(() => {
    
    setIpAddress( localStorage.getItem('ipAdrress'));
  },[ipAddress]);


  
  const handleChange=e=>{
    const {name, value}=e.target;
   
    setSelectConsole(prevState=>({
      ...prevState,
      [name]: value
    }))
    
  }

  const petitionPut= (selectConsole)=>{   
   

    const newConfig= memConfig.map( (memConfig)=> {
      if (memConfig.uid === selectConsole.uid){
        return {
          ...memConfig,
          value: selectConsole.value
        }
      }
      return memConfig;
    });

    setMemConfig(newConfig);
      openClosemodalEdit();
    }
  
  

      const bodyEdit=(
        <div className={styles.modal}>
          <h3>Editar Consola</h3>

          <TextField name="name" disabled className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={selectConsole && selectConsole.name}/>
          <br />
          <TextField name="key" disabled className={styles.inputMaterial} label="Clave"   onChange={handleChange} value={selectConsole && selectConsole.key}/>
          <br />
          <TextField name="value" type="number" className={styles.inputMaterial} label="Valor"   onChange={handleChange}value={selectConsole && selectConsole.value}/>
          <br />
         
          <div align="right">
            <Button color="primary" onClick={()=>petitionPut(selectConsole)}>Editar</Button>
            <Button onClick={()=>openClosemodalEdit()}>Cancelar</Button>
          </div>
        </div>
      ) 
  

  const openClosemodalEdit=()=>{
    setmodalEdit(!modalEdit);
  }


  const ConsoleSelect=(console, caso)=>{
    setSelectConsole(console);
    if (caso==='Editar'){
    openClosemodalEdit()
    }
  }

  return (
    <Grid container >
            
           <Grid item  sx={12} sm={4}>          
              <Box 
                  sx={{      
                    marginTop: 150,          
                    background: 'linear-gradient(180deg,#496cb2,#6390e9)',
                    borderRadius: 15                
                }}>
                  
                  <Typography align='center'>
                  Memoria arduino: parametros de configuracion</Typography>

                <TableContainer >
                  <Table className={styles.table}>
                      <TableHead >
                          <TableRow  >
                            <StyledTableCell>Nombre_ref</StyledTableCell>
                            <StyledTableCell>Clave_arduino</StyledTableCell>
                            <StyledTableCell>Valor</StyledTableCell>
                            <StyledTableCell>Acciones</StyledTableCell>                            
                          </TableRow>
                      </TableHead>

                      <TableBody>                           
                          {
                          memConfig.map(( console )=>(
                              <TableRow key={console.uid}>
                                  <TableCell className={styles.narrowCell}>{console.name}</TableCell>
                                  <TableCell className={styles.narrowCell}>{console.key}</TableCell>
                                  <TableCell className={styles.narrowCell}>{console.value}</TableCell>                                  
                                  <TableCell className={styles.narrowCell}>                              
                                    <Edit className={styles.iconos} onClick={()=>ConsoleSelect(console, 'Editar')}/>   
                                    &nbsp;&nbsp;&nbsp;                           
                                  </TableCell>
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer> 

              <Button
              startIcon={<SendIcon />}
              onClick={() => WriteConfig(ipAddress)}>
              Grabar parametros </Button>

              <Button
              startIcon={<SendIcon />} 
              onClick={() => ReadConfig()}>
                Leer parametros </Button>
                  
            </Box>  

              <Modal
                open={modalEdit}
                onClose={openClosemodalEdit}>
                {bodyEdit}
              </Modal>

          </Grid>   

            <Grid item  xs={1} sm={1}>
            </Grid>

            <Grid item  xs={10} sm={2}>  

                  <Box 
                      sx={{      
                        marginTop: 150,          
                        background:'linear-gradient(180deg,#496cb2,#6390e9)',
                        borderRadius: 15,
                        height: 'auto'                
                    }}>

                      <Button
                      startIcon={<SendIcon />}
                      onClick={() => testConection(srtTestServer)}
                      >Probar servidor </Button> 
                      
                      <Typography align='center' color="#FFFFFF">
                        <br></br>Conexion : {statusServer? (<>Ok</>) : (<><b>error</b></>)} </Typography>
                      <Button
                      startIcon={<HelpIcon />}
                      onClick={() => helpTestServer()}>
                      </Button> 
                      
                      <Divider sx={{ bgcolor: "#FFFFFF" }} />
                      
                      <Button
                      startIcon={<SendIcon />}
                      onClick={() => testConection(srtTestLib)}>
                        Probar Libreria </Button> 
                      
                      <Typography align='center' color="#FFFFFF">
                          <br></br>Conexion : {statusLib? (<>Ok</>) : (<><b>error</b></>)} </Typography>
                          
                      <Button
                      startIcon={<HelpIcon />}
                      onClick={() => helpLib()}>
                      </Button> 
                      <Divider sx={{ bgcolor: "#FFFFFF" }} />
                      
                      <Button
                      startIcon={<SendIcon />}
                      onClick={() => testConection(srtTestSerial)}
                      >leer modo serie </Button>                 

                      <Typography align='center' color="#FFFFFF">
                        <br></br>Modo Serie : {serialLib? (<>Activo</>) : (<>Desactivado</>)} </Typography>
                      <br></br>
                      <Button
                        startIcon={<HelpIcon />}
                        onClick={() => helpSerial()}>
                        </Button> 

                        <Button
                        startIcon={<DisabledByDefaultIcon />}
                        onClick={() => testConection(srtDisableSerial)}>
                          Desactivar modo serie
                        </Button>                   
                    <br></br>
                    <br></br>

                  </Box>              
            </Grid>

            <Grid item xs={1} sm={1}>
            </Grid>
              
              
            <Grid item  xs={1} sm={1}>
            </Grid>

            <Grid item  xs={10} sm={2}> 

                <Box 
                    sx={{      
                      marginTop: 150,          
                      background:'linear-gradient(180deg,#496cb2,#6390e9)',
                      borderRadius: 15,
                      height: 'auto'                  
                  }}>

                    <Button
                    startIcon={<OndemandVideoIcon />}
                    onClick={() => runExample('run1')}
                    >Ejemplo 1 </Button>
                    <br></br>
                    <Button
                    startIcon={<HelpIcon />}
                    onClick={() => helpExample1()}>
                    </Button> 

                    <Divider sx={{ bgcolor: "#FFFFFF" }} />

                    <Button
                    startIcon={<OndemandVideoIcon />}
                    onClick={() => runExample('run2')}>
                      Ejemplo 2 </Button>
                  <br></br>

                  <Button
                    startIcon={<HelpIcon />}
                    onClick={() => helpExample2()}>
                    </Button> 
                    <Divider sx={{ bgcolor: "#FFFFFF" }} />

                    <Button
                    startIcon={<OndemandVideoIcon />}
                    onClick={() => runExample('run3')}>
                      Ejemplo 3 </Button>
                  <br></br>

                  <Button
                    startIcon={<HelpIcon />}
                    onClick={() => helpExample3()}>
                    </Button> 
                    <Divider sx={{ bgcolor: "#FFFFFF" }} />
                    
                    <Button
                    startIcon={<OndemandVideoIcon />}
                    onClick={() => runExample('run4')}
                    >Ejemplo 4 </Button>

                  <br></br>
                  <Button
                    startIcon={<HelpIcon />}
                    onClick={() => helpExample4()}>
                    </Button>                     
                </Box>
              </Grid> 

              <Grid item xs={1} sm={1}>
            </Grid>

             

      </Grid>   
  )
}
