import React from 'react';
import "../../stylesheets/stylesECMap.css";
import { useEffect, useRef, useMemo, useState } from 'react';
import MapLight from '../../images/mapa.jpeg';
import MapDark from '../../images/mapaDark.png';

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';


const ECMap = ({ id }) => {

  /*Carga inicial de la API*/
  const { isLoaded } = useLoadScript({
    //env.local-- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "AIzaSyC7XftCh0NCOkAUkX81wcuUaVTpmuFew8k"(mielena)
    googleMapsApiKey: "AIzaSyC7XftCh0NCOkAUkX81wcuUaVTpmuFew8k",
  });

  if (!isLoaded) return <div><h1>Loading...</h1></div>
  return <Map></Map>
}

/*FUNCION DE CARGA DEL MAPA*/
function Map() {

  //Posicion inicial de centrado de mapa, zoom, 
  const center = useMemo(() => ({ lat: 41.593502, lng: 1.8378068 }), []);
  const zoom = 11;
  const [selected, setSelected] = useState(null);
  const [success, setSuccess] = useState(false);

  return (
    <>
      {success ?
        (
          null
        ) : (
          <section>
            <div id='map' className='map-container'>

              <GoogleMap
                zoom={zoom}
                center={center}
                mapContainerClassName="map-container"
              >
                {<MarkerF position={center}/>}
              
              </ GoogleMap>
            
            </div>
          </section>
        )
      }
    </>
  );
}


export default ECMap