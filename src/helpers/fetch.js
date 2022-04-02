

const fetchWithoutToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ endpoint }`;

    if ( method === 'GET' ) {
        return fetch( url );
    } else {
        return fetch( url, {
            
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify( data )
        });
    }
    
}


const fetchWithToken = ( endpoint, data, method = 'GET' ) => {

    const url = `${ endpoint }`;
    const token = localStorage.getItem('token') || '';
 
    

    if ( method === 'GET' ) {
        return fetch( url, {
            method,
            headers: {
                'Authorization':  token,
            }
        });
    } else {
        return fetch( url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'Authorization':  token,
            },
            body: JSON.stringify( data )
        });
    }
}



export {
    fetchWithoutToken,
    fetchWithToken,
   
}

