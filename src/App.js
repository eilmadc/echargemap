import './App.css';
import './stylesheets/stylesMenu.css';
import './stylesheets/stylesModal.css';
import './stylesheets/darkMode.css';
import './stylesheets/lightMode.css';
import { ReactDimmer } from 'react-dimmer';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import { Menu } from "./components/Menu";
import Map from './images/mapa.jpeg';
import MapDark from './images/mapaDark.png';
import ReactSwitch from 'react-switch';


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
  const [isMenuOpen, setMenu] = useState(false);

  const handleClick = () => {
    setModal((prevState) => !prevState);
  };

  const handleMenu = () => {
    setMenu((prevState) => !prevState);
  };

  return (
    <>
      <div className='App' id={mode}>
        <header>
          <div className='nav' id={mode} >
            <GiHamburgerMenu className='menu-icon' id={mode} size={50} onClick={handleMenu} />
            <h1 id={mode}>EChargeMap</h1>
            <div className='buttons'>
              <button className='login buttons-nav' id={mode} onClick={handleClick}>Entrar </button>
              <button className='language buttons-nav' id={mode} onClick={handleClick}>Idioma </button>
              <button className='share buttons-nav' id={mode} onClick={handleClick}>Compartir </button>
                <ReactSwitch
                  onChange={toggleButton}
                  checked={mode === 'darkMode'}
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
                        fontSize: 5,
                        fontWeight: 500,
                        paddingLeft: 2,
                        color: '#8DD7CF'
                      }}>
                      <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><title /><g id="Sun"><circle cx="32" cy="32" r="15" /><path d="M32,13a1,1,0,0,1-1-1V3a1,1,0,0,1,2,0v9A1,1,0,0,1,32,13Z" />
                        <path d="M17.8574,18.8579a.9964.9964,0,0,1-.707-.293l-4.2422-4.2426a1,1,0,1,1,1.4141-1.4141l4.2422,4.2427a1,1,0,0,1-.7071,1.707Z" /><path d="M12,33H3a1,1,0,0,1,0-2h9a1,1,0,0,1,0,2Z" />
                        <path d="M13.6152,51.3848a1,1,0,0,1-.707-1.7071L17.15,45.4351a1,1,0,1,1,1.4141,1.414l-4.2422,4.2427A.9969.9969,0,0,1,13.6152,51.3848Z" /><path d="M32,62a1,1,0,0,1-1-1V52a1,1,0,0,1,2,0v9A1,1,0,0,1,32,62Z" />
                        <path d="M50.3848,51.3848a.9969.9969,0,0,1-.7071-.293l-4.2422-4.2427a1,1,0,1,1,1.4141-1.414l4.2422,4.2426a1,1,0,0,1-.707,1.7071Z" /><path d="M61,33H52a1,1,0,0,1,0-2h9a1,1,0,0,1,0,2Z" />
                        <path d="M46.1426,18.8579a1,1,0,0,1-.7071-1.707l4.2422-4.2427a1,1,0,0,1,1.4141,1.4141L46.85,18.5649A.9964.9964,0,0,1,46.1426,18.8579Z" /></g></svg>
                    </div>

                  }
                  handleDiameter={23}
                  height={30}
                  width={60}
                  boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                  activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)" />
              </div>
            
          </div>
        </header>


        <div className='body'>
          <div className='container-main'>
            <div className='container-map'>
              <img className='map-photo' id={mode} src={mode === 'lightMode' ? Map : MapDark} alt='mapa' />
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