import React from 'react'
import ReactExport from "react-export-excel";

import {Box, Grid }  from '@material-ui/core';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
      result: 70.235 
     },
     {
      result: 71.235 
     },
     {
      result: 72.235 
     },
     {
      result: 73.235 
     },
     {
      result: 74.235 
     }
    
];


export const Advanced = () => {
  return (
    <Grid container >
            
            <Grid item  sm={4}>            
            
              <Box 
                  sx={{      
                    marginTop: 150,          
                    background: 'linear-gradient(180deg,#496cb2,#6390e9)',
                    borderRadius: 15,
                
                }}>
                  <ExcelFile element={<button>Download Data</button>}>
                    <ExcelSheet data={dataSet1} name="Employees">
                    <ExcelColumn label="Result" value="result"/>
                  </ExcelSheet>
               
            </ExcelFile>

              </Box>
            </Grid>      
    </Grid>        
  )
}
