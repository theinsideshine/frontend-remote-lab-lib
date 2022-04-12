import React,{ useEffect, useState } from 'react';

import Typography from '@mui/material/Typography';

import  Swal from 'sweetalert2';


import {makeStyles} from '@material-ui/core/styles';
import {Box, Grid ,Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField}  from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {  memNameInputs, memNameOutputs } from './MemoryName.js'
import { fetchWithoutToken } from '../../helpers/fetch';
import SendIcon from "@material-ui/icons/Send";
import { Divider } from '@mui/material';

import ReactExport from "react-export-excel";




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



const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;





const Experiment = () => {

  

 

  const styles= useStyles();  
  const [modalEdit, setmodalEdit]=useState(false);
  const [memInputs, setMemInputs]= useState([]);   
  const [memOutputs, setMemOutputs]= useState([]); 
  const [ ipAddress, setIpAddress] = useState('http://192.168.0.103:4000/'); 
  const [ statusLib, setStatusLib ]= useState(false);
  const [ versionLib, setVersionLib ]= useState(false);
  const [ dataSet1, setDataSet1 ] = useState([]);
  const [selectConsole, setSelectConsole]=useState({
      uid: 0,
      name: '',
      key: '',
      value: ''
  })

  useEffect(() => {
    
    localStorage.setItem('ipAdrress',ipAddress  );
  },[ipAddress]);


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



const readResult= async ( ipAddress )=>{    
  console.log('leyendo');
  const response = await fetchWithoutToken(`${ ipAddress }read/all-result`);             
  const body = await response.json(); 

  if(response.status === 200) {   
    
   
    console.log(body); 

    setDataSet1( [

      {result: body.result_0},{result: body.result_1},{result: body.result_2},{result: body.result_3},{result: body.result_4},
      {result: body.result_5},{result: body.result_6},{result: body.result_7},{result: body.result_8},{result: body.result_9},

      {result: body.result_10},{result: body.result_11},{result: body.result_12},{result: body.result_13},{result: body.result_14},
      {result: body.result_15},{result: body.result_16},{result: body.result_17},{result: body.result_18},{result: body.result_19},

      {result: body.result_20},{result: body.result_21},{result: body.result_22},{result: body.result_23},{result: body.result_24},
      {result: body.result_25},{result: body.result_26},{result: body.result_27},{result: body.result_28},{result: body.result_29},

      {result: body.result_30},{result: body.result_31},{result: body.result_32},{result: body.result_33},{result: body.result_34},
      {result: body.result_35},{result: body.result_36},{result: body.result_37},{result: body.result_38},{result: body.result_39},

      {result: body.result_40},{result: body.result_41},{result: body.result_42},{result: body.result_43},{result: body.result_44},
      {result: body.result_45},{result: body.result_46},{result: body.result_47},{result: body.result_48},{result: body.result_49},
      
    ]);

    console.log(dataSet1); 
    
   

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
                           
      });
    console.log('Error'); 
  }   
}


const ReadOutputs= async ( ipAddress )=>{    
  console.log('leyendo');
  const response = await fetchWithoutToken(`${ ipAddress }read/all-output`);             
  const body = await response.json(); 

  if(response.status === 200) {            

      
    console.log(body);
    setMemOutputs([
      {
      uid:   0,
      name: memNameOutputs.output0,
      key:   'output0',
      value: body.output0
     },
     {
      uid:   1,
      name: memNameOutputs.output1,
      key:   'output1',
      value: body.output1
     },
     {
      uid:   2,
      name: memNameOutputs.output2,
      key:   'output2',
      value: body.output2
     },
     {
      uid:   3,
      name: memNameOutputs.output3,
      key:   'output3',
      value: body.output3
     },
     {
      uid:   4,
      name: memNameOutputs.output4,
      key:   'output4',
      value: body.output4
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




  const ReadInputs= async ( ipAddress )=>{    
    console.log('leyendo');
    const response = await fetchWithoutToken(`${ ipAddress }read/all-input`);             
    const body = await response.json(); 

    if(response.status === 200) {            

        
    
      setMemInputs([
        {
        uid:   0,
        name: memNameInputs.input0,
        key:   'input0',
        value: body.input0
       },
       {
        uid:   1,
        name: memNameInputs.input1,
        key:   'input1',
        value: body.input1
       },
       {
        uid:   2,
        name: memNameInputs.input2,
        key:   'input2',
        value: body.input2
       },
       {
        uid:   3,
        name: memNameInputs.input3,
        key:   'input3',
        value: body.input3
       },
       {
        uid:   4,
        name: memNameInputs.input4,
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
                  <Typography align='center' color="#FFFFFF" > Estado : {statusLib? (<>En ejecucion</>) : (<>Detenido</>)} </Typography>
                  
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />

                  <Button
                  startIcon={<SendIcon />}
                  onClick={() => readVersion(ipAddress)}
                  >Leer version </Button> 
                  <Typography align='center' color="#FFFFFF" > Version : {versionLib} </Typography>
                  
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />
                  <Button
                  startIcon={<SendIcon />}
                  onClick={() => readResult(ipAddress)}
                  >Leer resultados </Button>
                  <ExcelFile element={<button>Bajar resultados</button>}>
                    <ExcelSheet data={dataSet1} name="resultados">
                    <ExcelColumn label="Resultados" value="result"/>
                  </ExcelSheet>
               
            </ExcelFile> 
            <br></br>
            <br></br>
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />
            <TextField
                      id="ipAddress"
                      fullWidth
                      label="Ip del servidor"                                            
                      value={ ipAddress }
                      onChange={(e) => setIpAddress(e.target.value)}
                   />
                <br></br>
                <br></br>
                
                               

                  
              </Box>

              
              </Grid>
              <Grid item  sm={1}>
              </Grid>


              <Grid item  sm={4}> 

              <Box 
                  sx={{      
                    marginTop: 150,          
                    background: 'linear-gradient(180deg,#496cb2,#6390e9)',
                    borderRadius: 15,
                
                }}>        

              <Typography
               align='center'
              >Memoria arduino: parametros de salida</Typography>

                <TableContainer >
                  <Table className={styles.table}>
                      <TableHead >
                          <TableRow  >
                            <StyledTableCell>Nombre_ref</StyledTableCell>
                            <StyledTableCell>Clave_arduino</StyledTableCell>
                            <StyledTableCell>Valor</StyledTableCell>                                                     
                          </TableRow>
                      </TableHead>

                      <TableBody>
                           
                          {
                          memOutputs.map(( console )=>(
                              <TableRow key={console.uid}>
                                  <TableCell className={styles.narrowCell}>{console.name}</TableCell>
                                  <TableCell className={styles.narrowCell}>{console.key}</TableCell>
                                  <TableCell className={styles.narrowCell}>{console.value}</TableCell>                                 
                                  
                              </TableRow>
                          ))}
                      </TableBody>
                  </Table>
              </TableContainer> 

            

                  <Button
                  startIcon={<SendIcon />} 
                  onClick={() => ReadOutputs(ipAddress)}
                 
                  >Leer parametros </Button>

                  
            </Box>  


              </Grid>
    
              
              
          </Grid>
        
        
  );    
}

export default Experiment;

