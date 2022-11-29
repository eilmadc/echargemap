import * as React from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Signup from './SignUp';
import Signin from './SignIn';
import '../../stylesheets/stylesModalLogin.css';
import LogoDarkGreen from '../../images/logo_darkGreen.png';
import LogoLightGreen from '../../images/logo_lightGreen.png';

import { AuthProvider } from '../../context/AuthProvider';
import { useState } from 'react';


export const ModalLogin = ({ closeModal, id, userLogged, setUserLogged }) => {

    //const [tabActiva, setTabActiva] = useState('');
    console.log(userLogged);

    return (
        <div className='modal-login' id={id}>
            <div className='modal-login-header' id={id}>
                <button className='fa-cross' onClick={() => { closeModal(false); }}>
                    X
                </button>
            </div>
            <div className='modal-login-body' id={id}>
                <div className='logo-login' id={id}>
                    <img src={id === 'lightMode' ? LogoDarkGreen : LogoLightGreen} className='logo' alt='logo' />
                    <h3 className='modal-login-echargemap' id={id}>eChargeMap</h3>
                </div>
                <div className='tabs-login' id={id}>
                    <Tabs>
                        <TabList className="tabs-login-nav">
                            <Tab tabname="signin" disabled={false} >Entrar</Tab>
                            <Tab tabname="signup" disabled={userLogged ? true : false} >Registro</Tab>
                        </TabList>
                        <TabPanel id='signin' className="tabs-login-body">
                            <AuthProvider>
                                <Signin id={id} userLogged={userLogged} setUserLogged={setUserLogged} />
                            </AuthProvider>
                        </TabPanel>
                        <TabPanel id='signup' className="tabs-login-body">
                            <Signup id={id} userLogged={userLogged} setUserLogged={setUserLogged} />
                        </TabPanel>
                    </Tabs>
                </div>
                {/* {link === "signin"
                    ? 
                    <Tab tabname="signup" disabled={userLogged ? true : false} >Registro</Tab>
                    : null}
                {link === "signup" ? <Signup id={id} userLogged={userLogged} setUserLogged={setUserLogged} link={setLink} /> : null} */}
            </div >
        </div >
    );
}