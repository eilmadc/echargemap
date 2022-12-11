import '../../stylesheets/stylesSignOut.css';
import { useState } from "react";
import React from 'react';
import stg from '../../utils/stg';

const Signout = ({ closeModal, id, userLogged, setUserLogged }) => {

    console.log(userLogged);

    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUserLogged(false);
        setSuccess(true);
        stg.clear();
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

                        {/*FORMULARIO DE SALIDA-LOGOUT */}
                        <h2 id={id}>Cerrar Sesión</h2>
                        <br></br>
                        <h2 id={id}>
                            ¿Estás seguro de cerrar la sesión?
                        </h2>
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
                    </section>
                )
            }
        </>
    )
}

export default Signout;