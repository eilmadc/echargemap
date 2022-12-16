import React from 'react';
import "../../stylesheets/stylesECMap.css";
import { useEffect, useRef, useMemo, useState } from 'react';
import darkStyle from '../../mapStyles.js';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF, InfoWindow } from "@react-google-maps/api";
import { isAccordionItemSelected } from 'react-bootstrap/esm/AccordionContext';
import { GiRoundStar } from 'react-icons/gi';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { AiOutlineMinus } from 'react-icons/ai';

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

                        >
                          {activeMarker === index ?
                            (
                              <InfoWindowF
                                onCloseClick={() => setActiveMarker(null)}
                              >
                                <section className="section-map-marker">
                                  <div className='marker-head'>
                                    <h2><BsFillBookmarkFill className='star-icon' size={30} />&nbsp;&nbsp;{!stationsData[index].promotor_gestor ?  ' ' : stationsData[index].promotor_gestor }</h2>
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
                                      <li><h4>Tipo Conexión:   {(stationsData[index].tipus_connexi).replace ('+', '  -  ')} </h4></li>
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