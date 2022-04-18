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
        {'Proyecto:'}
        <Link color="inherit" href="https://github.com/theinsideshine/frontend-remote-lab-lib">
          RemoteLab-Lib
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