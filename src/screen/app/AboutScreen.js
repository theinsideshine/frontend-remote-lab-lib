import React from 'react';

import Paper from '@mui/material/Paper';
import Footer from '../../components/UI/Footer';
import Header from '../../components/UI/Header';


import ImagePattern from '../../images/fondo.jpg';
import { About } from '../../components/about/About';



export const AboutScreen = () => {
  
  return (
    <Paper style={{ backgroundImage: `url(${ImagePattern})`}}>  
          <Header/>
              <About/>  
          <Footer/>      
    </Paper>
  )

};

