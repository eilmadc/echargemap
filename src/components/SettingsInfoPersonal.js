
import { useRef, useState, useEffect } from "react";
import React from 'react'
import stg from '../utils/stg';
import md5 from 'md5';
/* LIBERIA AXIOS */
import axios from "../api/axios";

const UPDATE_URL = '/backenduser.php';

export const SettingsInfoPersonal = ({ clickedButton, setNewData, newData, closeModal, userLogged, setUserLogged }) => {

  const method = 'updateuser';
  const userRef = useRef();
  const errorRef = useRef();

  const [userName, setUserName] = useState(stg.get('username'));
  const [password, setPassword] = useState(stg.get('password'));
  const [nameU, setNameU] = useState(stg.get('name'));
  const [lastname, setLastName] = useState(stg.get('lastname'));
  const [mail, setMail] = useState(stg.get('email'));
  const [location, setLocation] = useState(stg.get('location'));

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleOnChange = (e) => {
    e.preventDefault();

    setNewData(true);
    console.log(newData);

    /*Cambio en los valores del formulario y su almacenaje en las variables correspondientes*/
    setUserName(e.target.userName);
    setNameU(e.target.nameU);
    setLastName(e.target.lastName);
    //email no se cambia, puesto que es el campo clave.
    setLocation(e.target.location);
  };

  const handleExit = (e) => {
    clickedButton(true);
  }

  const handleSubmit = async (e) => {

    try {
      setNewData(true);
      clickedButton(true);
      e.preventDefault();

      const response = await axios.post(
        UPDATE_URL,
        JSON.stringify({ method: method, userName: userName, password: password, name: nameU, lastname: lastname, mail: mail, location: location }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log(response.data);

      /*Validamos la respuesta del servidor: con el mensaje de response.data*/
      if (response.data.updateuser) {
        console.log(response.data);
        setSuccess(true);
      }
      else {
        alert('Ha ocurrido un error de registro ' + response.data.userName);
        console.log(response.data);
        stg.set('userLogged', false);
      }

    } catch (e) {
      /* CONTROL DE ERRORES DE RESPUESTA DEL SERVIDOR*/

      if (!e?.response) {
        console.log(e);
        setErrorMessage('Sin Respuesta del Servidor.');
      } else if (e.response?.status === 400) {
        setErrorMessage('400: No existen Usuario ni Password');
      } else if (e.response?.status === 401) {
        setErrorMessage('401: Sin Autorizacion');
      } else if (e.response?.status === 500) {
        setErrorMessage('500: Error de Servidor');
      } else {
        setErrorMessage('El Login ha fallado');
      }

      errorRef.current.focus();
    }
  }
  return (
    <>
      {success ? (

        <section className="section-signup">
          <br></br><br></br>
          <h2>Correcto!</h2>
          <h2>Los cambios se han realizado correctamente {stg.get('username')}</h2>
          <br></br><br></br><br></br><br></br><br></br><br></br>
        </section>
      ) : (
        <section className='settings-container'>
          <div className='setting-header'>
            <div className='setting-title'>
              <h2 id={id} className='settingtitle info-personal'>Información personal</h2>
            </div>
            <div className='setting-desc'>
              <h3 id={id} className='desc info-personal'>Edita los datos de tu perfil</h3>
            </div>
          </div>
          <div className='setting-body'>
            <div className='setting-info-container'>
              <form className='form-wrapper' onSubmit={handleSubmit}>
                <div className='setting-nombre-apellidos'>
                  <form className='nombre-apellidos'>
                    <div className='wrap-nombre'>
                      <label id={id} className='nombre-label'>Nombre</label>
                      <input className='nombre-input' type='text' name='nombre' onChange={handleOnChange} value={nameU}>{/*rellenar con la información del usuario*/}</input>
                    </div>
                    <div className='wrap-apellidos'>
                      <label id={id} className='apellidos-label'>Apellidos</label>
                      <input className='apellidos-input' type='text' name='apellidos' onChange={handleOnChange} value={lastname}>{/*rellenar con la información del usuario*/}</input>
                    </div>
                  </form>
                  <form className='nombre-usuario'>
                    <div className='wrap-usuario'>
                      <label id={id} className='usuario-label'>Nombre de usuario</label>
                      <input className='usuario-input' type='text' name='usuario' onChange={handleOnChange} value={userName}>{/*rellenar con la información del usuario*/}</input>
                    </div>
                  </form>
                  <form className='ubicacion'>
                    <div className='wrap-ubicacion'>
                      <label id={id} className='ubicacion-label'>Ubicación</label>
                      <input className='ubicacion-input' type='text' name='ubicacion' onChange={handleOnChange} value={location}>{/*rellenar con la información del usuario*/}</input>
                    </div>
                  </form>
                  <form className='correo'>
                    <div className='wrap-correo'>
                      <label id={id} className='correo-label'>Correo electrónico</label>
                      <input className='correo-input' type='text' name='correo' onChange={handleOnChange} value={mail}>{/*rellenar con la información del usuario*/}</input>
                    </div>
                  </form>
                </div>
                <div className='save-button-container'>
                  <button className='save-button' disabled={!newData ? true : false} type='submit' onClick={() => handleSubmit}>Guardar cambios</button>
                  <button className='discard-button' disabled={!newData ? true : false} type='submit' onClick={() => handleExit}>Descartar cambios</button>
                </div>
              </form>
              
            </div>
          </div>
        </section>
      )
      }
    </>
  );
}
