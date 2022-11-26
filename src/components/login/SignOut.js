import '../../stylesheets/stylesSignOut.css';
import { useState } from "react";
import React from 'react';
import stg from '../../utils/stg';

const Signout = ({ closeModal, id, userLogged, setUserLogged }) => {

    console.log(userLogged);

    const [success, setSuccess] = useState(false);

    /*     //Limpiar Local Storage si el usuario esta logado en el servidor.
        useEffect(() => {
            localStorage.clear()
        }
        ,
            []); */

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
                        <h2 id={id}>Cerrar Sesion</h2>
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
                    </section>
                )
            }
        </>
    )
}

export default Signout;