import React from 'react';
import "../../stylesheets/stylesECMap.css";
import { useEffect, useRef, useMemo, useState } from 'react';
import darkStyle from '../../mapStyles.js';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, InfoWindow } from "@react-google-maps/api";

import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';

import { GiRoundStar } from 'react-icons/gi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';

import map_marker_2_multi_size from '../../images/map_marker_2_multi_size.ico';

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

  const [activeMarker, setActiveMarker] = useState(null);

  const marker = '';
  const google = window.google;
  const icon = { map_marker_2_multi_size, scaledSize: { width: 32, height: 32 } };

  const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#f5f5f5"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#dadada"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "transit.line",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#e5e5e5"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#eeeeee"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#c9c9c9"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    }
  ];

  const mapStyleDark =[
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ];

console.log(id);
  const handleActiveMarker = (index) => {
    //Si el marcador, es el marcador seleccionado
    if (index === activeMarker) {
      return;
    }
    setActiveMarker(index);
    console.log(stationsData[index].promotor_gestor);
  };



  return (
    <>
      {success ?
        (null) :
        (
          <section>
            <div id='map' className='map-container'>

              <GoogleMap

                /*estilos mapa*/
                options={{ styles :  id === 'lightMode' ? mapStyle : mapStyleDark }}
                zoom={zoom}
                center={center}
                mapContainerClassName="map-container"
                onClick={() => setActiveMarker(null)}

              >

                {
                  Array.isArray(markers)
                    ?
                    (markers.map((elem, index) => {
                      return (
                        <MarkerF

                          position={elem}
                          key={index}
                          onClick={() => handleActiveMarker(index)}
                          icon={map_marker_2_multi_size}
                        >
                          {activeMarker === index ?
                            (
                              <InfoWindowF
                                onCloseClick={() => setActiveMarker(null)}
                              >
                                <section className="section-map-marker">
                                  <div className='marker-head'>
                                    <h2><BsFillBookmarkFill className='star-icon' size={30} />&nbsp;&nbsp;{!stationsData[index].promotor_gestor ? ' ' : stationsData[index].promotor_gestor}</h2>
                                    <h3>{stationsData[index].adre_a}<br></br>  {stationsData[index].municipi}<br></br>  {stationsData[index].provincia}</h3>
                                    <div className>
                                      <GiRoundStar className='star-icon' size={20} />
                                      <GiRoundStar className='star-icon' size={20} />
                                      <GiRoundStar className='star-icon' size={20} />
                                      <GiRoundStar className='star-icon' size={20} />
                                      <GiRoundStar className='star-icon' size={20} />

                                      <p>&nbsp;&nbsp;comentarios</p>
                                    </div>
                                    <div >
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                      <AiOutlineMinus className='line' size={15} />
                                    </div>
                                    <ul>
                                      <li><h4>Descripción:   {stationsData[index].designaci_descriptiva} </h4></li>
                                      <li><h4>Tipo de Corriente:   {stationsData[index].ac_dc} </h4></li>
                                      <li><h4>Potencia:   {stationsData[index].kw} kw</h4></li>
                                      <li><h4>Tipo Conexión:   {(stationsData[index].tipus_connexi).replace('+', '  -  ')} </h4></li>
                                      <li><h4>Tipo Velocitat:   {stationsData[index].tipus_velocitat}</h4></li>
                                    </ul>
                                  </div>
                                </section>

                              </InfoWindowF>
                            )
                            : null
                          }
                        </MarkerF>
                      );
                    })
                    )
                    :
                    console.log("aaa", markers)
                };

              </GoogleMap>
            </div>
          </section >
        )
      }
    </>
  );
}
export default ECMap;