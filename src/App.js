import './App.css';
import { ReactDimmer } from 'react-dimmer';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from "react";
import { Modal } from "./components/Modal";
import { Menu } from "./components/Menu";
import Map from './images/mapa.jpeg';
import './stylesheets/stylesMenu.css';
import './stylesheets/stylesModal.css';
import './stylesheets/stylesModalSignUp.css';
/*react-router-dom: Ruteo de Paths*/
/* import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"; */
import { ModalLogin } from './components/login/ModalLogin';

function App() {

  const [isModalOpen, setModal] = useState(false);
  const [isModalLoginOpen, setModalLogin] = useState(false);
  const [isMenuOpen, setMenu] = useState(false);


  const handleClick = () => {
    setModal((prevState) => !prevState);
  };

  const handleClickLogin = () => {
    setModalLogin((prevState) => !prevState);
  };

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <>
      <div className='App'>
        <div className='header'>
          <div className='nav'>
            <GiHamburgerMenu className='menu' onClick={handleMenu} />
            <h1>EChargeMap</h1>
            <div className='buttons'>
              <button className='home buttons-nav' onClick={handleClick}>Inicio </button>
              <button className='login buttons-nav' onClick={handleClickLogin}>Entrar </button>
              <button className='language buttons-nav' onClick={handleClick}>Idioma </button>
              <button className='share buttons-nav' onClick={handleClick}>Compartir </button>
            </div>
          </div>
        </div>
        <div className='body'>
          <div className='container-main'>
            <div className='container-map'>
              <img className='map-photo' src={Map} alt='mapa' />
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && <Modal closeModal={setModal} />}
      {isModalLoginOpen && <ModalLogin closeModal={setModalLogin} />}
      <Menu isMenuOpen={isMenuOpen} />

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
    </>
  );
}

export default App;