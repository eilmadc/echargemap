import * as React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import foto1 from '../images/stock_photo1.jpg';
import foto2 from '../images/stock_photo2.jpg';
import foto3 from '../images/stock_photo3.jpg';
import LogoDarkGreen from '../images/logo_darkGreen.png';
import LogoLightGreen from '../images/logo_lightGreen.png';
import TwitterIconLight from '../images/twitter-icon-light.png';
import TwitterIconDark from '../images/twitter-icon-dark.png';

export const About = ({ id, menu }) => {

  /*Cerrar menú lateral una vez se muestra la página*/
  useEffect(() => {
    menu(false);
  }, []);


  return (

    <>
      <div className='about-container' id={id}>
        <div className='about-title'>
          <h1 className='about-us'>Sobre nosotros</h1>
        </div>
        <div className='about-body'>
          <div className='about-echargemap'>
            <h3 className='what' id={id}>Qué hacemos</h3>
            <p className='what-text' id={id}>Desde eChargeMap ayudamos a personas y empresas a encontrar con facilidad puntos de recarga para sus vehículos eléctricos en
              Cataluña.<br />
              <br /> Buscamos crear comunidad entre los usuarios, empresas y municipios para encontrar puntos de recarga inteligentes y de vanguardia para fomentar su uso.<br />
              <br /> Además queremos poner en contacto a estos usuarios con la finalidad de mejorar la red de cargadores, su mantenimiento así como de que puedan poner en conocimiento ciertos aspectos
              que se escaparian de paginas "convencionales" como tiempos de espera, afluencia en determinadas horas e incluso puntuaje de eficiencia energetica.


            </p>
          </div>
          <div className='about-developers'>
            <h3 className='who' id={id}>Quiénes somos</h3>
            <p className='who-text' id={id}>
              En eChargeMap somos unos apasionados de la tecnologia que trabajamos para ofrecer soluciones 360 que a su vez puedan ayudar a cambiar el mundo.<br />
              <br />Creemos que un eco es posible y trabajamos para aportar nuestro granito de arena que esperamos cada vez sea más grande.<br />
              <br />Este granito de arena lo ponemos entre los 3 integrantes que podras conocer un poco mas abajo...
            </p>
            <div className='about-photos'>
              <div className='wrapper-photos'>
                <div className='profile-card' id={id}>
                  <div className='img'>
                    <img src={foto1} />
                  </div>
                  <div className='caption' id={id}>
                    <h2>Elena</h2>
                    <p>Frontend Developer</p>
                  </div>
                </div>
                <div className='profile-card' id={id}>
                  <div className='img'>
                    <img src={foto2} />
                  </div>
                  <div className='caption' id={id}>
                    <h2>Alejandro</h2>
                    <p>Backend Developer</p>
                  </div>
                </div>
                <div className='profile-card' id={id}>
                  <div className='img'>
                    <img src={foto3} />
                  </div>
                  <div className='caption' id={id}>
                    <h2>Mònica</h2>
                    <p>Designer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='footer' id={id}>
          {/*<a className='back' onClick={() => activa('paginaInicio')}>Volver al mapa</a>*/}
          <div className='echargemap-footer'>
            <p id={id} className='copyright'>©2022ECHARGEMAP</p>
            <img id={id} className='logo-footer' src={id === 'lightMode' ? LogoDarkGreen : LogoLightGreen} alt='logo' />
            <div className='socialmediaicons'>
              <img id={id} className='socialmedia twitter' src={id === 'lightMode' ? TwitterIconDark : TwitterIconLight}></img>
              <img id={id} className='socialmedia twitter' src={id === 'lightMode' ? TwitterIconDark : TwitterIconLight}></img>
              <img id={id} className='socialmedia twitter' src={id === 'lightMode' ? TwitterIconDark : TwitterIconLight}></img>
            </div>
            {/*<h1 id={id} className='title-footer'>eChargeMap</h1>*/}
          </div>

        </div>
      </div>
    </>
  );
}

