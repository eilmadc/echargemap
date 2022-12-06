import React from 'react'
import { useState } from 'react';

export const SettingsComentarios = ({ id }) => {

 
  return (
    <>
      <section className='settings-container'>
        <div className='setting-header'>
          <div className='setting-title'>
            <h2 className='settingtitle comentarios'  id={id}>Tus comentarios</h2>
          </div>
          <div className='setting-desc'>
            <h3 className='desc comentarios'  id={id}>Aquí se muestran todos los comentarios que has escrito</h3>
          </div>
        </div>
        <div className='setting-body'>
          <div className='setting-comentarios-container'  id={id}>
            <div className='wrap-comentario' id={id} style={{borderRadius:'5px'}}>
              <div className='titulo-comentario' id={id}>Titulo del comentario</div>
              <div className='texto-comentario' id={id}>Cuerpo del comentario sobre un punto de recarga .. etc etc
              Cuerpo del comentario sobre un punto de recarga .. etc etc
              Cuerpo del comentario sobre un punto de recarga .. etc etc
              Cuerpo del comentario sobre un punto de recarga .. etc etc
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}