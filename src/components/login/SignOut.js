import '../../stylesheets/stylesSignOut.css';
import { useRef, useState, useEffect } from "react";
import React from 'react';

const Signout = ({ closeModal, id, userLogged, setUserLogged }) => {

    console.log(userLogged);
    const errorRef = useRef();

    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);

/*     //Almacenar en Local Storage si el usuario esta logado en el servidor.
    useEffect(() => {
        localStorage.clear()
    }
    ,
        []); */

/*     useEffect(() => {
        userRef.current.focus();
    }, []) */

    const handleSubmit = async (e) => {

        e.preventDefault();
        setUserLogged(false);
        setSuccess(true);
        localStorage.removeItem("userLogged");

    }

    return (
        <>
            {
                success ? (
                    <section>
                        <br></br><br></br>
                        <h2>Has cerrado sesión satisfactoriamente</h2>
                        <h2>Hasta pronto!</h2>
                        <br></br><br></br><br></br><br></br><br></br><br></br>
                    </section>
                ) : (
                    <section className="section-signin">
                        {/* Usamos aria-live assertive para mostrar el mensaje de error  */}
                      {/*   <p
                            ref={errorRef}
                            className={errorMessage ? "errorMessage" : "offscreen"}
                            aria-live="assertive" >
                            {errorMessage}
                        </p>
 */}
                        {/*FORMULARIO DE SALIDA-LOGOUT */}
                        <h2 id={id}>Cerrar Sesion</h2>
                        {/* <form className='form-signout' onSubmit={handleSubmit}> */}
                            <br></br>
                            <h3>
                                ¿Estás seguro de cerrar la sesión?
                            </h3>
                            <br></br>
                            <span>
                                <br />
                            </span>

                            <button
                                className="btn-signout-accept"
                                onClick={handleSubmit} >
                                Aceptar
                            </button>
                            <button
                                className="btn-signout-cancel"
                                onClick={() => { closeModal(false); }} >
                                Cancelar
                            </button>
                   {/*      </form> */}
    
                    </section>
                )

            }
        </>
    )
}

export default Signout;