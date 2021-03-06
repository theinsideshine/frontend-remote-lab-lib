import React,{ useEffect, useState, forwardRef } from 'react';

import Typography from '@mui/material/Typography';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import  Swal from 'sweetalert2';


import {makeStyles} from '@material-ui/core/styles';
import {Box, Grid ,Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField}  from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import {  memNameInputs, memNameOutputs, strConection } from './MemoryName.js'
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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});




const Experiment = () => { 

  const [msjSnackBar, setmsjSnackBar] = useState('');
  const [openSnackBarSuccess, setopenSnackBarSuccess] = useState(false);
  const handleCloseSnackBarSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setopenSnackBarSuccess(false);
  };

  const styles= useStyles();  
  const [modalEdit, setmodalEdit]=useState(false);
  const [memInputs, setMemInputs]= useState([]);   
  const [memOutputs, setMemOutputs]= useState([]); 
  const [ ipAddress, setIpAddress] = useState(strConection); 
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
    console.log('Escribiendo entradas');
    console.log(memInputs);
    if (memInputs.length===0){
      Swal.fire({  icon: 'error', title: 'Parametros de entradas vacios'});
      return;
    }

   
    const data = {  

      input0: memInputs[0].value,
      input1: memInputs[1].value,
      input2: memInputs[2].value,
      input3: memInputs[3].value,
      input4: memInputs[4].value
      }

    try {          const response = await fetchWithoutToken(`${ ipAddress }save/all-input`,data,'PUT');   
      
                    if(!response.ok){
                      throw Swal.fire({  icon: 'error', title: 'Error Servidor'});
                    }
    
                                      
                              
                    const body = await response.json(); 

                     if (body.result ==='ok'){       
                      console.log(body);
                      setmsjSnackBar('Entradas guardadas!');
                      setopenSnackBarSuccess(true);
                      //Swal.fire({  icon: 'success', title: 'Entradas guardadas'});

                    }else  {
                      Swal.fire({  icon: 'error', title: 'Error Libreria'});
                      console.log('Error Libreria'); 
                    }   
        
            } catch (err) {
            console.log(err);
            } 

}

                



const readResult= async ( ipAddress )=>{    
  console.log('leyendo resultados');
  try {
          const response = await fetchWithoutToken(`${ ipAddress }read/all-result`);  
          
          if(!response.ok){
            throw Swal.fire({  icon: 'error', title: 'Error Servidor'});
          }
 
 
          const body = await response.json(); 

          console.log(body);
          if (body.read ==='all-result'){  

          setDataSet1( [

          {result: body.result0},{result: body.result1},{result: body.result2},{result: body.result3},{result: body.result4},
          {result: body.result5},{result: body.result6},{result: body.result7},{result: body.result8},{result: body.result9},

          {result: body.result10},{result: body.result11},{result: body.result12},{result: body.result13},{result: body.result14},
          {result: body.result15},{result: body.result16},{result: body.result17},{result: body.result18},{result: body.result19},

          {result: body.result20},{result: body.result21},{result: body.result22},{result: body.result23},{result: body.result24},
          {result: body.result25},{result: body.result26},{result: body.result27},{result: body.result28},{result: body.result29},

          {result: body.result30},{result: body.result31},{result: body.result32},{result: body.result33},{result: body.result34},
          {result: body.result35},{result: body.result36},{result: body.result37},{result: body.result38},{result: body.result39},

          {result: body.result40},{result: body.result41},{result: body.result42},{result: body.result43},{result: body.result44},
          {result: body.result45},{result: body.result46},{result: body.result47},{result: body.result48},{result: body.result49},
          
        ]);          

        setmsjSnackBar('Resultados leidos!');
        setopenSnackBarSuccess(true);
        //Swal.fire({  icon: 'success', title: 'Resultados leidos'});  
   

        }else  {
          Swal.fire({  icon: 'error', title: 'Error Libreria'});
          console.log('Error Libreria'); 
        }   
} catch (err) {
  console.log(err);
 }   
}


const ReadOutputs= async ( ipAddress )=>{    
  console.log('leyendo outputs');
  try {
        const response = await fetchWithoutToken(`${ ipAddress }read/all-output`);             
 
        if(!response.ok){
          throw Swal.fire({  icon: 'error', title: 'Error Servidor'});
        } 
 
        const body = await response.json(); 

        console.log(body);
        if (body.read ==='all-output'){       
   
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
            setmsjSnackBar('Salidas leidas!');
            setopenSnackBarSuccess(true);
            //Swal.fire({  icon: 'success', title: 'Salidas leidas'});
          }else  {
            Swal.fire({  icon: 'error', title: 'Error Libreria'});
            console.log('Error Libreria'); 
          }   
        } catch (err) {
          console.log(err);
         }     

}




  const ReadInputs= async ( ipAddress )=>{    
    console.log('leyendo entradas');
    try {      
                const response = await fetchWithoutToken(`${ ipAddress }read/all-input`);                             

                if(!response.ok){
                  throw Swal.fire({  icon: 'error', title: 'Error Servidor'});
                }    
                          const body = await response.json(); 
                          console.log(body);
                          if (body.read ==='all-input'){

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
                            setmsjSnackBar('Entradas leidas!');
                            setopenSnackBarSuccess(true);
                           // Swal.fire({  icon: 'success', title: 'Entradas leidas'});

                          }else  {
                          Swal.fire({  icon: 'error', title: 'Error Libreria'});
                          console.log('Error Libreria'); 
                        }   
            
   } catch (err) {
    console.log(err);
   } 

}


