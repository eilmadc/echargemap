import * as React from 'react';
import '../../stylesheets/stylesModalLogin.css';
import ResetPass from './ResetPass';

export const ModalResetPass = ({ closeModal, id, userLogged, setUserLogged }) => {
    return (
        <div className='modal-login' id={id}>
            <div className='modal-login-header' id={id}>
                <button className='fa-cross' onClick={() => { closeModal(false); }} >
                    X
                </button>
            </div>
            <div className='modal-login-body' id={id}>
                <ResetPass id={id} userLogged={userLogged} setUserLogged={setUserLogged} closeModal={closeModal} />
            </div >
        </div >
    );
}