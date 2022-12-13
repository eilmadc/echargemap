import React from 'react';
import "../../stylesheets/stylesECMap.css";
import { useEffect, useRef, useMemo, useState } from 'react';
import darkStyle from '../../mapStyles.js';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';


const ECMap = ({ id, markers, stationsData }) => {
  /*Carga inicial de la API*/
  const { isLoaded } = useLoadScript({
    //env.local-- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "AIzaSyC7XftCh0NCOkAUkX81wcuUaVTpmuFew8k"(mielena)
    googleMapsApiKey: "AIzaSyC7XftCh0NCOkAUkX81wcuUaVTpmuFew8k",
  });
  if (!isLoaded) return <div><h1>Loading...</h1></div>
  return <Map markers={markers} id={id} stationsData={stationsData} options={darkStyle} ></Map>
}
 
/*FUNCION DE CARGA DEL MAPA*/
export function Map({ markers, stationsData, id, darkStyle }) {

  //Posicion inicial de centrado de mapa, zoom, 
  var center = useMemo(() => ({ lat: 41.85827778393937, lng: 1.7586420189607188 }), []);
  const zoom = 9;

  const [success, setSuccess] = useState(false);


  return (
    <>
      {success ?
        (null) : (
          <section>
            <div id='map' className='map-container'>

              <GoogleMap 
              zoom={zoom}
              center={center}
              mapContainerClassName="map-container"
              >

                {Array.isArray(markers) ? markers.map(elem => ( <MarkerF position={elem}/> )) : console.log("aaa",markers)}

              </GoogleMap>
            </div>
          </section>
        ) 
      }
    </>
  );
}
export default ECMap;