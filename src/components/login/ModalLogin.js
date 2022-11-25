import * as React from 'react';
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Signup from './SignUp';
import Signin from './SignIn';
import '../../stylesheets/stylesModalLogin.css';
import LogoDarkGreen from '../../images/logo_darkGreen.png';
import LogoLightGreen from '../../images/logo_lightGreen.png';

import { AuthProvider } from '../../context/AuthProvider';


//const logged = false;
export const ModalLogin = ({ closeModal, id, userLogged, setUserLogged }) => {
    
    //const [userLogged, setUserLogged] = useState(localStorage.getItem('userLogged') || false);
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
                        <TabPanel className="tabs-login-body">
                            <AuthProvider>
                                <Signin id={id} userLogged={userLogged} setUserLogged={setUserLogged} />
                            </AuthProvider>
                        </TabPanel>
                        <TabPanel className="tabs-login-body">
                            <Signup id={id} userLogged={userLogged} setUserLogged={setUserLogged}/>
                        </TabPanel>
                    </Tabs>
                </div>
            </div >
        </div >
    );
}