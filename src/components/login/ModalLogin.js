import * as React from 'react';
import { useState } from 'react';
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import Signup from './SignUp';
import Signin from './SignIn';
import ResetPass from './ResetPass';
import '../../stylesheets/stylesModalLogin.css';
import LogoDarkGreen from '../../images/logo_darkGreen.png';
import LogoLightGreen from '../../images/logo_lightGreen.png';
import stg from '../../utils/stg';

//import { AuthProvider } from '../../context/AuthProvider';


export const ModalLogin = ({ closeModal, id, userLogged, setUserLogged }) => {

  console.log(userLogged);
  const [resetPassword, setResetPassword] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  

  stg.set('userLogged', userLogged);

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
          <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
            <TabList className="tabs-login-nav">
              <Tab tabname="signin" disabled={false} onClick={() => setResetPassword(false)}>Entrar</Tab>
              <Tab tabname="signup" disabled={userLogged ? true : false}  >Registro</Tab>
            </TabList>
            <TabPanel id='signin' className="tabs-login-body">
              {resetPassword ? <ResetPass id={id} userLogged={userLogged} setUserLogged={setUserLogged} setResetPassword={setResetPassword} />
                : <Signin id={id} userLogged={userLogged} setUserLogged={setUserLogged} setResetPassword={setResetPassword} setTabIndex={setTabIndex}/>}
            </TabPanel>
            <TabPanel id='signup' className="tabs-login-body" >
              <Signup id={id} userLogged={userLogged} setUserLogged={setUserLogged} setTabIndex={setTabIndex} />
            </TabPanel>
          </Tabs>
        </div>
      </div >
    </div >
  );
}