
import { useRef, useState, useEffect } from "react";
import React from 'react'
import stg from '../utils/stg';
/* LIBERIA AXIOS */
import axios from "../api/axios";
import md5 from "md5";

const UPDATE_URL = '/backenduser.php';

export const SettingsInfoPersonal = ({ id, clickedButton, setNewData, newData, closeModal }) => {

  const method = 'updateuser';
  const errorRef = useRef();

  //TODO: Ver si son necesarias cuando UPDATEUSER este acabado en server. Optimizar
  const [userName, setUserName] = useState(stg.get('username'));
  const [password, setPassword] = useState(stg.get('password'));
  const [nameU, setNameU] = useState(stg.get('name'));
  const [lastname, setLastName] = useState(stg.get('lastname'));
  const [mail, setMail] = useState(stg.get('email'));
  const [location, setLocation] = useState(stg.get('location'));

  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const [state, setState] = useState({
    nombre: stg.get('name'),
    apellidos: stg.get('lastname'),
    usuario: stg.get('username'),
    correo: stg.get('correo'),
    ubicacion: stg.get('location'),
  })


  useEffect(() => {
    setErrorMessage('');
  }, [userName])

  const handleOnChange = (e) => {

    e.preventDefault();

    setNewData(true);

    /*Cambio en los valores del formulario y su almacenaje en las variables correspondientes*/
    setState({
      ...state,
      [e.target.name]: e.target.value
    });

    switch (e.target.name) {
      //email no se cambia, puesto que es el campo clave.
      case 'nombre': setNameU(e.target.value); break;
      case 'apellidos': setLastName(e.target.value); break;
      case 'usuario': setUserName(e.target.value); break;
      case 'ubicacion': setLocation(e.target.value); break;
      default: break;
    }
    console.log('EVENT:', e);
  };

  /*DESCARTAR CAMBIOS EN EL FORMULARIO*/
  const handleDiscardChanges = (e) => {

    setNewData(false);
    clickedButton(false);
    closeModal(true);

    setState({
      ...state,
      nombre: stg.get('name'),
      apellidos: stg.get('lastname'),
      usuario: stg.get('username'),
      correo: stg.get('correo'),
      ubicacion: stg.get('location'),
    });
  }

  /*UPDATEUSER: ENVIAR CAMBIOS EN EL FORMULARIO AL SERVIDOR PARA ACTUALIZAR AL USUARIO EN LA DB*/
  const handleSubmit = async (e) => {

    try {

      e.preventDefault();

      setNewData(true);
      clickedButton(true);

      const response = await axios.post(
        UPDATE_URL,
        JSON.stringify({ method: method, userName: userName, password: password, name: nameU, lastname: lastname, mail: mail, location: location }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      //TODO: borrar cuando todas las pruebas esten realizadas.
      console.log('userName: ' + userName);
      console.log('nameU:' + nameU);
      console.log('password: ' + password);
      console.log('lastname: ' + lastname);
      console.log('mail:' + mail);
      console.log('location:' + location);

      /*Validamos la respuesta del servidor: con el mensaje de response.data*/
      if (response.data.updateuser) {

        console.log(response.data);

        /*Almacenamiento local*/
        stg.set('name', nameU);
        stg.set('lastname', nameU);
        stg.set('username', nameU);
        stg.set('location', nameU);

        setSuccess(true);

      }
      else {
        alert('Ha ocurrido un error de registro ' + userName);
        handleDiscardChanges();
        console.log(response.data);
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
                      <input className='nombre-input' type='text' name='nombre' onChange={handleOnChange} value={state.nombre}>{ }</input>
                    </div>
                    <div className='wrap-apellidos'>
                      <label id={id} className='apellidos-label'>Apellidos</label>
                      <input className='apellidos-input' type='text' name='apellidos' onChange={handleOnChange} value={state.apellidos}>{/*rellenar con la información del usuario*/}</input>
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
                </div>

              </form>
              <div className='save-button-container' >
                <button className='discard-button' disabled={!newData ? true : false} type='submit' onClick={handleDiscardChanges}>Descartar cambios</button>
              </div>
            </div>
          </div>
        </section>
      )
      }
    </>
  );
}
