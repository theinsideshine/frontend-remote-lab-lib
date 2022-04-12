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
  //const [ modeLib, setModeLib ] = useState('');
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

  const testServer= async ( ipAddress )=>{    
  
    const response = await fetchWithoutToken(`${ ipAddress }ping`);             
    const body = await response.json(); 

      if ( response.status  === 200 ) {      
    
        if (body.message === 'pong!'){
          setStatusServer(true);
        }else {
                setStatusServer(false);
                Swal.fire({
                  icon: 'error',
                  title: 'Servidor no encontrado',
                  text: 'Verifique Ip, verifique conexion servirdor-arduino'                      
                  });
              }
      }
      else  {
        setStatusServer(false);
        Swal.fire({
          icon: 'error',
          title: 'Servidor no encontrado',
          text: 'Verifique Ip, verifique conexion servirdor-arduino'                      
          });

      }
  
     
  
  }

  const helpLib=()=>{
    Swal.fire(
      'La libreria se encuentra disponible si no se esta ejecutando el experimento',
      'El modo serial debe estar desactivado. Reinicie el arduino',
      'question'
    )
  }

  const testLib= async ( ipAddress )=>{    
  
    const response = await fetchWithoutToken(`${ ipAddress }read/status`);             
    const body = await response.json(); 

    console.log(body.status);

      if ( response.status  === 200 ) {      
    
        if (body.status === 0){
          setStatusLib(true);
        }else {
                setStatusLib(false);
                Swal.fire({
                  icon: 'error',
                  title: 'Libreria no encontrada',
                  text: 'Verifique Servidor, reinicie arduino'                      
                  });
              }
      }
      else  {
        setStatusLib(false);
        Swal.fire({
          icon: 'error',
          title: 'Libreria no encontrada',
          text: 'Verifique Servidor, reinicie arduino'                      
          });

      }
  
     
  
  }

  const helpSerial=()=>{
    Swal.fire(
      'El modo serial activo se usa para ejecutar el experimento sin conexion al cliente',
      'Desactive el modo serial. Puede tener problemas aleatorios de conectividad.',
      'question'
    )
  }

  const testSerial= async ( ipAddress )=>{    
  
    const response = await fetchWithoutToken(`${ ipAddress }read/serial_level`);             
    const body = await response.json(); 

    console.log(body.serial_level);

      if ( response.status  === 200 ) {      
    
        if (body.serial_level === 1){
          setSerialLib(true);
          Swal.fire({
            icon: 'warning',
            title: 'El modo serial esta activo',
            text: 'Desactivelo puede tener problemas de conectividad.'
          });
        
        }else {
          setSerialLib(false);
               
              }
      } else  {
        setSerialLib(true);
          Swal.fire({
            icon: 'warning',
            title: 'El modo serial pueder esta activo',
            text: 'Verifiquelo puede tener problemas de conectividad.'                     
            });

      }
  
     
  
  }

  const disableSerial= async ( ipAddress )=>{ 
    console.log('disableserial');    
    const data = {};
    
    const response = await fetchWithoutToken(`${ ipAddress }save/serial_level`,data,'PUT');             
    const body = await response.json(); 

    if(response.status === 200) {        
      console.log(body);
      Swal.fire('Por favor lea el modo serie');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
                             
        });
      console.log('Error'); 
    }   

}


  const ReadConfig= async ( ipAddress )=>{    
    console.log('leyendo');
    const response = await fetchWithoutToken(`${ ipAddress }read/all-cfg`);             
    const body = await response.json(); 
  
    if(response.status === 200) {            
  
        
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
     
  
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
                             
        });
      console.log('Error'); 
    }   
  
  }
  
  const WriteConfig= async ( ipAddress )=>{    
    console.log('escribiendo');
    
    const data = {  
  
      cfg0: memConfig[0].value,
      cfg1: memConfig[1].value,
      cfg2: memConfig[2].value,
      cfg3: memConfig[3].value,
      cfg4: memConfig[4].value,
      cfg5: memConfig[5].value,
      cfg6: memConfig[6].value,
      cfg7: memConfig[7].value,
      cfg8: memConfig[8].value,
      cfg9: memConfig[9].value
    
    }
    console.log(data);
    const response = await fetchWithoutToken(`${ ipAddress }save/all-cfg`,data,'PUT');             
    const body = await response.json(); 
  
    if(response.status === 200) {        
      console.log(body);
  
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
                             
        });
      console.log('Error'); 
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
            
           <Grid item  sm={4}>            
            
              <Box 
                  sx={{      
                    marginTop: 150,          
                    background: 'linear-gradient(180deg,#496cb2,#6390e9)',
                    borderRadius: 15,
                
                }}>
                  
                  <Typography
               align='center'
              >Memoria arduino: parametros de configuracion</Typography>

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
                  onClick={() => WriteConfig(ipAddress)}
                  >Grabar parametros </Button>

                  <Button
                  startIcon={<SendIcon />} 
                  onClick={() => ReadConfig(ipAddress)}
                 
                  >Leer parametros </Button>

                  
            </Box>  

              <Modal
                open={modalEdit}
                onClose={openClosemodalEdit}>
                {bodyEdit}
              </Modal>

            </Grid>    
            <Grid item  sm={1}>
              </Grid>
              <Grid item  sm={2}> 

              <Box 
                  sx={{      
                    marginTop: 150,          
                    background:'linear-gradient(180deg,#496cb2,#6390e9)',
                    borderRadius: 15,
                    height: 'auto'
                
                }}>
                  <Button
                  startIcon={<SendIcon />}
                  onClick={() => testServer(ipAddress)}
                  >Probar servidor </Button> 
                  
                    <Typography align='center' color="#FFFFFF" > <br></br>Conexion : {statusServer? (<>Ok</>) : (<><b>error</b></>)} </Typography>
                    <Button
                    startIcon={<HelpIcon />}
                    onClick={() => helpTestServer()}>
                    </Button> 
                  
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />

                  
                  <Button
                  startIcon={<SendIcon />}
                  onClick={() => testLib(ipAddress)}
                  >Probar Libreria </Button> 
                  
                    <Typography align='center' color="#FFFFFF" > <br></br>Conexion : {statusLib? (<>Ok</>) : (<><b>error</b></>)} </Typography>
                    <Button
                    startIcon={<HelpIcon />}
                    onClick={() => helpLib()}>
                    </Button> 
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />

                   
                  <Button
                  startIcon={<SendIcon />}
                  onClick={() => testSerial(ipAddress)}
                  >Leer MODO SERIE </Button>
                 

                  <Typography align='center' color="#FFFFFF" > <br></br>Modo Serie : {serialLib? (<>Activo</>) : (<>Desactivado</>)} </Typography>
                  <br></br>
                  <Button
                    startIcon={<HelpIcon />}
                    onClick={() => helpSerial()}>
                    </Button> 
                    <Button
                    startIcon={<DisabledByDefaultIcon />}
                    onClick={() => disableSerial(ipAddress)}>
                      Desactivar modo serie
                    </Button> 
                  
                <br></br>
                <br></br>
                
                               

                  
              </Box>

              
              </Grid>
              <Grid item  sm={1}>
              </Grid>

            <Grid item  sm={4}            > 
            </Grid> 
      </Grid>      
  
  
  )
}