const startExperiment= async ( ipAddress )=>{   
  setStatusLib(true); 
  console.log('Empezando experimento.')
  try { 
            const response = await fetchWithoutToken(`${ ipAddress }cmd/start`);   
            if(!response.ok){
              throw Swal.fire({  icon: 'error', title: 'Error Servidor'});
            }   
            
            const body = await response.json(); 

            console.log(body);
            if (body.st_test === 0){ 
            setStatusLib(false); 
            setmsjSnackBar('Experimento ejecutado!');
            setopenSnackBarSuccess(true);
            //Swal.fire({  icon: 'success', title: 'Experimento ejecutado'});

        } else  {
          Swal.fire({  icon: 'error', title: 'Error Libreria'});
          console.log('Error Libreria'); 
        }   

      } catch (err) {
      console.log(err);
      } 

}

const readVersion= async ( ipAddress )=>{ 
  console.log('Leyendo version')
  try {  
  
        const response = await fetchWithoutToken(`${ ipAddress }read/version`);  
        if(!response.ok){
          throw Swal.fire({  icon: 'error', title: 'Error Servidor'});
        }            

        const body = await response.json(); 
       

        if (body.read === 'version'){            

      console.log(body);
      setVersionLib(body.version);
      setmsjSnackBar('Version leida!');
      setopenSnackBarSuccess(true);
      //Swal.fire({  icon: 'success', title: 'Version leida'});   

      } 
        else  {
          Swal.fire({  icon: 'error', title: 'Error Libreria'});
          console.log('Error Libreria'); 
        }   

    } catch (err) {
    console.log(err);
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
            
            <Grid item xs={12} sm={4}>              
              <Box 
                  sx={{      
                    marginTop: 150,          
                    background: 'linear-gradient(180deg,#496cb2,#6390e9)',
                    borderRadius: 15                
                }}>        

              <Typography align='center'>
                Memoria arduino: parametros de entrada</Typography>

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
                  disabled = {statusLib}
                  >Grabar parametros </Button>

                  <Button
                  startIcon={<SendIcon />} 
                  onClick={() => ReadInputs(ipAddress)}  
                  disabled = {statusLib}               
                  >Leer parametros </Button>

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
                  onClick={() => startExperiment(ipAddress)}
                  disabled = {statusLib}>
                  Empezar experimento </Button>   
                  <Typography align='center' color="#FFFFFF"> 
                  Estado : {statusLib? (<>En ejecucion</>) : (<>Detenido</>)} </Typography>
                  
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />

                  <Button
                  startIcon={<SendIcon />}
                  onClick={() => readVersion(ipAddress)}
                  disabled = {statusLib}
                  >Leer version </Button> 
                  <Typography align='center' color="#FFFFFF">
                   Version : {versionLib} </Typography>
                  
                  <Divider sx={{ bgcolor: "#FFFFFF" }} />
                  
                  <Button
                  startIcon={<SendIcon />}
                  onClick={() => readResult(ipAddress)}
                  disabled = {statusLib}
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
                      disabled = {statusLib}
                      id="ipAddress"
                      fullWidth
                      label="Ip del servidor"                                            
                      value={ ipAddress }
                      onChange={(e) => setIpAddress(e.target.value)}/>
                <br></br>
                <br></br>            
              </Box>              
            </Grid>

            <Grid item xs={1} sm={1}>
            </Grid>

            <Grid item  xs={12} sm={4}> 

              <Box 
                  sx={{      
                    marginTop: 150,          
                    background: 'linear-gradient(180deg,#496cb2,#6390e9)',
                    borderRadius: 15                
                }}>        

              <Typography align='center'>
              Memoria arduino: parametros de salida</Typography>

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
              disabled = {statusLib}>
              Leer parametros </Button>

            </Box>  
          </Grid>

          <Snackbar open={openSnackBarSuccess} autoHideDuration={3000} onClose={handleCloseSnackBarSuccess}>
                  <Alert onClose={handleCloseSnackBarSuccess} severity="success" sx={{ width: '100%' }}>
                  {msjSnackBar}
                  </Alert>
            </Snackbar>           

        </Grid>
         
  );    
}

export default Experiment;

