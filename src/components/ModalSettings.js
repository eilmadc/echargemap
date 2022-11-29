import * as React from 'react';
import { useState } from 'react';
import { SettingsInfoPersonal } from './SettingsInfoPersonal';
import { SettingsGestionCuenta } from './SettingsGestionCuenta';
import { SettingsComentarios } from './SettingsComentarios';

export const ModalSettings = ({ id, closeModal }) => {
  const [panel, setPanel] = useState('info');
  const [clickedButton, setClickedButton] = useState(false);
  const [newData, setNewData] = useState(false);
  
  console.log(newData);

  return (
    <>
      <div className='modal-settings' id={id}>
        <div className='modal-settings-header' id={id}>
          <button className='fa-cross' onClick={() => newData && !clickedButton ? alert('Antes de salir guarda o descarta los cambios') : closeModal(false)}> X </button>
        </div>
        <div className='modal-settings-container'>
          <section className='subpages-container'>
            <div className='subpages-list'>
              <div className='list-option'>
                <a role='button' onClick={()=>setPanel('info')}>Información personal</a>
              </div>
              <div className='list-option'>
                <a role='button' onClick={()=>setPanel('gestion')}>Gestión de la cuenta</a>
              </div>
              <div className='list-option'>
                <a role='button' onClick={()=>setPanel('comentarios')}>Comentarios</a>
              </div>
            </div>
          </section>
          {panel === "info" ? <SettingsInfoPersonal clickedButton={setClickedButton} setNewData={setNewData} newData={newData} /> : null}
          {panel === 'gestion' ? <SettingsGestionCuenta clickedButton={setClickedButton}/> : null}
          {panel === 'comentarios' ? <SettingsComentarios clickedButton={setClickedButton}/> : null}

        </div>
      </div>
    </>
  );
}
