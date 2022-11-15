import * as React from 'react';


/*interface IMenuProps {
    isMenuOpen;
}*/

export const Menu = ({ id, isMenuOpen, setMenu, activa, openModalContact }) => {

  return (
    <>
      <div id={id} className={`app-menu ${isMenuOpen ? 'menu-open' : ''}`} >
        <div className='menu-items'>
          <ul className='list' id={id}>
            <a onClick={() => activa('Buscar')} >Buscar</a>
            <a /*onClick={() => TODO abrir modal}*/ >Ajustes</a>
            <a onClick={() => activa('Nosotros')} >Nosotros</a>
            <a onClick={() => {openModalContact(true);setMenu(false)}} >Contacto</a>
          </ul>
        </div>
      </div>
    </>
  );
}