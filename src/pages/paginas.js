

import './admin.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';
import logo from "../imagenes/IMG-20230221-WA0009.png"
import Login from '../Vistas/Login';
import Select from 'react-select';
import Autosugges from 'react-autosuggest';
import { FaBars } from 'react-icons/fa'



export const Landing = ({user}) => {

    console.log("hombre")
    console.log(user)
    return (

      
        <h1>{user}</h1>

    )


}



const data = [

    { pais: "RD", presidente: "Abinader" },
    { pais: "Mexico", presidente: "Leonel" },
    { pais: "Brasil", presidente: "Danilo" },

];

export const PerfilAdmin = (user) => {

    const [presidentes, setPresidentes] = useState(data);
    const [value, setValue] = useState("");
    const [presidentesSeleccionado, setPresidentesSeleccionado] = useState({});


    const onSuggestionsFetchRequested = ({ value }) => {
        setPresidentes(filtrarPresidente(value))

    }

    const filtrarPresidente = (value) => {

        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        var filtrado = data.filter((presidente) => {
            var textoCompleto = presidente.presidente + " - " + presidente.pais;

            if (textoCompleto.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .includes(inputValue)) {
                return presidente;
            }

        });

        return inputLength === 0 ? [] : filtrado;
    }


    const onSuggestionsClearRequested = () => {
        setPresidentes([]);
    }

    const getSuggestionValue = (suggestions) => {

        return `${suggestions.presidente} - ${suggestions.pais} `;

    }

    const renderSuggestion = (suggestions) => {

        <div className='sugerencia' onClick={() => seleccionarPresidente(suggestions)}>
            {`${suggestions.presidente} - ${suggestions.pais} `}
        </div>

    }



    const seleccionarPresidente = (presidente) => {

        setPresidentesSeleccionado(presidente);

    }

    console.log(user)
    return (


        <div>
            <h1>hola perfil</h1>
            
            <div>{user.names}</div>
            {/* <Autosugges
                suggestions={presidentes}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
            //inputProps={}

            /> */}


        </div>




    )
}








// ------------------------------>








