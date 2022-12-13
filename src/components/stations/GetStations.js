import '../../stylesheets/stylesModalStations.css';
import { useRef, useState, useEffect, render } from "react";
import React from 'react';
import Select from 'react-select';
import stg from '../../utils/stg';
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
/* LIBERIA AXIOS */
import axios from "../../api/axios";
import GetMunicipis from "../stations/GetMunicipis";
import ECMap from '../map/ECMap';
import GetProvincias from './GetProvincias';



const STATIONS_URL = '/backendstations.php';

export const GetStations = ({ id, closeModal, setMarkers, markers, stationsData, setStationsData }) => {
    const method = 'readstations';

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState([]);

    var response = '';
    var coordenates = [];

//Al cargar el componente automáticamente hace la consulta
    useEffect(() => { getStationsResponse(); }, [])

    const getStationsResponse = async (e) => {
       
        try {

            //setLocation(this.location);
            response = await axios.post(
                STATIONS_URL,
                JSON.stringify({ method: method }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: false
                }
            )

            if (response.data.readstations) {

                for (let i = 0; i < response.data[0].length; i++) {
                    let lat = Number(parseFloat(response.data[0][i].latitud));
                    let lng = Number(parseFloat(response.data[0][i].longitud));
                    data.push(response.data[0][i]);

                    coordenates.push({ lat: lat, lng: lng });

                }
                setMarkers(coordenates)
                setStationsData(data);

            } else {
                console.log('error' + response)
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

        }
    }

    return (
        <>
            {success ? (
                <section>
                    <br></br><br></br>
                    <h2>Estaciones obtenidas satisfactoriamente</h2>
                    <br></br><br></br><br></br><br></br><br></br><br></br>
                </section>
            ) : (
                <section className="section-signin">

                    {/*FORMULARIO */}
                    <h2 id={id}>Obtener estaciones</h2>
                    <br></br>
                    <br></br>

                    <GetProvincias id={id} stationsData={stationsData} setStationsData={setStationsData} setMarkers={setMarkers} markers={markers}></GetProvincias>
                    <br></br>
                    <GetMunicipis id={id} stationsData={stationsData} setStationsData={setStationsData} setMarkers={setMarkers} markers={markers}  ></GetMunicipis>
                    <br></br>

                    <span>
                        <br />
                    </span>
                    <h2 id={id}>Para ver todos los puntos de recarga de Catalunya, pulsa Recargar</h2>

                    <button
                        className="btn-signout-accept"

                        onClick={getStationsResponse} >
                        Recargar
                    </button>
                    <button
                        className="btn-signout-cancel"
                        onClick={() => { closeModal(false); }} >
                        Cerrar
                    </button>
                </section>
            )
            }
        </>
    )
}

export default GetStations;
