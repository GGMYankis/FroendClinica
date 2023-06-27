import React from 'react'
import {Link} from "react-router-dom";

function ErrorPage() {
  return (
    <>

        <div className='pageErro'> 
                     <h1>No podemos encontrar la página que estás buscando.</h1>    
                     <p className='Comen-Error'>Asegúrese de escribir bien la ruta.</p>
                    <Link to="/">Volver a Énfasis</Link>
        </div>
      
    </>
  )
}

export default ErrorPage

