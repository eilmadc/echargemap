import '../../stylesheets/stylesSignIn.css';

import { useRef, useState, useEffect, useContext } from "react";
import React from 'react';
import AuthContext from "../../context/AuthServer";

/* AXIOS */
import axios from "../../api/axios";
const SIGNIN_URL = '/auth';


const Signin = () => {

    const { setAuth } = useContext(AuthContext);

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
            //backend------
            const response = await axios.post(
                SIGNIN_URL,
                JSON.stringify({ userName: userName, password: password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(JSON.stringify(response?.data));

            const accessToken = response?.data?.accessToken;

            const roles = response?.data?.roles;

            setAuth({userName, password, roles, accessToken});

            //end backend
            setUserName('');
            setPassword('');

            /*  Si todo ha sido validado correctamente
                validamos el formulario */
            setSuccess(true);
        } catch (e) {

            /* CONTROL DE ERRORES DE RESPUESTA DEL SERVIDOR*/

            if (!e?.response) {
                setErrorMessage('Sin Respuesta del Servidor.');
            } else if (e.response?.status === 400) {
                setErrorMessage('400: No existen Usuario ni Password');
            } else if (e.response?.status === 401) {
                setErrorMessage('401: Sin Autorizacion');
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
                        <h1>Sign In</h1>
                    </section>
                ) : (
                    <section section className="section-signin">
                        {/* Usamos aria-live assertive para mostrar el mensaje de error  */}
                        <p
                            ref={errorRef}
                            className={errorMessage ? "errorMessage" : "offscreen"}
                            aria-live="assertive" >
                            {errorMessage}
                        </p>

                        {/*FORMULARIO DE ENTRADA-LOGIN */}
                        <h2>¡Bienvenida/o de nuevo!</h2>
                        <form className='form-signin' onSubmit={handleSubmit}>
                            <label
                                htmlFor="username">
                                Nombre de usuario
                            </label>

                            <input
                                className="input-signin"
                                type="text"
                                id="username"
                                ref={userRef}
                                autocomplete="off"
                                onChange={(e) => setUserName(e.target.value)}
                                value={userName}
                                /*  onChange={(e) => setSuccess(true)} */
                                required
                            />
                            <span>
                                <br />
                            </span>

                            <label
                                htmlFor="password">
                                Contraseña
                            </label>
                            <input
                                className="input-signin"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                /*  onChange={(e) => setSuccess(true)} */
                                required
                            />
                            <span>
                                <br />
                            </span>
                            <p className='line-reset'>
                                Has olvidado tu clave de acceso?
                                <span className='line'>
                                    {/* {<Signup />} */}
                                    <a href="#"> Restablecer contraseña</a>
                                </span>
                            </p>
                            <button
                                className="btn-signin" >
                                Inicia sesión
                            </button>
                        </form>
                        <p className='line-signup'>
                            No tienes una cuenta? <br />
                            <span className="line">
                                {/* {<Signup />} */}
                                <a href="#"> Regístrate</a>
                            </span>
                        </p>
                    </section>
                )

            }
        </>
    )
}

export default Signin