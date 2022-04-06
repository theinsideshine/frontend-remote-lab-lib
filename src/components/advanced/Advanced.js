import React,{ useEffect , useState}  from 'react'
import Typography from '@mui/material/Typography';

import {Box, Grid ,Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField}  from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {makeStyles} from '@material-ui/core/styles';
import SendIcon from "@material-ui/icons/Send";
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
  const [ versionLib, setVersionLib ] = useState('');
  const [ statusLib, setStatusLib ] = useState('');
  const [ modeLib, setModeLib ] = useState('');
  const [ serialLib, setSerialLib ] = useState('');
  const [ selectConsole, setSelectConsole ]=useState({
    uid: 0,
    name: '',
    key: '',
    value: ''
})

  const [ipAddress, setIpAddress] = useState('');

  const ReadLib= async ( ipAddress )=>{    
    console.log('leyendo');
    const response = await fetchWithoutToken(`${ ipAddress }read/all-lib`);             
    const body = await response.json(); 
  
    if(response.status === 200) {            
  
        
      console.log(body);
      
     setSerialLib(body.serial_level);
     setModeLib(body.st_mode);
     setStatusLib(body.status);
     setVersionLib(body.version);
  

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
                  onClick={() => ReadLib(ipAddress)}
                  >Leer remote-lab-lib </Button>   
                  <Typography align='center' color="#FFFFFF" > <br></br>Estado : {statusLib? (<>En ejecucion</>) : (<>Detenido</>)} </Typography>
                  <br></br>
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />

                  
                  <Typography align='center' color="#FFFFFF" > <br></br>Version : {versionLib} </Typography>
                  <br></br>
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />

                  <Typography align='center' color="#FFFFFF" > <br></br>Modo : {modeLib} </Typography>
                  <br></br>
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />

                  <Typography align='center' color="#FFFFFF" > <br></br>Serie : {serialLib? (<>Activo</>) : (<>Desactivado</>)} </Typography>
                  <br></br>
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />
                  
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
