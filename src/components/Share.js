import React from "react";
import '../stylesheets/stylesModalLogin.css';
import { EmailShareButton, EmailIcon } from "react-share";
import { TelegramShareButton, TelegramIcon } from "react-share";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { WorkplaceShareButton, WorkplaceIcon } from "react-share";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import { OKShareButton } from "react-share";
import { GrGithub } from 'react-icons/gr';



export const Share = ({ id, closeModal }) => {

    const shareUrl = "http://localhost:3000";
    const title = "EchargeMap";

    return (
        <div className='modal-login' id={id}>
            <div className='modal-login-header' id={id}>
                <button className='fa-cross' onClick={() => { closeModal(false); }}>
                    X
                </button>
            </div>
            <div className='modal-share-body' id={id}>
                <h2 id={id}> Compartir web en: </h2>
                <p className="modal-share-body-p">
                <TelegramShareButton url={shareUrl} title={title}>
                    <TelegramIcon></TelegramIcon>
                </TelegramShareButton>
                <EmailShareButton url={shareUrl} title={title}>
                    <EmailIcon></EmailIcon>
                </EmailShareButton>
                <TwitterShareButton url={shareUrl} title={title}>
                    <TwitterIcon></TwitterIcon>
                </TwitterShareButton>
                <WorkplaceShareButton url={shareUrl} title={title}>
                    <WorkplaceIcon></WorkplaceIcon>
                </WorkplaceShareButton>
                <WhatsappShareButton url={shareUrl} title={title}>
                    <WhatsappIcon></WhatsappIcon>
                </WhatsappShareButton>
                </p>
            
            <br></br><br></br><br></br>

            <h2 id={id}> Nuestro Proyecto en: </h2>
                <p className="modal-share-body-p">
                    <a  href="https://github.com/eilmadc/echargemap" target="_blank" rel="noopener noreferrer">Cliente
                        <GrGithub style={{ opacity: '0.75', border:'none', color:'black'}} size={56} ></GrGithub>
                    </a>
                    
                    <a  href="https://github.com/cuckito/echargemap_server" target="_blank" rel="noopener noreferrer">Servidor
                        <GrGithub style={{ opacity: '0.75', border:'none', color:'black'}} size={56} ></GrGithub>
                    </a>
                    
                </p>
                <br></br><br></br><br></br><br></br><br></br><br></br>
            </div>
        </div>
    );
};

export default Share