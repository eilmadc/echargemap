import React from 'react';

function Modal({ closeModal }, props) {
    const isLogin = () => {
        console.log(props.paco);
        debugger;
        if (props.paco === 'login') {
             return 'login' 
            } else {
                 return '' 
            };
    };

    return (
        <div className={`modal ${isLogin()}`.trimEnd()}>
            <div className='modal-header'>
                <h2 onClick={() => { closeModal(false); }}>
                    X
                </h2>
            </div>
            <div className='modal-body'>
                <h2>Modal</h2>
            </div>
        </div>
    );
}

export default Modal;