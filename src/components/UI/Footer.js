import * as React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import { ver } from '../../version';

export const Copyright=() => {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        {'Copyright © '}
        <Link color="inherit" href="http://remotelab.com.ar/">
          RemoteLab
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  export const Footer=() => {
    return (
            <Box>        
              <Copyright /> 
              {ver}       
            </Box>  
          );
        }   

    export default Footer;