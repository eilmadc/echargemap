import * as React from 'react';
import { useState } from 'react';
import { SettingsInfoPersonal } from './SettingsInfoPersonal';

export const ModalSettings = ({ id, closeModal }) => {
  const [panel, setPanel] = useState('info');
  const [clickedButton, setClickedButton] = useState(false);
  
  const alertMsg = () => {
    if (!clickedButton) {
      alert('Antes de salir guarda o descarta los cambios');
    } else {
      closeModal(false);
    }
  }

  return (
    <>
      <div className='modal-settings' id={id}>
        <div className='modal-settings-header' id={id}>
          <button className='fa-cross' onClick={alertMsg}>X</button>
        </div>
        <div className='modal-settings-container'>
          <section className='subpages-container'>
            <div className='subpages-list'>
              <div className='list-option'>
                <a role='button' onClick={()=>setPanel('info')}>Información personal</a>
              </div>
              <div className='list-option'>
                <a role='button' onClick={()=>setPanel('com')}>Gestión de la cuenta</a>
              </div>
              <div className='list-option'>
                <a role='button'>Comentarios</a>
              </div>
            </div>
          </section>
          {panel === "info" ? <SettingsInfoPersonal clickedButton={setClickedButton} /> : null}

        </div>
      </div>
    </>
  );
}
