import React from 'react';
import "../../stylesheets/stylesECMap.css";
import { useEffect, useRef, useMemo } from 'react';
import MapLight from '../../images/mapa.jpeg';
import MapDark from '../../images/mapaDark.png';

import { GoogleMap, useLoadScript, Marker, MarkerF } from "@react-google-maps/api";





const ECMap = ({ id }) => {

  const { isLoaded } = useLoadScript({

    //env.local-- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "AIzaSyC7XftCh0NCOkAUkX81wcuUaVTpmuFew8k"
    googleMapsApiKey: "AIzaSyC7XftCh0NCOkAUkX81wcuUaVTpmuFew8k",
  });


  if (!isLoaded) return <div>Loading...</div>

  return <Map></Map>
}

function Map() {

  const center = useMemo(() => ({ lat: 41.593502, lng: 1.8378068 }), []);
  const zoom = 11;
  
  
  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      mapContainerClassName="map-container"
    >
      <MarkerF position={center} />
    </ GoogleMap>
  )
}

export default ECMap