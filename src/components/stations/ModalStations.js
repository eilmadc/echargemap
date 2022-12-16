import * as React from 'react';
import '../../stylesheets/stylesModalStations.css';
import stg from '../../utils/stg';
import { GetStations}  from '../stations/GetStations';
import {GetMunicipis} from '../stations/GetMunicipis';

export const ModalStations = ({ id, setMarkers, markers, stationsData, setStationsData, closeModal, setUserLogged, setShowBuscar }) => {
    
    return (
        <div className='modal-station' id={id}>
            <div className='modal-station-header' id={id}>
                {/* <button className='fa-cross' onClick={() => {  setShowBuscar(false) }} >
                    X
                </button> */}
            </div>
            <div className='modal-station-body' id={id}>
                <GetStations id={id} setShowBuscar={setShowBuscar} setMarkers={setMarkers} markers={markers} stationsData={stationsData} setStationsData={setStationsData} setUserLogged={setUserLogged} closeModal={closeModal} />
            </div >
        </div >
    );
}