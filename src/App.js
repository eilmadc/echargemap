import './App.css';
import './stylesheets/stylesMenu.css';
import './stylesheets/stylesModal.css';
import './stylesheets/darkMode.css';
import './stylesheets/lightMode.css';
import './stylesheets/About.css';
import './stylesheets/stylesModalContact.css';
import './stylesheets/stylesModalSettings.css';
import { ReactDimmer } from 'react-dimmer';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { ModalLogin } from '../src/components/login/ModalLogin';
import { Menu } from "./components/Menu";
import Map from './images/mapa.jpeg';
import MapDark from './images/mapaDark.png';
import ReactSwitch from 'react-switch';
import LogoDarkGreen from './images/logo_darkGreen.png';
import LogoLightGreen from './images/logo_lightGreen.png';
import { About } from './components/About';
import { ModalContact } from './components/ModalContact';
import { ModalSettings } from './components/ModalSettings';

/*react-router-dom: Ruteo de Paths*/
/* import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";  */

function App() {

  const [mode, setMode] = useState(localStorage.getItem('mode') || 'lightMode');

  const toggleButton = () => {
    if (mode === 'lightMode') {
      setMode('darkMode');
    } else {
      setMode('lightMode');
    }
  };

  useEffect(() => {
    localStorage.setItem('mode', mode);
    document.body.className = mode;
  }, [mode]);

  const [isModalOpen, setModal] = useState(false);
  const [isModalLoginOpen, setModalLogin] = useState(false);
  const [isModalContactOpen, setModalContact] = useState(false);
  const [isModalSettingsOpen, setModalSettings] = useState(false);
  const [isMenuOpen, setMenu] = useState(false);

  const [paginaActiva, setPaginaActiva] = useState('paginaInicio');

  const handleClick = () => {
    setModal((prevState) => !prevState);
  };

  const handleClickLogin = () => {
    setModalLogin((prevState) => !prevState);
  };

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  const handleClickContact = () => {
    setModalContact((prevState) => !prevState);
  };

  const handleClickSettings = () => {
    setModalSettings((prevState) => !prevState);
  }

  return (
    <>
      <div className='App' id={mode}>

        <div className='nav' id={mode} >
          <GiHamburgerMenu className='menu-icon' id={mode} size={50} onClick={handleMenu} />
          <div className='echargemap'>
            <img id={mode} src={mode === 'lightMode' ? LogoDarkGreen : LogoLightGreen} alt='logo' className='logo' onClick={() => setPaginaActiva('paginaInicio')} />
            <h1 id={mode} onClick={() => setPaginaActiva('paginaInicio')} className='title'>eChargeMap</h1>
          </div>
          <div className='buttons'>
            <button className='login buttons-nav' id={mode} onClick={handleClickLogin}>Entrar </button>
            <button className='language buttons-nav' id={mode} onClick={handleClick}>Idioma </button>
            <button className='share buttons-nav' id={mode} onClick={handleClick}>Compartir </button>
            <ReactSwitch id='switch'
              onChange={toggleButton}
              checked={mode === 'darkMode'}
              onColor='#dddddd'
              uncheckedIcon={
                <div className='iconDark'
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 15,
                    paddingRight: 2
                  }}>
                  <svg enableBackground="new 0 0 512 512" height="512px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="512px">
                    <path d="M349.852,343.15c-49.875,49.916-131.083,49.916-181,0c-49.916-49.918-49.916-131.125,0-181.021  
                        c13.209-13.187,29.312-23.25,47.832-29.812c5.834-2.042,12.293-0.562,16.625,3.792c4.376,4.375,5.855,10.833,3.793,16.625  
                        c-12.542,35.375-4,73.666,22.25,99.917c26.209,26.228,64.5,34.75,99.916,22.25c5.792-2.062,12.271-0.582,16.625,3.793  
                        c4.376,4.332,5.834,10.812,3.771,16.625C373.143,313.838,363.06,329.941,349.852,343.15z M191.477,184.754  
                        c-37.438,37.438-37.438,98.354,0,135.771c40,40.021,108.125,36.416,143-8.168c-35.959,2.25-71.375-10.729-97.75-37.084  
                        c-26.375-26.354-39.333-61.771-37.084-97.729C196.769,179.796,194.039,182.192,191.477,184.754z" fill="#1D1D1B" /></svg>
                </div>
              }
              checkedIcon={
                <div className='iconLight'
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    onColor: '#8dd7cf',
                    fontSize: 5,
                    fontWeight: 500,
                    paddingLeft: 2,
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-sun" viewBox="0 0 16 16">
                    <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0
                        13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 
                        8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 
                        0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 
                        .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                  </svg>
                </div>
              }
              handleDiameter={23}
              height={30}
              width={60}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" />
          </div>
          <div className='logout'>
            <a href="#" className='btn-logout' id={mode}>Cerrar Sesión</a>
          </div>
        </div>

        {isModalOpen ? <Modal closeModal={setModal} /> : null}
        {isModalLoginOpen ? <ModalLogin id={mode} closeModal={setModalLogin} /> : null}


        <Menu id={mode} isMenuOpen={isMenuOpen} setMenu={setMenu} activa={setPaginaActiva} openModalContact={handleClickContact} openModalSettings={handleClickSettings}/>

        {/*isModalContactOpen ? <Modal closeModal={setModal} /> : null*/}
        {isModalContactOpen ? <ModalContact id={mode} closeModal={setModalContact} /> : null}
        {isModalSettingsOpen ? <ModalSettings id={mode} closeModal={setModalSettings} /> : null}

        {paginaActiva === "Nosotros" ? <About id={mode} activa={setPaginaActiva} menu={setMenu} /> : null}

        {paginaActiva === "paginaInicio" ?
          <div className='body' id={mode}>
            <div className='container-main'>
              <div className='container-map'>
                <img className='map-photo' id={mode} src={mode === 'lightMode' ? Map : MapDark} alt='mapa' />
              </div>
            </div>
          </div>
          : null}


      </div>


      <ReactDimmer
        isOpen={isModalOpen}
        exitDimmer={setModal}
        zIndex={100}
        blur={1.5}
      />

      <ReactDimmer
        isOpen={isModalLoginOpen}
        exitDimmer={setModalLogin}
        zIndex={100}
        blur={1.5}
      />

      <ReactDimmer
        isOpen={isMenuOpen}
        exitDimmer={setMenu}
        zIndex={100}
        blur={1.5}
      />

      <ReactDimmer
        isOpen={isModalContactOpen}
        exitDimmer={setModalContact}
        zIndex={100}
        blur={1.5}
      />
    </>

  );
}

export default App;