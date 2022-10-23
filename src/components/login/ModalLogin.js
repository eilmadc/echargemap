import * as React from 'react';

import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Signup from './SignUp';
import Signin from './SignIn';
import '../../stylesheets/stylesModalLogin.css';


export const ModalLogin = ({ closeModal }) => {
    return (
        <div className='modal-login'>
            <div className='modal-login-header'>
                <h2 onClick={() => { closeModal(false); }}>
                    X
                </h2>
            </div>
            <div className='modal-login-body'>
                <div className='logo-login'>
                    <h2>Aqui va el Logo</h2>
                </div>
                <div className='tabs-login'>
                    <Tabs>
                        <TabList className="tabs-login-nav">
                            <Tab>Sign Up</Tab>
                            <Tab>Sign In</Tab>
                        </TabList>
                        <TabPanel className="tabs-login-body">
                             <Signup />
                        </TabPanel>
                        <TabPanel>
                            <Signin />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}