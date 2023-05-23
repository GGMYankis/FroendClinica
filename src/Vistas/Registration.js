import React, { Fragment, useState } from 'react';
import axios from 'axios';
//import logo from "./imagenes/Login-rafiki.png"

function Registration() {

    const [names, setNames] = useState('');
    const [email, setEmail] = useState('');
    const [key, setKey] = useState('');


    const handleNameChange = (value) => {
        setNames(value);
    }

    const handlePhoneNoChange = (value) => {
        setEmail(value);
    }


    const handleAddressChange = (value) => {
        setKey(value);
    }




    const handleSave = () => {

        const data = {

            Names: names,
            Email: email,
            Key: key

        };

        const url = 'https://localhost:44328/api/Test/Registration';
        axios.post(url, data).then((result) => {

            alert(result.data)
        }).catch((error) => {
            alert(error)
        })

    }


    return (

        <Fragment>
      <div className='cont-login'>

                <div className='logo'>Registration</div>

                <input type="text" id="txtName" className='login-input' placeholder='Nombre' onChange={(e) => handleNameChange(e.target.value)} riquery />

                <input type="email" id="txtPhoneNo" className='login-input' placeholder='Correo' onChange={(e) => handlePhoneNoChange(e.target.value)} riquery />

                <input type="text" id="txtAddress" className='login-input' placeholder='Clave' onChange={(e) => handleAddressChange(e.target.value)} riquery/>

                <button className='btn-login' onClick={() => handleSave()}>Guardar</button>
            </div>  

            
       
        </Fragment>

    )

}

export default Registration;


