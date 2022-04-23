import React  from 'react'
import Typography from '@mui/material/Typography';
import {Box, Grid }  from '@material-ui/core';


export const About = () => {  

  return (
    <Grid container >
            
           <Grid item  sm={6}>            
            
              <Box 
                  sx={{      
                    marginTop: 150,          
                    background: 'linear-gradient(180deg,#496cb2,#2F00FF)',
                    borderRadius: 15               
                }}>
                  
                  <Typography
                  sx={{color: '#FFFFFF'}}                 
                  align='center'>
                 <br></br><b> Interfaz Cliente-Arduino para laboratorio remoto</b>
                 <br></br><br></br>
                 La intención del proyecto es suministrar una interfaz entre una página web <br></br> 
                 y una plataforma Arduino, que acepta los comandos para empezar y terminar el experimento,<br></br>
                 y almacena los valores de configuración en la memoria no volátil de la placa.<br></br>
                Los módulos principales de son tres: Cliente , Servidor  y librerías Arduino.
               
                <br></br>
                <b>Repositorio:</b><br></br>
                https://github.com/theinsideshine/frontend-remote-lab-lib 
                <br></br>
                https://github.com/theinsideshine/back-end-remote-lab-lib
                <br></br>
                https://github.com/theinsideshine/remote-lab-lib 
                <br></br>
                <b> Contactos:</b> <br></br> LC: leandro.cintioli@alumnos.udemm.edu.ar <br></br>
                                     PT: pablo.tavolaro@alumnos.udemm.edu.ar
                <br></br><br></br>

              </Typography>   
               
            </Box>             

            </Grid>    
            

      </Grid>      
  
  
  )
}
 