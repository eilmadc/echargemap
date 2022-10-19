import * as React from 'react';

export const Modal = ({ closeModal }) => {
    return (
        <div className='modal'>
            <div className='modal-header'>
                <h2 onClick={() => {closeModal(false);}}>
                    X
                </h2>
            </div>
            <div className='modal-body'>
                <h2>Modal</h2>
            </div>
        </div>
    );
}