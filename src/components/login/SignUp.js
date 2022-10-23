import { useRef, useState, useEffect } from "react";

import React from 'react';

import { FaInfoCircle, FaCheck, FaTimes } from 'react-icons/fa';
import SignIn from '../login/SignIn.js';
import '../../stylesheets/stylesSignUp.css';

/*react-router-dom: Ruteo de Paths*/
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom"; 

/* REGEX */
const NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,30}$/;
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{4,19}$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[.!@#$%%]).{8,12}$/;
const EMAIL_REGEX = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
const LOCATION_REGEX = /^[a-zA-Z]{5,30}$/;

/* SIGNUP en ECHARGEMAP */
const Signup = () => {
    const userRef = useRef();
    const errorRef = useRef();

    const [userName, setUserName] = useState('');
    const [validUserName, setValidUserName] = useState(false);
    const [userNameFocus, setUserNameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);


    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);
    const [nameFocus, setNameFocus] = useState(false);


    const [lastname, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastnameFocus, setLastNameFocus] = useState(false);

    const [mail, setMail] = useState('');
    const [validMail, setValidMail] = useState(false);
    const [mailFocus, setMailFocus] = useState(false);

    const [location, setLocation] = useState('');
    const [validLocation, setValidLocation] = useState(false);
    const [locationFocus, setLocationFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

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

    /*Validacion del nombre */
    useEffect(() => {
        const result = NAME_REGEX.test(name);
        setValidName(result);
    }, [name])

    /*Validacion de LastName */
    useEffect(() => {
        const result = NAME_REGEX.test(lastname);
        setValidLastName(result);
    }, [lastname])

    /*Validacion de email*/
    useEffect(() => {
        const result = EMAIL_REGEX.test(mail);
        setValidMail(result);
    }, [mail])

    /*Validacion de location*/
    useEffect(() => {
        const result = LOCATION_REGEX.test(location);
        setValidLocation(result);
    }, [location])

    useEffect(() => {
        setErrorMessage('');
    }, [userName, password, matchPassword, name, lastname, mail, location])

    /*  HANDLE para hacer el Submit del Formulario  de Registro
        así se crea un punto de control adicional al realizar los REGEX, 
        antes de hacer el submit*/
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const var1 = USER_REGEX.test(userName);
            const var2 = PWD_REGEX.test(password);
            const var3 = EMAIL_REGEX.test(mail);
            const var4 = LOCATION_REGEX.test(location);

            if (!var1 || !var2 || !var3 || !var4) {
                setErrorMessage("Invalid entry");
                return;
            }
            
            /*  Si todo ha sido validado correctamente
                validamos el formulario */
            setSuccess(true);
            console.log(success);

        } catch (e) {
            this.setState({ e });
            console.log("Error: " + e.message);
        }
    }

    /* FIN USE EFFECTS */
    return (
        <>
            { success ? (

                <section className="section-signup">
                    <h1> Success! </h1>
                    <p>
                         <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
                <section className="section-signup">
                    {/* Usamos aria-live assertive para mostrar el mensaje de error  */}
                    <p
                        ref={errorRef}
                        className={errorMessage ? "errorMessage" : "offscreen"}
                        aria-live="assertive"
                    >
                        {errorMessage}
                    </p>

                    {/*FORMULARIO DE REGISTRO */}
                    <h1> Join us now!</h1>

                    <form onSubmit={handleSubmit}>

                        {/*  USERNAME INPUT */}
                        <label
                            htmlFor="username">
                            Username:
                        </label>
                        <div>
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
                            <input
                                className="input-signup"
                                type="text"
                                id="username"
                                ref={userRef}
                                autocomplete="off"
                               onChange={(e) => setUserName(e.target.value)} 
                                /*  onChange={(e) => setSuccess(true)} */
                                required
                                aria-invalid={validUserName ? "false" : "true"}
                                aria-describedby="usernameinfo"
                                onFocus={() => setUserNameFocus(true)}
                                onBlur={() => setUserNameFocus(false)}
                            />
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


                        </div>

                        {/*  PASSWORD INPUT */}
                        <label
                            htmlFor="password">
                            Password:

                        </label>
                        <div>
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
                            <input
                                className="input-signup"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-invalid={validPassword ? "false" : "true"}
                                aria-describedby="passwordinfo"
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)}
                            />
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
                        </div>


                        {/*  CONFIRMACION DE PASSWORD INPUT */}
                        <label
                            htmlFor="confirm_password">
                            Confirm Password:
                        </label>
                        <div>
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
                            <input
                                className="input-signup"
                                type="password"
                                id="confirm_password"
                                onChange={(e) => setMatchPassword(e.target.value)}
                                required
                                aria-invalid={validMatchPassword ? "false" : "true"}
                                aria-describedby="confirminfo"
                                onFocus={() => setMatchPasswordFocus(true)}
                                onBlur={() => setMatchPasswordFocus(false)}
                            />
                            {/* Mensaje de informacion del campo de confirmacion de la password*/}
                            <p
                                id="confirminfo"
                                className={matchPasswordFocus && !validName ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                Must match the confirm password with password.
                                <br />
                            </p>
                        </div>

                        {/*  CONFIRMACION DE NAME */}
                        <label
                            htmlFor="name">
                            Name:
                        </label>

                        <div>
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
                            <input
                                className="input-signup"
                                type="text"
                                id="name"
                                onChange={(e) => setName(e.target.value)}
                                required
                                aria-invalid={validName ? "false" : "true"}
                                aria-describedby="nameinfo"
                                onFocus={() => setNameFocus(true)}
                                onBlur={() => setNameFocus(false)}
                            />
                            {/* Mensaje de informacion del campo Name*/}
                            <p
                                id="nameinfo"
                                className={nameFocus && !validName ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                Must have min 3 characters.
                                <br />
                            </p>
                        </div>


                        {/*  CONFIRMACION DE Apellido*/}
                        <label
                            htmlFor="lastname">
                            Last name:
                        </label>

                        <div>
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

                            <input
                                className="input-signup"
                                type="text"
                                id="lastname"
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                aria-invalid={validLastName ? "false" : "true"}
                                aria-describedby="lastnameinfo"
                                onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)}
                            />
                            {/* Mensaje de informacion del campo LastName*/}
                            <p
                                id="lastnameinfo"
                                className={lastnameFocus && !validLastName ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                Must have min 3 characters.
                                <br />
                            </p>
                        </div>

                        {/*  CONFIRMACION DE EMAIL */}
                        <label
                            htmlFor="email">
                            Email:
                        </label>

                        <div>
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
                            <input
                                className="input-signup"
                                type="email"
                                id="mail"
                                onChange={(e) => setMail(e.target.value)}
                                required
                                aria-invalid={validMail ? "false" : "true"}
                                aria-describedby="mailinfo"
                                onFocus={() => setMailFocus(true)}
                                onBlur={() => setMailFocus(false)}
                            />
                            {/* Mensaje de informacion del campo mail*/}
                            <p
                                id="mailinfo"
                                className={mailFocus && !validMail ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                Must have min 5 characters.
                                <br />
                            </p>
                        </div>


                        {/*  CONFIRMACION DE LOCATION */}
                        <label
                            htmlFor="location">
                            Location:
                        </label>
                        <div>
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
                            <input
                                className="input-signup"
                                type="text"
                                id="location"
                                onChange={(e) => setLocation(e.target.value)}
                                required
                                aria-invalid={validLocation ? "false" : "true"}
                                aria-describedby="locationinfo"
                                onFocus={() => setLocationFocus(true)}
                                onBlur={() => setLocationFocus(false)}
                            />
                            {/* Mensaje de informacion del campo location*/}
                            <p
                                id="locationinfo"
                                className={locationFocus && !validLocation ? "instructions-signup" : "offscreen"}
                            >
                                <FaInfoCircle />
                                Must have min 5 characters.
                                <br />
                            </p>
                        </div>


                        <button
                            className="btn-signup"
                            disabled={!validUserName || !validPassword || !validName || !validLastName || !validMail || !validLocation ? true : false}
                        >
                            Sign Up
                        </button>
                    </form>
                    <p>
                        Already signed up?<br />
                        <span className="line">
                            { }
                          <a href="#">Sign In</a>
                        </span>
                    </p>

                </section >
            )
            }
        </>
    )
}

export default Signup