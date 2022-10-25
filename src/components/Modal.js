import React from 'react';

function Modal({ closeModal }) {

    return (
        <div className='modal' >
            <div className='modal-header'>
                <button className='fa-cross' onClick={() => { closeModal(false); }}>
                   
                </button>
            </div>
            <div className='modal-body'>
                <h2>Modal</h2>
            </div>
        </div>
    );
}

export default Modal;
