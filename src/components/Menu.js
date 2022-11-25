import * as React from 'react';


/*interface IMenuProps {
    isMenuOpen;
}*/

export const Menu = ({ id, isMenuOpen, setMenu, activa, openModalContact, openModalSettings }) => {

  return (
    <>
      <div id={id} className={`app-menu ${isMenuOpen ? 'menu-open' : ''}`} >
        <div className='menu-items'>
          <ul className='list' id={id}>
            <a role="button" onClick={() => activa('Buscar')} >Buscar</a>
            <a role="button" onClick={() => {openModalSettings(true);setMenu(false)}} >Ajustes</a>
            <a role="button" onClick={() => activa('Nosotros')} >Nosotros</a>
            <a role="button" onClick={() => {openModalContact(true);setMenu(false)}} >Contacto</a>
          </ul>
        </div>
      </div>
    </>
  );
}