import React,{ useEffect , useState}  from 'react'
import {Box, Grid }  from '@material-ui/core';
import Typography from '@mui/material/Typography';


export const Advanced = () => {

  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    
    setIpAddress( localStorage.getItem('ipAdrress'));
  },[ipAddress]);


  return (
    <Grid container >
            
            <Grid item  sm={4}>            
            
              <Box 
                  sx={{      
                    marginTop: 150,          
                    background: 'linear-gradient(180deg,#496cb2,#6390e9)',
                    borderRadius: 15,
                
                }}>
                  
                  <Typography align='center' color="#FFFFFF" > <br></br>ip : {ipAddress} </Typography>

              </Box>
            </Grid>      
    </Grid>        
  )
}
