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
                    
                    borderRadius: 15,
                    
                
                }}>
                  
                  <Typography
                  sx={{color: '#496cb2'}}                  
                  align='center'>
                 <br></br><br></br><b> Interfaz FrontEnd-Arduino para laboratorio remoto</b>
                 <br></br><br></br>
             
                La intención de este proyecto  es suministrar una interfaz <br></br>
                 entre una página web y una plataforma arduino, para poder persistir<br></br>
                 en la memoria no volátil del arduino y manejar comandos para empezar <br></br> 
                 ,terminar el experimento.<br></br>
                Con el obejtivo de tener un herramienta para comuicarse via web<br></br>
                 y que el usuario se enfoque en el desarrollo del experimento con arduino.
                <br></br><br></br>
                <b>Repositorio:</b><br></br>
                https://github.com/theinsideshine/frontend-remote-lab-lib 
                <br></br><br></br>
                <b> Contactos:</b> <br></br> LC: leandro.cintioli@alumnos.udemm.edu.ar <br></br>
                                     PT: pablo.tavolaro@alumnos.udemm.edu.ar
                <br></br><br></br>

              </Typography>   
               
            </Box>             

            </Grid>    
            

      </Grid>      
  
  
  )
}
