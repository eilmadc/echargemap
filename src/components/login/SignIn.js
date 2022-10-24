import { useRef, useState, useEffect } from "react";
import React from 'react';

import '../../stylesheets/stylesSignIn.css';


const Signin = () => {

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
                        <h2>Welcome Back</h2>
                        <form onSubmit={handleSubmit}>
                            <label
                                htmlFor="username">
                                Username:
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

                            <label
                                htmlFor="password">
                                Password:
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
<p>
                            I don't remember and i want to reset my password <br />
                            <span className="line-reset">
                                {/* {<Signup />} */}
                                <a href="#">Reset Password</a>
                            </span>
                        </p>
                            <button
                                className="btn-signin" >
                                Login
                            </button>
                        </form>
                        <p>
                            I haven't an account. I want create one <br />
                            <span className="line">
                                {/* {<Signup />} */}
                                <a href="#">Sign Up</a>
                            </span>
                        </p>
                    </section>
                )

            }
        </>
    )
}

export default Signin