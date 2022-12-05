import '../../stylesheets/stylesModalStations.css';
import { useRef, useState, useEffect } from "react";
import React from 'react';
import stg from '../../utils/stg';
/* LIBERIA AXIOS */
import axios from "../../api/axios";

const STATIONS_URL = '/backendstations.php';


export const GetStations = ({ id, closeModal, setUserLogged }) => {

    const method = 'readstations';
    const location = 'Barcelona';
    const [errorMessage, setErrorMessage] = useState('');
    const errorRef = useRef();
    const [success, setSuccess]=useState(false);

    const getStationsResponse = async (e) => {
        try {
            const response = await axios.post(
                STATIONS_URL,
                JSON.stringify({ method: method, municipi: location }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )

            console.log(response.data);
            if (response.data.readstations) {
                console.log(response.data)
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

    return (
        <>



            {
                success ? (
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
                        <span>
                            <br />
                        </span>

                        <button
                            className="btn-signout-accept"
                            onClick={getStationsResponse} >
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
