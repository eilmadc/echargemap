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
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,19}$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%%]).{8,12}$/;
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;


const ResetPass = ({ closeModal, id, userLogged, setUserLogged }) => {

    const method = 'updateuser';
    const userRef = useRef();
    const errorRef = useRef();
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    /*USERNAME */
    const [userName, setUserName] = useState('');
    const [validUserName, setValidUserName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);

    /*PASSWORD*/
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    /*PASSWORD COINCIDENCIA*/
    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    /* NOMBRE DE USUARIO*/
    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);

    /*APELLIDO*/
    const [lastname, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastnameFocus, setLastNameFocus] = useState(false);

    /*MAIL*/
    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    /*MUNICIPIO(location)*/
    const [location, setLocation] = useState('');
    const [validLocation, setValidLocation] = useState(false);
    const [locationFocus, setLocationFocus] = useState(false);


    /* USE EFFECTs */
    useEffect(() => {
        userRef.current.focus();
    }, [])

    /*Validacion del nombre de usuario */
    useEffect(() => {
        const result = USER_REGEX.test(userName);
        setValidUserName(result);
    }, [userName])

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
    }, [userName, password, matchPassword, name, lastname, mail, location])


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const var1 = USER_REGEX.test(userName);
            const var2 = PWD_REGEX.test(password);
            const var3 = EMAIL_REGEX.test(mail);

            if (!var1 || !var2 || !var3) {
                setErrorMessage("Invalid entry");
                return;
            }

            //BACKEND----->
            const response = await axios.post(
                RESETPASSWORD_URL,
                JSON.stringify({ method: method, userName: userName, password: md5(password), name: name, lastname: lastname, mail: mail, location: location }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            /*Validamos la respuesta del servidor: con el mensaje de response.data*/
            if (response.data.updateuser) {

                console.log(response.data);

                /*poner userLogged en true*/
                setUserLogged(true);

                /*Almacenamiento local*/
                stg.set('userLogged', true);
                stg.set('username', response.data.userName);
                stg.set('password', (response.data.password));
                stg.set('name', response.data.name);
                stg.set('lastname', response.data.lastname);
                stg.set('email', response.data.email);
                stg.set('location', response.data.location);

                /*  Si todo ha sido validado correctamente
                    validamos success en el html*/
                setSuccess(true);
            }
            else {
                alert('Ha ocurrido un error de registro para el usuario: ' + response.data.userName);
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
                        <h2>Constraseña reseteada correctamente</h2>
                        <br></br><br></br><br></br><br></br><br></br><br></br>
                    </section>
                ) : (
                    <section className="section-signin">

                        {/*FORMULARIO DE SALIDA-LOGOUT */}
                        <h2 id={id}>Reset Password</h2>
                        <br></br>
                        <h3>
                            ¿Has olvidado tu contraseña?
                        </h3>

                        <form className='form-signup' onSubmit={handleSubmit}>

                            {/*  USERNAME INPUT */}
                            <label id={id}
                                htmlFor="username">
                                Nombre de usuario
                            </label>
                            <div className='validInvalidIcons'>
                                <input id={id}
                                    className="input-signup username"
                                    type="text"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUserName(e.target.value)}
                                    /*  onChange={(e) => setSuccess(true)} */
                                    required
                                    aria-invalid={validUserName ? "false" : "true"}
                                    aria-describedby="usernameinfo"
                                    onFocus={() => setUserNameFocus(true)}
                                    onBlur={() => setUserNameFocus(false)}
                                />

                                {/* Iconos de validación de regex en username */}
                                <span
                                    className={validUserName ? "valid" : "hide"}
                                >
                                    <FaCheck />
                                </span>
                                <span
                                    className={validUserName || !userName ? "hide" : "invalid"}
                                >
                                    <FaTimes />
                                </span>
                            </div>
                            {/* Mensaje de información del campo del usuairo*/}
                            <p
                                id="usernameinfo"
                                className={userNameFocus && userName && !validUserName ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                5 to 20 characters <br />
                                Must begin with a letter <br />
                                Characters allowed: 0-9, a - z,  A - Z  and "_"<br />
                                Example: My_username2
                            </p>




                            {/*  PASSWORD INPUT */}
                            <label id={id}
                                htmlFor="password">
                                Contraseña

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
                                className={matchPasswordFocus && !validName ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                Must match the confirm password with password.
                                <br />
                            </p>


                            {/*  CONFIRMACION DE NAME */}
                            <label id={id}
                                htmlFor="name">
                                Nombre
                            </label>

                            <div className='validInvalidIcons'>

                                <input id={id}
                                    className="input-signup name"
                                    type="text"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="nameinfo"
                                    onFocus={() => setNameFocus(true)}
                                    onBlur={() => setNameFocus(false)}
                                />
                                {/* Iconos de validacion de nombre*/}
                                <span
                                    className={validName && name ? "valid" : "hide"}
                                >
                                    <FaCheck />
                                </span>
                                <span
                                    className={validName || !name ? "hide" : "invalid"}
                                >
                                    <FaTimes />
                                </span>
                            </div>
                            {/* Mensaje de informacion del campo Name*/}
                            <p
                                id="nameinfo"
                                className={nameFocus && !validName ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                Must have min 3 characters.
                                <br />
                            </p>



                            {/*  CONFIRMACION DE Apellido*/}
                            <label id={id}
                                htmlFor="lastname">
                                Apellidos
                            </label>

                            <div className='validInvalidIcons'>

                                <input id={id}
                                    className="input-signup lastname"
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    aria-invalid={validLastName ? "false" : "true"}
                                    aria-describedby="lastnameinfo"
                                    onFocus={() => setLastNameFocus(true)}
                                    onBlur={() => setLastNameFocus(false)}
                                />
                                {/* Iconos de validacion de Apellido*/}
                                <span
                                    className={validLastName && lastname ? "valid" : "hide"}
                                >
                                    <FaCheck />
                                </span>
                                <span
                                    className={validLastName || !lastname ? "hide" : "invalid"}
                                >
                                    <FaTimes />
                                </span>
                            </div>
                            {/* Mensaje de informacion del campo LastName*/}
                            <p
                                id="lastnameinfo"
                                className={lastnameFocus && !validLastName ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                Must have min 3 characters.
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



                            {/*  CONFIRMACION DE LOCATION */}
                            <label id={id}
                                htmlFor="location">
                                Ubicación
                            </label>
                            <div className='validInvalidIcons'>

                                <input id={id}
                                    className="input-signup location"
                                    type="text"
                                    onChange={(e) => setLocation(e.target.value)}
                                    required
                                    aria-invalid={validLocation ? "false" : "true"}
                                    aria-describedby="locationinfo"
                                    onFocus={() => setLocationFocus(true)}
                                    onBlur={() => setLocationFocus(false)}
                                />
                                {/* Iconos de validacion de location*/}
                                <span
                                    className={validLocation && location ? "valid" : "hide"}
                                >
                                    <FaCheck />
                                </span>
                                <span
                                    className={validLocation || !location ? "hide" : "invalid"}
                                >
                                    <FaTimes />
                                </span>
                            </div>
                            {/* Mensaje de informacion del campo location*/}
                            <p
                                id="locationinfo"
                                className={locationFocus && !validLocation ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                Must have min 5 characters.
                                <br />
                            </p>



                            <button
                                className="btn-signup"
                                disabled={!validUserName || !validPassword || !validName || !validLastName || !validMail || !validLocation ? true : false}
                            >
                                Crea tu cuenta
                            </button>
                        </form>
                    </section>
                )
            }
        </>
    )
}

export default ResetPass;