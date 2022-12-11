import React, {Component} from "react";
import '../../stylesheets/stylesModalStations.css';
import { useRef, useState, useEffect } from "react";
import React from 'react';
import Select from 'react-select';
import stg from '../../utils/stg';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
/* LIBERIA AXIOS */
import axios from "../../api/axios";
import ECMap from '../map/ECMap';

const STATIONS_URL = '/backendstations.php';


export default() =>{

    const method = 'readstationsmunicipi';
    const location = 'Barcelona';
    const [errorMessage, setErrorMessage] = useState('');
    const errorRef = useRef();
    const [success, setSuccess] = useState(false);
    var response = '';

    try {
        response = await axios.post(
            STATIONS_URL,
            JSON.stringify({ method: method, municipi: location }),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        console.log(response.data);

        if (response.data.readstationsmunicipi) {

            for (let i = 0; i < response.data[0].length; i++) {
                let lat = Number(parseFloat(response.data[0][i].latitud));
                let lng = Number(parseFloat(response.data[0][i].longitud));
                data.push(response.data[0][i]);

                coordenates.push({ lat: Number(parseFloat(lat)), lng: Number(parseFloat(lng)) });
                
            }
            setMarkers(coordenates)
            setStationsData(data);

        } else {
            console.log(response)
        }

    } catch (e) {

        /* CONTROL DE ERRORES DE RESPUESTA DEL SERVIDOR*/

        if (!e?.response) {
            console.log(e);
            setErrorMessage('Sin Respuesta del Servidor.');
        } else if (e.response?.status === 400) {
            setErrorMessage('400: No existen Usuario ni Password');
        } else if (e.response?.status === 401) {
            setErrorMessage('401: Sin Autorizacion');
        } else if (e.response?.status === 500) {
            setErrorMessage('500: Error de Servidor');
        } else {
            setErrorMessage('El Login ha fallado');
        }

        errorRef.current.focus();
    }
}






}