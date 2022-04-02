import React,{ useState } from 'react';

import Typography from '@mui/material/Typography';

import  Swal from 'sweetalert2';


import {makeStyles} from '@material-ui/core/styles';
import {Box, Grid ,Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField}  from '@material-ui/core';
import {Edit } from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {  memNameInput } from './MemoryName.js'
import { fetchWithoutToken } from '../../helpers/fetch';
import SendIcon from "@material-ui/icons/Send";



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
  }
 
}));
  



const Experiment = () => {



  const styles= useStyles();  
  const [modalEdit, setmodalEdit]=useState(false);
  const [memInputs, setMemInputs]= useState([]);   
  const [ ipAddress, setIpAddress] = useState('http://192.168.0.103:4000/'); 
  const [ statusLib, setStatusLib ]= useState(false);
  const [ versionLib, setVersionLib ]= useState(false);
        
  const [selectConsole, setSelectConsole]=useState({
      uid: 0,
      name: '',
      key: '',
      value: ''
  })

  const WriteInputs= async ( ipAddress )=>{    
    console.log('escribiendo');
    
    const data = {  

      input0: memInputs[0].value,
      input1: memInputs[1].value,
      input2: memInputs[2].value,
      input3: memInputs[3].value,
      input4: memInputs[4].value
    
    }
    console.log(data);
    const response = await fetchWithoutToken(`${ ipAddress }save/all-input`,data,'PUT');             
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

  const ReadInputs= async ( ipAddress )=>{    
    console.log('leyendo');
    const response = await fetchWithoutToken(`${ ipAddress }read/all-input`);             
    const body = await response.json(); 

    if(response.status === 200) {            

        
    
      setMemInputs([
        {
        uid:   0,
        name: memNameInput.input0,
        key:   'input0',
        value: body.input0
       },
       {
        uid:   1,
        name: memNameInput.input1,
        key:   'input1',
        value: body.input1
       },
       {
        uid:   2,
        name: memNameInput.input2,
        key:   'input2',
        value: body.input2
       },
       {
        uid:   3,
        name: memNameInput.input3,
        key:   'input3',
        value: body.input3
       },
       {
        uid:   4,
        name: memNameInput.input4,
        key:   'input4',
        value: body.input4
       },

      ])      
     

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
                             
        });
      console.log('Error'); 
    }   

}


const startExperiment= async ( ipAddress )=>{   
  setStatusLib(true); 
  
  const response = await fetchWithoutToken(`${ ipAddress }cmd/start`,0,'PUT');             
  const body = await response.json(); 

  if(response.status === 200) {            

      console.log(body);
        
      setStatusLib(false); 

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
                           
      });
    console.log('Error'); 
  }   

}

const readVersion= async ( ipAddress )=>{    
  
  const response = await fetchWithoutToken(`${ ipAddress }read/version`);             
  const body = await response.json(); 

  if(response.status === 200) {            

      console.log(body);
      setVersionLib(body.version);
   

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
                           
      });
    console.log('Error'); 
  }   

}



 
  

  const handleChange=e=>{
    const {name, value}=e.target;
   
    setSelectConsole(prevState=>({
      ...prevState,
      [name]: value
    }))
    
  }

  const petitionPut= (selectConsole)=>{   
   

    const newInput= memInputs.map( (memInput)=> {
      if (memInput.uid === selectConsole.uid){
        return {
          ...memInput,
          value: selectConsole.value
        }
      }
      return memInput;
    });

    setMemInputs(newInput);
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
              >Memoria arduino: parametros de entrada</Typography>

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
                          memInputs.map(( console )=>(
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
                  onClick={() => WriteInputs(ipAddress)}
                  >Grabar parametros </Button>

                  <Button
                  startIcon={<SendIcon />} 
                  onClick={() => ReadInputs(ipAddress)}
                 
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
                  onClick={() => startExperiment(ipAddress)}
                  >Empezar experimento </Button>   
                  <Typography align='center' > <br></br>Estado : {statusLib? (<>En ejecucion</>) : (<>Detenido</>)} </Typography>
                  <br></br>

                  <Button
                  startIcon={<SendIcon />}
                  onClick={() => readVersion(ipAddress)}
                  >Leer version </Button> 
                  <Typography align='center' > <br></br>Version : {versionLib} </Typography>
                  <br></br>

                  
              </Box>
              <TextField
                      id="ipAddress"
                      fullWidth
                      label="Ip del servidor"                                            
                      value={ ipAddress }
                      onChange={(e) => setIpAddress(e.target.value)}
                   />
              </Grid>
              <Grid item  sm={1}>
              </Grid>


              <Grid item  sm={4}> 


              </Grid>
    
              
              
          </Grid>
        
        
  );    
}

export default Experiment;

