import '../stylesheets/stylesSignOut.css';
import React from 'react'
import { useState, useEffect } from 'react';
import stg from '../utils/stg';
export const SettingsGestionCuenta = ({ id, clickedButton, userLogged, setResetPassword }) => {

/* ICONOS */
import { FaInfoCircle, FaCheck, FaTimes } from 'react-icons/fa';

/* LIBERIA AXIOS */
import axios from "../api/axios";

const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%%]).{8,50}$/;
const RESETPASSWORD_URL = '/backenduser.php';


export const SettingsGestionCuenta = ({ id, clickedButton, setUserLogged, setResetPassword, closeModal }) => {

  const methodChange = 'resetpass';
  const methodDelete = 'deluser';
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [show, setShow] = useState('');
  const [deleteAccountBtn, setDeleteAccountBtn] = useState(false);
  const isLogged = stg.get('userLogged');
  const [message, setMessage] = useState('');

  return (
    <>
      <section className='settings-container'>
        <div className='setting-header' >
          <div className='setting-title'>
            <h2 className='settingtitle manage-account' id={id}>Gestión de la cuenta</h2>
          </div>
          <div className='setting-desc'>
            <h3 className='desc manage-account' id={id}>Modifica datos privados de tu cuenta</h3>
          </div>
        </div>
        <div className='setting-body'>
          <div className='setting-manage-container'>
            <div className='manage-options'>
              <a role='button' className='cambio-contr' id={id} onClick={() => setShow('cambio-contr')}>Cambiar contraseña</a>
              {show === 'cambio-contr' ?
                <div className='nueva-contr-container'>
                  <div className='introduce-nueva-contr' id={id}>Introduce la nueva contraseña</div>
                  <form className='form-wrapper'>
                    <div className='formulario-contr'>
                      <form className='antigua-contr'>
                        <div className='wrap-antigua-contr'>
                          <label id={id} className='antigua-contr'>Contraseña actual</label>
                          <input className='antigua-contr-input' type='password' name='antigua' value={stg.get('password')} />
                        </div>
                      </form>
                      <form className='nueva-contr'>
                        <div className='wrap-nueva-contr'>
                          <label id={id} className='nueva-contr'>Nueva contraseña</label>
                          <input className='nueva-contr-input' type='text' name='nueva' />
                        </div>
                      </form>
                      <form className='repetir-contr'>
                        <div className='wrap-repetir-contr'>
                          <label id={id} className='repetir-contr'>Repite la nueva contraseña</label>
                          <input className='repetir-contr-input' type='text' name='repetir' />
                        </div>
                      </form>
                    </div>
                    <div className='save-button-container'>
                      <button className='save-button' type='submit' onClick={() => clickedButton(true)}>Guardar cambios</button>
                      <button className='discard-button' type='submit' onClick={() => clickedButton(true)}>Descartar cambios</button>
                    </div>
                  </form>
                </div>
                : null}
              <a role='button' className='borrar-cuenta' id={id} onClick={() => setShow('borrar-cuenta')}>Cancelar cuenta</a>
              {show === 'borrar-cuenta' ?
                <div className='borrar-cuenta-container' id={id}>
                  <div className='desc-borrar-cuenta'>Estás en proceso de borrar todos los datos de tu cuenta.</div>
                  <div className='nombre-usuario-logado' ><h4 >{stg.get('username')}</h4></div>
                  <div className='texto-borrar-cuenta'>si continúas, tu nombre, ubicación y correo electrónico así como tus comentarios y estaciones guardadas se eliminarán y no podrás volver a acceder a ellas.<br /><br />
                    Al hacer clic tu cuenta de eChargeMap será suprimida.<br />
                  </div>
                  <div className='delete-acc-button-container'>
                    <button className='discard-button' type='submit' onClick={() => setDeleteAccountBtn(true)}>Eliminar cuenta</button>
                  </div>
                </div>
                : null}
  /*PASSWORD*/
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  /*PASSWORD COINCIDENCIA*/
  const [matchPassword, setMatchPassword] = useState('');
  const [validMatchPassword, setValidMatchPassword] = useState(false);
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

  /*Validacion de la contraseña*/
  useEffect(() => {

    /*Validacion de reglas para contraseña*/
    const result = PWD_REGEX.test(password);

    setValidPassword(result);

    /*Verificacion coincidencia de contraseña*/
    const match = password === matchPassword;
    setValidMatchPassword(match);

  }, [password, matchPassword])

  /*DESCARTAR CAMBIOS EN EL FORMULARIO*/
  const handleDiscardChanges = (e) => {

    //setNewData(false);
    clickedButton(false);
    //closeModal(true);
  }

  const handleSubmit = async (e) => {

    try {
      e.preventDefault();

      clickedButton(true);
      console.log('Hola');
      console.log(password);
      console.log(matchPassword);

      const var1 = PWD_REGEX.test(password);

      if (!var1) {
        setErrorMessage("Invalid entry");
        return;
      }


      const response = await axios.post(
        RESETPASSWORD_URL,
        JSON.stringify({ method: methodChange, password: md5(password), mail: stg.get('email') }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      console.log(response.data.resetpass);
      /*Validamos la respuesta del servidor: con el mensaje de response.data*/
      if (response.data.resetpass) {

        console.log(response.data);



        //Almacenamos nueva password
        stg.set('password', md5(password));

        console.log(md5(password));
        console.log(md5(md5(password)));
        alert('La contraseña ha sido correctamente cambiada.')
        /*  Si todo ha sido validado correctamente
    validamos success en el html*/
        setMessage('Contraseña cambiada correctamente');
        setSuccess(true);
      }
      else {
        alert('Ha ocurrido un error de registro para el mail: ' + stg.get('email'));
        console.log(response.data);
        stg.set('userLogged', false);
      }

    } catch (e) {
      /* CONTROL DE ERRORES DE RESPUESTA DEL SERVIDOR*/

      if (!e?.response) {
        setErrorMessage('Sin Respuesta del Servidor.');
        console.log(e);

      } else if (e.response?.status === 400) {
        setErrorMessage('400: No existen Usuario ni Password');
      } else if (e.response?.status === 401) {
        setErrorMessage('401: Sin Autorizacion');
      } else if (e.response?.status === 500) {
        setErrorMessage('500: Error de Servidor');
      } else {
        setErrorMessage('El cambio de contraseña ha fallado');
      }
    }

  }


  const handleSubmitDelete = async (e) => {

    setDeleteAccountBtn(true);
    //await window.location.reload(true);


    //e.preventDefault();


    if (window.confirm("¿Estás seguro de borrar tu cuenta de usuario definitivamente? (Los datos no podrán ser recuperados)")) {
      const response = await axios.post(
        RESETPASSWORD_URL,
        JSON.stringify({ method: methodDelete, password: md5(password), mail: stg.get('email') }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (response.data.deluser) {
        setMessage('Usuario elimninado:' + stg.get('username'));
        stg.clear();
        setUserLogged('false');
        setSuccess(true);
        //window.location.reload(true);
      } else {
        setMessage('Ha habido un error');
      }
    } else {
      alert('La eliminación de la cuenta se ha cancelado.');
    }
  }
    return (
      <>
        {success ? (
          <section>
            <br></br><br></br><br></br>
            <div>
              <h3>{message}</h3>
            </div>
            <br></br>
            <br></br><br></br><br></br>
          </section>
        ) : (
          <section className='settings-container'>
            <div className='setting-header' >
              <div className='setting-title'>
                <h2 className='settingtitle manage-account'>Gestión de la cuenta</h2>
              </div >
              <div className='setting-desc'>
                <h3 className='desc manage-account'>Modifica datos privados de tu cuenta</h3>
              </div>
            </div >
            <div className='setting-body'>
              <div className='setting-manage-container'>
                <div className='manage-options'>
                  <a role='button' className='cambio-contr' onClick={() => setShow('cambio-contr')}>Cambiar contraseña</a>
                  {
                    (
                      show === 'cambio-contr'
                    ) ? (
                      <form onSubmit={handleSubmit}>
                        <div className='nueva-contr-container'>
                          <div className='introduce-nueva-contr'>Introduce la nueva contraseña</div>
                          <div className='formulario-contr'>
                            {/* <form className='antigua-contr'> */}
                            <div className='wrap-antigua-contr'>
                              <label
                                className='antigua-contr'>Contraseña actual</label>
                              <input
                                className='antigua-contr-input'
                                type='password'
                                readOnly
                                value={stg.get('password')} />
                            </div>
                            {/* </form> */}

                            {/* PASSWORD*/}
                            {/* <form className='nueva-contr'> */}
                            <div className='wrap-nueva-contr'>
                              <label
                                className='nueva-contr'>
                                Nueva contraseña
                              </label>
                              <input
                                className='nueva-contr-input input-signup password'
                                type='password'
                                defaultValue=''
                                onChange={(e) => setPassword(e.target.value)}
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="passwordinfo"
                                required
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                              />
                              {/* Iconos de validacion de regex en password */}
                              <span
                                className={validPassword ? "valid" : "hide"}
                              >
                                <FaCheck />
                              </span>
                              <span
                                className={validPassword || !password ? "hide" : "invalid"}
                              >
                                <FaTimes />
                              </span>
                            </div>
                            {/* Mensaje de informacion del campo de password*/}
                            <p
                              id="passwordinfo"
                              className={passwordFocus && password && !validPassword ? "instructions-signup" : "offscreen"}
                            >
                              <FaInfoCircle />
                              8 to 12 characters <br />
                              Must include 0-9, a-z, A-Z, <br />
                              and special characters as:
                              <span aria-label='at symbol'>@</span>
                              <span aria-label='exclamation mark'>!</span>
                              <span aria-label='hashtag'>#</span>
                              <span aria-label='dollar'>$</span>
                              <span aria-label='percent'>%</span>
                              <br />
                            </p>
                            {/* </form> */}

                            {/*CONFIRMACION DE PASSWORD*/}
                            {/* <form className='repetir-contr'> */}
                            <div className='wrap-repetir-contr'>
                              <label
                                className='repetir-contr'
                                htmlFor="confirm_password">
                                Repite la nueva contraseña
                              </label>
                              <input
                                className='repetir-contr-input input-signup confirm-password'
                                type="password"
                                defaultValue=''
                                onChange={(e) => setMatchPassword(e.target.value)}
                                required
                                aria-invalid={validMatchPassword ? "false" : "true"}
                                aria-describedby="confirminfo"
                                onFocus={() => setMatchPasswordFocus(true)}
                                onBlur={() => setMatchPasswordFocus(false)}
                              />
                              {/* Iconos de validacion de coincidencia de password con la confirmacion de password*/}
                              <span
                                className={validMatchPassword && matchPassword ? "valid" : "hide"}
                              >
                                <FaCheck />
                              </span>
                              <span
                                className={validMatchPassword || !matchPassword ? "hide" : "invalid"}
                              >
                                <FaTimes />
                              </span>
                            </div>
                            {/* Mensaje de informacion del campo de confirmacion de la password*/}
                            <p
                              id="confirminfo"
                              className={matchPasswordFocus && !validPassword ? "instructions-signup" : "offscreen"}
                            >
                              <FaInfoCircle />
                              Must match the confirm password with password.
                              <br />
                            </p>
                            {/* </form> */}
                          </div>

                          <div className='save-button-container'>
                          </div>
                          <button
                            className='save-button'
                            type='submit'
                            disabled={!validPassword || !validMatchPassword ? true : false}
                            onClick={handleSubmit}
                          >Guardar cambios
                          </button>
                          <div className='save-button-container' >
                            <button
                              className='discard-button'
                              type='submit'
                              onClick={handleDiscardChanges}
                            >
                              Descartar cambios
                            </button>
                          </div>
                        </div>
                      </form>

                    ) : (
                      null
                    )
                  }

                  <a role='button' className='borrar-cuenta' onClick={() => setShow('borrar-cuenta')}>Cancelar cuenta</a>
                  {show === 'borrar-cuenta' ?
                    <div className='borrar-cuenta-container'>
                      <div className='desc-borrar-cuenta'>Estás en proceso de borrar todos los datos de tu cuenta.</div>
                      <div className='nombre-usuario-logado' ><h4 >{stg.get('username')}</h4></div>
                      <div className='texto-borrar-cuenta'>si continúas, tu nombre, ubicación y correo electrónico así como tus comentarios y estaciones guardadas se eliminarán y no podrás volver a acceder a ellas.<br /><br />
                        Al hacer clic tu cuenta de eChargeMap será suprimida.<br />
                      </div>
                      <div className='delete-acc-button-container'>
                        <button className='discard-button' type='submit' onClick={handleSubmitDelete}>Eliminar cuenta</button>
                      </div>
                    </div>
                    : null}

                </div>
              </div>
            </div>
          </section >
        )
        }
      </>
    )
  }
