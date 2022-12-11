import * as React from 'react';
import '../stylesheets/stylesSignOut.css';
import stg from '../utils/stg';

/*interface IMenuProps {
    isMenuOpen;
}*/

export const Menu = ({ id, isMenuOpen, setMenu, activa, openModalContact, openModalSettings, openModalStations, userLogged, setUserLogged, closeModal }) => {

  const handleClickLogout = () => {
    //setModalLogout((prevState) => !prevState);
    setMenu(false);
    closeModal(true);
  };

  return (
    <>
      <div id={id} className={`app-menu ${isMenuOpen ? 'menu-open' : ''}`} >
        <div className='menu-items'>
          <ul className='list' id={id}>
          {/* <a role="button" onClick={() => activa('Buscar') */}
            <a role="button" onClick={() => { openModalStations(true); setMenu(false) } } >Buscar</a>
            <a role="button" onClick={() => activa('Nosotros')} >Nosotros</a>
            <a role="button" onClick={() => { openModalContact(true); setMenu(false) }} >Contacto</a>
            <a role="button" onClick={() => { openModalSettings(true); setMenu(false) } } style={{visibility: stg.get('userLogged') ? 'visible' : 'hidden'}}  >Ajustes</a>
            <button className='btn-signout' id={id} onClick={handleClickLogout} hidden={userLogged ? false : true}>Cerrar Sesión</button>
          </ul>
          
        </div>
      </div>
    </>
  );
}