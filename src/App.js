import './App.css';
import { ReactDimmer } from 'react-dimmer';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useState } from "react";
import { Modal } from "./components/Modal";
import { Menu } from "./components/Menu";
import Map from './images/mapa.jpeg';
import './stylesheets/stylesMenu.css';
import './stylesheets/stylesModal.css';

function App() {

  const [isModalOpen, setModal] = useState(false);
  const [isMenuOpen, setMenu] = useState(false);

  const handleClick = () => {
    setModal((prevState) => !prevState);
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
              <button className='login buttons-nav' onClick={handleClick}>Entrar </button>
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
      <Menu isMenuOpen={isMenuOpen} />

      <ReactDimmer
        isOpen={isModalOpen}
        exitDimmer={setModal}
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