import { useRef, useState, useEffect } from "react";
import React from 'react';

import '../../stylesheets/stylesSignIn.css';


const Signin = ({ id }) => {

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
            setUserName('');
            setPassword('');
            /*  Si todo ha sido validado correctamente
                validamos el formulario */
            setSuccess(true);
        } catch (e) {
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
                                /*  onChange={(e) => setSuccess(true)} */
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
                                /*  onChange={(e) => setSuccess(true)} */
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