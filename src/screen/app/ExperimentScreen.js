import React from 'react';

import Paper from '@mui/material/Paper';
import Footer from '../../components/UI/Footer';
import Header from '../../components/UI/Header';


import ImagePattern from '../../images/fondo.jpg';
import Experiment from '../../components/experiment/Experiment';

export const ExperimentScreen = () => {
  
  return (
    <Paper style={{ backgroundImage: `url(${ImagePattern})`}}>  
          <Header/>
              <Experiment/>  
          <Footer/>      
    </Paper>
  )

};

