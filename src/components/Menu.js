import * as React from 'react';
import { useState } from 'react';
import '../stylesheets/stylesSignOut.css';
import stg from '../utils/stg';
import { ModalStations } from './stations/ModalStations';

/*interface IMenuProps {
    isMenuOpen;
}*/

export const Menu = ({ id, isMenuOpen, setMenu, activa, openModalContact, openModalSettings, userLogged, closeModal, markers, setMarkers, stationsData, setStationsData }) => {

  const handleClickLogout = () => {
    //setModalLogout((prevState) => !prevState);
    setMenu(false);
    closeModal(true);
  };

  const [showBuscar, setShowBuscar] = useState(false);

  return (
    <>
      <div id={id} className={`app-menu ${isMenuOpen ? 'menu-open' : ''}`} >
        <div className='menu-items'>
          {showBuscar ? <ModalStations setShowBuscar={setShowBuscar} id={id} markers={markers} setMarkers={setMarkers} stationsData={stationsData} setStationsData={setStationsData}/> : 
          <ul className='list' id={id}>
            <a role="button" onClick={() => {setShowBuscar(true)} } >Buscar</a>
            <a role="button" onClick={() => activa('Nosotros')} >Nosotros</a>
            <a role="button" onClick={() => { openModalContact(true); setMenu(false) }} >Contacto</a>
            <a role="button" onClick={() => { openModalSettings(true); setMenu(false) } } style={{visibility: stg.get('userLogged') ? 'visible' : 'hidden'}}  >Ajustes</a>
            <button className='btn-signout' id={id} onClick={handleClickLogout} hidden={userLogged ? false : true}>Cerrar Sesión</button>
          </ul>
          }
        </div>
      </div>
    </>
  );
} 