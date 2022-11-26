import '../../stylesheets/stylesSignIn.css';

import { useRef, useState, useEffect } from "react";
import React from 'react';
import stg from '../../utils/stg';
//import AuthContext from "../../context/AuthProvider";
//import { ModalLogin } from "../login/ModalLogin";


/* LIBERIA AXIOS */
import axios from "../../api/axios";

const SIGNIN_URL = '/back.php';
//const SIGNIN_URL = '/backenduser.php';

/*  Metodo: Signin - Utilizado para que el usuario sea validado en la base de datos sql del servidor.
    
    Viene de ModalLogin: que es el modal abierto con el que cargo los componentes según corresponda.

    Variables:
        SIGNIN_URL: url del servidor que se añade a la url de base (la url del servidor) que esta en el fichero api/axios.js
        method:     Metodo al que hace referencia en el servidor, para realizar el login.
        userName:   Hace referencia al usuario introducido por el usuario
        password:   Contraseña introducida por el usuario

        response:   Respuesta del servidor. Los datos relativos a la respuesta de los mensajes enviados en response.data.

*/
const Signin = ({ id, userLogged, setUserLogged }) => {

    //const { setAuth } = React.useContext(AuthContext);
    const method = 'loginuser';
    const userRef = useRef();
    const errorRef = useRef();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

 
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [userName, password])

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            //BACKEND----->
            const response = await axios.post(
                SIGNIN_URL,
                JSON.stringify({ method: method, userName: userName, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            //const roles = response?.data?.roles;
            //TODO: Ver si utilizaremos el token para mantener la sesion, en vez de enviar userName y password en cada transaccion
            //const accessToken = response?.data?.accessToken;
            //setAuth({ userName, password, roles, accessToken });
            //setAuth({ userName, password });
            //<----- end backend
            //setUserName('');
            //setPassword('');

            /*Validamos la respuesta del servidor: con el mensaje de response.data*/
            if (response.data.loginuser) {
                
                /*mostrar datos en consola*/
                console.log(response.data);
                
                /*poner userLogged en true*/
                setUserLogged(true);

                /*Almacenamiento local*/
                stg.set('userLogged', true);
                stg.set('username',response.data.userName);
                stg.set('password',response.data.password);
                
                /*  Si todo ha sido validado correctamente
                    validamos success en el html*/
                setSuccess(true);
            }
            else {
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
            {
                success ? (
                    <section>
                        <br></br><br></br>
                        <h2>Login correcto</h2>
                        <br></br><br></br><br></br><br></br><br></br><br></br>
                    </section>
                ) : (
                    <section className="section-signin">
                        {/* Usamos aria-live assertive para mostrar el mensaje de error  */}
                        <p
                            ref={errorRef}
                            className={errorMessage ? "errorMessage" : "offscreen"}
                            aria-live="assertive" >
                            {errorMessage}
                        </p>

                        {/*FORMULARIO DE ENTRADA-LOGIN */}
                        <h2 id={id}>¡Bienvenida/o de nuevo!</h2>
                        <form className='form-signin' onSubmit={handleSubmit}>
                            <label id={id}
                                htmlFor="username">
                                Nombre de usuario
                            </label>

                            <input id={id}
                                className="input-signin username"
                                type="text"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                                required
                            />
                            <span>
                                <br />
                            </span>

                            <label id={id}
                                htmlFor="password">
                                Contraseña
                            </label>
                            <input id={id}
                                className="input-signin password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                            <span>
                                <br />
                            </span>
                            <p className='line-reset' id={id}>
                                Has olvidado tu clave de acceso?
                                <span className='line'>
                                    {/* {<Signup />} */}
                                    <a href="#" id={id}> Restablecer contraseña</a>
                                    {/* <NavLink to="#" id={id}> Restablecer contraseña</Navlink> */}
                                </span>
                            </p>
                            <button
                                className="btn-signin" >
                                Inicia sesión
                            </button>
                        </form>
                        <p className='line-signup' id={id}>
                            No tienes una cuenta? <br />
                            <span className="line">
                                {/* {<Signup />} */}
                                <a href="#" id={id}> Regístrate</a>
                            </span>
                        </p>
                    </section>
                )

            }
        </>
    )
}

export default Signin