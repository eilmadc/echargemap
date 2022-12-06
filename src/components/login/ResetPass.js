import '../../stylesheets/stylesSignOut.css';
import { useRef, useState, useEffect } from "react";
import React from 'react';
import md5 from 'md5';
/*Storage*/
import stg from '../../utils/stg';
/* ICONOS */
import { FaInfoCircle, FaCheck, FaTimes } from 'react-icons/fa';

/* LIBERIA AXIOS */
import axios from "../../api/axios";

const RESETPASSWORD_URL = '/backenduser.php';

const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%%]).{8,12}$/;
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;


const ResetPass = ({ id, closeModal, setUserLogged }) => {

    const method1 = 'readpass';
    const method2 = 'resetpass';

    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    /*PASSWORD*/
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    /*PASSWORD COINCIDENCIA*/
    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    /*MAIL*/
    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    /*Validacion de la contraseña*/
    useEffect(() => {

        /*Validacion de reglas para contraseña*/
        const result = PWD_REGEX.test(password);

        setValidPassword(result);

        /*Verificacion coincidencia de contraseña*/
        const match = password === matchPassword;
        setValidMatchPassword(match);

    }, [password, matchPassword])

    /*Validacion de email*/
    useEffect(() => {
        const result = EMAIL_REGEX.test(mail);
        setValidMail(result);
    }, [mail])

    useEffect(() => {
        setErrorMessage('');
    }, [password, matchPassword, mail])


    const handleSubmit = async (e) => {
        try {
            //e.preventDefault();
            const var2 = PWD_REGEX.test(password);
            const var3 = EMAIL_REGEX.test(mail);

            if (!var2 || !var3) {
                setErrorMessage("Invalid entry");
                return;
            }

            //TODO el servidor debe chequear si existe algun usuario con ese email
            //Error del servidor en readuser. envia readuser_ok sin tener datos crrectos.

            console.log('email: ' + mail);
            const response = await axios.post(
                RESETPASSWORD_URL,
                JSON.stringify({ method: method1, mail: mail }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            console.log(response.data.readpass);

            if (response.data.readpass) {


                //BACKEND----->
                const response2 = await axios.post(
                    RESETPASSWORD_URL,
                    JSON.stringify({ method: method2, password: md5(password), mail: mail }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );

                /*Validamos la respuesta del servidor: con el mensaje de response.data*/
                if (response2.data.resetpass) {

                    console.log(response2.data);

                    /*poner userLogged en true*/
                    //setUserLogged(true);

                    /*Almacenamiento local*/
/*                     stg.set('userLogged', true);
                    stg.set('username', response2.data.userName);
                    stg.set('password', (response2.data.password));
                    stg.set('name', response2.data.name);
                    stg.set('lastname', response2.data.lastname);
                    stg.set('email', response2.data.mail);
                    stg.set('location', response2.data.location); */

                    /*  Si todo ha sido validado correctamente
                        validamos success en el html*/
                    setSuccess(true);
                }
                else {
                    alert('Ha ocurrido un error de registro para el mail: ' + response.data2.email);
                    console.log(response2.data);
                    stg.set('userLogged', false);
                }

            } else {
                alert('No existe ningun usuario que se corresponda con este mail: ' + response.data.email);
                console.log(response.data[0][0]);
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
            //errorRef.current.focus();
        }
    }

    return (
        <>
            {
                success ? (
                    <section>
                        <br></br><br></br>
                        <h2>Constraseña reseteada correctamente</h2>
                        <br></br><br></br><br></br><br></br><br></br><br></br>
                    </section>
                ) : (
                    <section className="section-signin">

                        {/*FORMULARIO DE SALIDA-LOGOUT */}
                        <h2 id={id}>¿Has olvidado tu contraseña?</h2>
                        <form className='form-signup' onSubmit={handleSubmit}>

                            {/*  PASSWORD INPUT */}
                            <label id={id} htmlFor="password">
                                Contraseña nueva
                            </label>
                            <div className='validInvalidIcons'>

                                <input id={id}
                                    className="input-signup password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    aria-invalid={validPassword ? "false" : "true"}
                                    aria-describedby="passwordinfo"
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



                            {/*  CONFIRMACION DE PASSWORD INPUT */}
                            <label id={id}
                                htmlFor="confirm_password">
                                Confirmar contraseña
                            </label>
                            <div className='validInvalidIcons'>

                                <input id={id}
                                    className="input-signup confirm-password"
                                    type="password"
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


                            {/*  CONFIRMACION DE EMAIL */}
                            <label id={id}
                                htmlFor="email">
                                Correo electrónico
                            </label>

                            <div className='validInvalidIcons'>

                                <input id={id}
                                    className="input-signup mail"
                                    type="email"
                                    onChange={(e) => setMail(e.target.value)}
                                    required
                                    aria-invalid={validMail ? "false" : "true"}
                                    aria-describedby="mailinfo"
                                    onFocus={() => setMailFocus(true)}
                                    onBlur={() => setMailFocus(false)}
                                />
                                {/* Iconos de validacion de email*/}
                                <span
                                    className={validMail && mail ? "valid" : "hide"}
                                >
                                    <FaCheck />
                                </span>
                                <span
                                    className={validMail || !mail ? "hide" : "invalid"}
                                >
                                    <FaTimes />
                                </span>
                            </div>
                            {/* Mensaje de informacion del campo mail*/}
                            <p
                                id="mailinfo"
                                className={mailFocus && !validMail ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                Must have min 5 characters.
                                <br />
                            </p>


                            <button
                                className="btn-reset"
                                disabled={!validPassword || !validMail ? true : false}
                                onClick={handleSubmit}
                            >
                                Resetea Contraseña
                            </button>
                        </form>
                    </section>
                )
            }
        </>
    )
}

export default ResetPass;