import React from 'react'
import { useState } from 'react';


export const SettingsInfoPersonal = ({ clickedButton }) => {

  const [saveButton, setSaveButton] = useState(false);
  

  return (
    <>
      <section className='settings-container'>
        <div className='setting-header'>
          <div className='setting-title'>
            <h2 className='settingtitle info-personal'>Información personal</h2>
          </div>
          <div className='setting-desc'>
            <h3 className='desc info-personal'>Edita los datos de tu perfil</h3>
          </div>
        </div>
        <div className='setting-body'>
          <div className='setting-info-container'>
            <div className='setting-nombre-apellidos'>
              <form className='nombre-apellidos'>
                <div className='wrap-nombre'>
                  <label className='nombre-label'>Nombre</label>
                  <input className='nombre-input' type='text' name='nombre' onChange={() => {setSaveButton(true)}}>{/*rellenar con la información del usuario*/}</input>
                </div>
                <div className='wrap-apellidos'>
                  <label className='apellidos-label'>Apellidos</label>
                  <input className='apellidos-input' type='text' name='apellidos' onChange={() => {setSaveButton(true)}}>{/*rellenar con la información del usuario*/}</input>
                </div>
              </form>
              <form className='nombre-usuario'>
                <div className='wrap-usuario'>
                  <label className='usuario-label'>Nombre de usuario</label>
                  <input className='usuario-input' type='text' name='usuario' onChange={() => {setSaveButton(true)}}>{/*rellenar con la información del usuario*/}</input>
                </div>
              </form>
              <form className='ubicacion'>
                <div className='wrap-ubicacion'>
                  <label className='ubicacion-label'>Ubicación</label>
                  <input className='ubicacion-input' type='text' name='ubicacion' onChange={() => setSaveButton(true)}>{/*rellenar con la información del usuario*/}</input>
                </div>
              </form>
              <form className='correo'>
                <div className='wrap-correo'>
                  <label className='correo-label'>Correo electrónico</label>
                  <input className='correo-input' type='text' name='correo' onChange={() => setSaveButton(true)}>{/*rellenar con la información del usuario*/}</input>
                </div>
              </form>
            </div>
            {saveButton ?
             <div className='save-button-container'>
             <button className='save-button' type='submit' onClick={()=>clickedButton(true)}>Guardar cambios</button>
             <button className='discard-button' type='submit' onClick={()=>clickedButton(true)}>Descartar cambios</button>
           </div>
            :
            null}
          </div>
        </div>
      </section>



    </>
  );
}
