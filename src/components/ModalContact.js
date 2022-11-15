import * as React from 'react';
import { useState } from 'react';
import { setSeconds } from 'rsuite/esm/utils/dateUtils';
import background from '../images/using-laptop.jpeg';

export const ModalContact = ({ id, closeModal }) => {


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.username.value, e.target.phone.value, e.target.msg.value, e.target.email.value);
    }



  return (
    <>
      <div className='modal-contact' id={id}>
        <div className='modal-contact-header' id={id} >
          <button className='fa-cross' onClick={() => { closeModal(false); }}>X</button>
        </div>
        <section className='contact-header' id={id} style={{ backgroundImage: `url(${background})` }}>
          <div className='contact-title-1' id={id}>Contacta con nosotros</div>
          <div className='contact-title-2' id={id}>Déjanos tu mensaje</div>
        </section>
        <section className='contact-form-container'>
          <form className='contact-form' onSubmit={handleSubmit}>
            <div className='wrap-input validate-input'>
              <label className='label-input' id={id}> Nombre: </label>
              <input className='contact-input fullname' id={id} type='text' name="username" placeholder='Introduce tu nombre completo' />
            </div>
            <div className='wrap-input validate-input'>
              <label className='label-input' id={id}> Email: </label>
              <input className='contact-input email' id={id} type='text' name="email" placeholder='Introduce tu dirección de email' />
            </div>
            <div className='wrap-input validate-input'>
              <label className='label-input' id={id}> Teléfono: </label>
              <input className='contact-input phone' id={id} type='text' name="phone" placeholder='Introduce tu número de teléfono'/>
            </div>
            <div className='wrap-input validate-input'>
              <label className='label-input' id={id}> Mensaje: </label>
              <textarea className='contact-input message' id={id} type='text' name="msg" placeholder='Tu mensaje...'/>
            </div>
            <div className='contact-button-container'>
              <button className='contact-button' type='submit'>Enviar</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
}