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


export const GetStations = ({ id, closeModal, setMarkers, markers, stationsData, setStationsData, setUserLogged }) => {
    const method = 'readstationsmunicipi';
    const location = 'Barcelona';
    const [errorMessage, setErrorMessage] = useState('');
    const errorRef = useRef();
    const [success, setSuccess] = useState(false);
    var response = '';
    var coordenates = [];
    var data = [];

    //Para borrar despues de tener el componente de obtencion de municipis
    const [municipis, setSelectedMunicipis] = useState({
        municipis:[ "Barcelona", "Lleida", "Girona"]
    }
    );

    Object.keys('municipis');


    const getStationsResponse = async (e) => {
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

    const selectMunicipi = (e) => {
        const selectedMunicipi = municipis.find((entry) => entry.municipi === e.target.value);
        setSelectedMunicipis(selectedMunicipi);
        
        //setSelectedMunicipis(e.target.value);
        console.log('Option selected:');
        console.log('Barcelona')
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
                    <h3>
                        ¿Deseas obtener las estaciones del municipio?
                    </h3>
                    <br></br>
                    <Select
                        onChange={selectMunicipi}
/*                         className='btn-signout-accept'
                        classNamePrefix="select"
                        // defaultValue={ }
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true} */
                        //name='municipi'
                    >
                        {
                            Object.keys(municipis).map((entry, index) => {
                                return (
                                    <option key={index} value={entry.municipis}>
                                        {entry.municipis}
                                    </option>
                                );
                            })
                        }
                    </Select>
                    <span>
                        <br />
                    </span>

                    <button
                        className="btn-signout-accept"
                        onClick={getStationsResponse}
                /*onClick={getStationsResponse}*/ >
                        Aceptar
                    </button>
                    <button
                        className="btn-signout-cancel"
                        onClick={() => { closeModal(false); }} >
                        Cancelar
                    </button>
                </section>
            )
            }
        </>
    )
}
