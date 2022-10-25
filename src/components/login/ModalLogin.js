import * as React from 'react';

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Signup from './SignUp';
import Signin from './SignIn';
import '../../stylesheets/stylesModalLogin.css';
import LogoDarkGreen from '../../images/logo_darkGreen.png';
import LogoLightGreen from '../../images/logo_lightGreen.png';


export const ModalLogin = ({ closeModal, mode }) => {
    return (
        <div className='modal-login' id={mode}>
            <div className='modal-login-header'>
                <button className='fa-cross' onClick={() => { closeModal(false); }}>
                    X
                </button>
            </div>
            <div className='modal-login-body'>
                <div className='logo-login'>
                    <img src={LogoDarkGreen} className='logo' alt='logo' />
                    <h3 classname='echargemap'>eChargeMap</h3>
                </div>
                <div className='tabs-login'>
                    <Tabs>
                        <TabList className="tabs-login-nav">
                            <Tab>Entrar</Tab>
                            <Tab>Registro</Tab>
                        </TabList>
                        <TabPanel className="tabs-login-body">
                             <Signin />
                        </TabPanel>
                        <TabPanel className="tabs-login-body">
                            <Signup />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}