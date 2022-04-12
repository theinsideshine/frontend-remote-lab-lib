// Lee por el puerto serie parametros de memoryuracion en formato json.
// {read:'all-params'}        Envia todos los parametros en formato json.
// {read:'all-input'}         Envia todos los parametros de entrada.
// {read:'all-output'}        Envia todos los parametros de salida.
// {read:'all-cfg'}           Envia todos los parametros de configuracion
// {read:'all-lib'}           Envia todos los parametros de configuracion de remoteLabLib
// {read:'all-result'}         Envia todos los parametros de resultados
 
// {read:'version'}           Envia  la version del firmware.
// {read:'status'}            Devuelve el estatus del ensayo.

// {read:'serial_level'}         Nivel de serialeo por puerto serie.


// {serial_level:'0'}       serial_level:0=desactivado,
// {serial_level:'1'}                 1=mensajes.
// {serial_level:'2'}                 2=info control estandar.
// {serial_level:'3'}                 3=info control arduino plotter.

// {cmd:'start'}       Comienza el ensayo.



 //   {cdd:'start',data:{distance:'20',force:'306'}} 

// {input0:'250.2',input1:'250.3',input2:'250.4',input3:'250.5',input4:'250.6'}
// {input0:'250'}       input0       parametro de entrada tipo float 
// {inputx:'250'}       inputx       

// {output0:'250'}      output0       parametro de salida tipo float 
// {outputx:'250'}      outputx  

// {cfg0:'250'}      cfg0       parametro de configuracion tipo float 
// {cfgx:'250'}      cfgx 



// {result0:'70.123'}      result0      parametro float
// {resultx:'70.123'}      resultx      p

// {st_test:'1'}         st_test       0 ensayo desactivado. 
//                       st_test       1 ensayo activado. 
// {st_mode:'0'}         st_mode       
//                                   
