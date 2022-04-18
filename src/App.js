import * as React from 'react';

import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';


import { createTheme, ThemeProvider } from '@material-ui/core/styles';

import {ExperimentScreen} from './screen/app/ExperimentScreen';
import {AdvancedScreen} from './screen/app/AdvancedScreen';
import {AboutScreen} from './screen/app/AboutScreen';



const  theme = createTheme ({
      palette: {
            primary: {
                  main: '#FFFFFF'
            },
            text:{
                  primary: "#000000",
                  secondary: "#FFFFFF"
                } 
            
      },
      typography: {
            fontFamily: ['"Roboto"', 'sans-serif'].join(',')
           }
})


export default function App() {
  return(
      <ThemeProvider theme={theme}>
             <Router>     
            <Switch>
                        <Route exact path="/" component={ ExperimentScreen }/>
                        <Route exact path="/avanzado" component={AdvancedScreen}/>
                        <Route exact path="/about" component={AboutScreen}/>
                       
            </Switch>
            </Router>
      </ThemeProvider> 
       )
  }
