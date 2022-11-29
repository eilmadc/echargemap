import React from 'react'
import { useState } from 'react';
import stg from '../utils/stg';
export const SettingsGestionCuenta = ({ clickedButton }) => {

  const [show, setShow] = useState('');
  const [deleteAccountBtn, setDeleteAccountBtn] = useState(false);

  return (
    <>
      <section className='settings-container'>
        <div className='setting-header'>
          <div className='setting-title'>
            <h2 className='settingtitle manage-account'>Gestión de la cuenta</h2>
          </div>
          <div className='setting-desc'>
            <h3 className='desc manage-account'>Modifica datos privados de tu cuenta</h3>
          </div>
        </div>
        <div className='setting-body'>
          <div className='setting-manage-container'>
            <div className='manage-options'>
              <a role='button' className='cambio-contr' onClick={() => setShow('cambio-contr')}>Cambiar contraseña</a>
              {show === 'cambio-contr' ?
                <div className='nueva-contr-container'>
                  <div className='introduce-nueva-contr'>Introduce la nueva contraseña</div>
                  <div className='formulario-contr'>
                    <form className='antigua-contr'>
                      <div className='wrap-antigua-contr'>
                        <label className='antigua-contr'>Contraseña actual</label>
                        <input className='antigua-contr-input' type='text' name='antigua' value={stg.get('password')}/>
                      </div>
                    </form>
                    <form className='nueva-contr'>
                      <div className='wrap-nueva-contr'>
                        <label className='nueva-contr'>Nueva contraseña</label>
                        <input className='nueva-contr-input' type='text' name='nueva' />
                      </div>
                    </form>
                    <form className='repetir-contr'>
                      <div className='wrap-repetir-contr'>
                        <label className='repetir-contr'>Repite la nueva contraseña</label>
                        <input className='repetir-contr-input' type='text' name='repetir' />
                      </div>
                    </form>
                  </div>
                  <div className='save-button-container'>
                    <button className='save-button' type='submit' onClick={() => clickedButton(true)}>Guardar cambios</button>
                    <button className='discard-button' type='submit' onClick={() => clickedButton(true)}>Descartar cambios</button>
                  </div>
                </div>
                : null}
              <a role='button' className='borrar-cuenta' onClick={() => setShow('borrar-cuenta')}>Cancelar cuenta</a>
              {show === 'borrar-cuenta' ?
                <div className='borrar-cuenta-container'>
                  <div className='desc-borrar-cuenta'>Estás en proceso de borrar todos los datos de tu cuenta.</div>
                  <div className='nombre-usuario-logado'>{`Monica`/** rellenar con el nombre del usuario logado */},</div>
                  <div className='texto-borrar-cuenta'>si continúas, tu nombre, ubicación y correo electrónico así como tus comentarios y estaciones guardadas se eliminarán y no podrás volver a acceder a ellas.<br /><br />
                    Al hacer clic tu cuenta de eChargeMap será suprimida.<br />
                  </div>
                  <div className='delete-acc-button-container'>
                    <button className='discard-button' type='submit' onClick={() => setDeleteAccountBtn(true)}>Eliminar cuenta</button>
                  </div>
                </div>
                : null}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}