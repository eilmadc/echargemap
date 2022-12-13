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
      console.log(response.data);
      if (response.data.readprovincias) {
        var datos = response.data[0].sort((a,b) => a.provincia > b.provincia ? 1 : -1);;
        console.log(datos)

        const options = datos.map(x => ({
          "value": x.provincia,
          "label": x.provincia
        }))
        console.log(options)
        setSelectOptions(options);
        console.log(selectOptions)
      } else {
        setErrorMessage(response);
      }
    })
      .catch(err => {
        console.log(err);
      });
  }

  const handleChange = (e) => {

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