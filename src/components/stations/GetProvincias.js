import React from 'react';
import '../../stylesheets/stylesModalStations.css';
import { useRef, useState, useEffect, render } from "react";
import Select from 'react-select';
import stg from '../../utils/stg';

/* LIBERIA AXIOS */
import axios from "../../api/axios";

const STATIONS_URL = '/backendstations.php';

function GetProvincias({ id, markers, setMarkers, stationsData }) {

  console.log(stationsData)

  const [selectOptions, setSelectOptions] = useState([]);
  const [location, setLocation] = useState('');
  const [method, setMethod] = useState('readprovincias');
  const [errorMessage, setErrorMessage] = useState('');
  const response = '';
  var coordenates = [];

  //Al cargar el componente, recupera las provincias para mostrarlas como opciones en el Select
  useEffect(() => { getAllProvincias(); }, [])


  const getAllProvincias = async (e) => {
    response = await axios.post(
      STATIONS_URL,
      JSON.stringify({ method: method }),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: false
      },
      { timeout: 4 }
    ).then(response => {
      if (response.data.readprovincias) {
        var datos = response.data[0].sort((a,b) => a.provincia > b.provincia ? 1 : -1);;
        console.log(datos)

        const options = datos.map(x => ({
          "value": x.provincia,
          "label": x.provincia
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

    //Se recorre el array stationsData para encontrar coincidencias con la provincia seleccionada y extraer las coordenadas
    try {
      for (let i = 0; i < stationsData.length; i++) {
        if (stationsData[i].provincia === e.value) {
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
        PROVINCIA:
      </h3>
      { <Select
          options={selectOptions}
          onChange={handleChange}
          className="select-station" > </Select> }
    </>
  )
}

export default GetProvincias;