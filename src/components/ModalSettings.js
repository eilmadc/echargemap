import * as React from 'react';
import { useRef, useState, useEffect } from "react";
import { SettingsInfoPersonal } from './SettingsInfoPersonal';
import { SettingsGestionCuenta } from './SettingsGestionCuenta';
import { SettingsComentarios } from './SettingsComentarios';
import stg from '../utils/stg';
/* LIBERIA AXIOS */
import axios from "../api/axios";

const READ_URL = '/backenduser.php';

export const ModalSettings = ({ id, closeModal, userLogged, setUserLogged }) => {
  const [panel, setPanel] = useState('info');
  const [clickedButton, setClickedButton] = useState(false);
  const [newData, setNewData] = useState(false);

  const method = 'readuser';
  const errorRef = useRef();
  const [errorMessage, setErrorMessage] = useState(false);

  const userName = stg.get('username');

  //console.log(newData);

  useEffect(() => {
    setErrorMessage('');
  }, [userName])

  const getDataUser = async (e) => {
    //e.preventDefault();
    const userName = stg.get('username');

    try {
      //BACKEND----->
      const response = await axios.post(
        READ_URL,
        JSON.stringify({ method: method, userName: userName }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log (response.data[0][0]);
      /*Validamos la respuesta del servidor: con el mensaje de response.data*/
      if (response.data.readuser) {

        /*Almacenamiento local*/
        stg.set('userLogged', true);
        stg.set('username', response.data[0][0].username);
        stg.set('password', response.data[0][0].password);
        stg.set('name', response.data[0][0].name);
        stg.set('lastname', response.data[0][0].lastname);
        stg.set('email', response.data[0][0].mail);
        stg.set('location', response.data[0][0].location);

      }
      else {
        /*                 console.log(password);
                  console.log(md5(password));
                  console.log(md5(md5(password)));
                  console.log(md5(md5(md5(password)))); */
        alert('El login del usuario y password ha fallado: ' + response.data.userName);
        console.log(response.data);
        stg.set('userLogged', false);
      }

    } catch (e) {

      /* CONTROL DE ERRORES DE RESPUESTA DEL SERVIDOR*/

      if (!e?.response) {
        console.log(e);
        setErrorMessage('Sin Respuesta del Servidor.');
      } else if (e.response?.status === 400) {
        setErrorMessage('400: No existe el usuario');
      } else if (e.response?.status === 401) {
        setErrorMessage('401: Sin Autorizacion');
      } else if (e.response?.status === 500) {
        setErrorMessage('500: Error de Servidor');
      } else {
        setErrorMessage('Error de busqueda de usuario');
      }

      //errorRef.current.focus();
    }

  }

  getDataUser();

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
                <a role='button' onClick={() => setPanel('info')}>Información personal</a>
              </div>
              <div className='list-option'>
                <a role='button' onClick={() => setPanel('gestion')}>Gestión de la cuenta</a>
              </div>
              <div className='list-option'>
                <a role='button' onClick={() => setPanel('comentarios')}>Comentarios</a>
              </div>
            </div>
          </section>
          {panel === "info" ? <SettingsInfoPersonal clickedButton={setClickedButton} setNewData={setNewData} newData={newData} closeModal={closeModal} /> : null}
          {panel === 'gestion' ? <SettingsGestionCuenta clickedButton={setClickedButton} closeModal={closeModal} /> : null}
          {panel === 'comentarios' ? <SettingsComentarios clickedButton={setClickedButton} closeModal={closeModal} /> : null}

        </div>
      </div>
    </>
  );
}
