import React from 'react';
import '../../stylesheets/stylesModalStations.css';
import { useRef, useState, useEffect, render } from "react";
import Select from 'react-select';
import stg from '../../utils/stg';

/* LIBERIA AXIOS */
import axios from "../../api/axios";

const STATIONS_URL = '/backendstations.php';

export const GetMunicipis = ({ id, setMarkers, stationsData }) => {

  const [selectOptions, setSelectOptions] = useState([]);
  const [method, setMethod] = useState('readmunicipis');
  const [errorMessage, setErrorMessage] = useState('');
  const response = '';
  var coordenates = [];

  //Al cargar el componente, recupera los municipios para mostrarlos como opciones en el Select
  useEffect(() => { getAllMunicipis(); }, [])

const getAllMunicipis = async(e) => {
  response = await axios.post(
    STATIONS_URL,
    JSON.stringify({ method: method }),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: false
    },
    { timeout: 4 }
  ).then(response => {
    console.log(response.data);
    if (response.data.readmunicipis) {
      var datos = response.data[0].sort((a,b) => a.municipi > b.municipi ? 1 : -1);
      console.log(datos)
      
      const options = datos.map(x => ({
        "value": x.municipi,
        "label": x.municipi
      }))
      
      setSelectOptions(options);
      
    } else {
      setErrorMessage(response);
    }
  })
    .catch(err => {
      console.log(err);
    });
}

const handleChange = (e) => {

      //Se recorre el array stationsData para encontrar coincidencias con el municipio seleccionado y extraer las coordenadas
  try {
    for (let i = 0; i < stationsData.length; i++) {
      if (stationsData[i].municipi === e.value) {
        let lat = Number(parseFloat(stationsData[i].latitud));
        let lng = Number(parseFloat(stationsData[i].longitud));
        coordenates.push({ lat: lat, lng: lng })
      }
    }
    setMarkers(coordenates);

  } catch (e) {
    console.log('Error' + e)
  }

}


    return (
        <>
            <h3 id={id}>
                MUNICIPIO:
            </h3>
            {<Select
                options={selectOptions}
                onChange={handleChange}
                className="select-station" > </Select>}

        </>
    )

}

export default GetMunicipis;