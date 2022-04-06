import React from 'react';

import Paper from '@mui/material/Paper';

import Footer from '../../components/UI/Footer';
import Header from '../../components/UI/Header';
import ImagePattern from '../../images/fondo.jpg';

import { Advanced } from '../../components/advanced/Advanced';

export const AdvancedScreen = () => { 

  return (
    <Paper style={{ backgroundImage: `url(${ImagePattern})`}}>
        <Header/>
          <Advanced/>
        <Footer/>
    </Paper>
  )
};





 