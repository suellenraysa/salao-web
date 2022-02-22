import React from "react";

import "./styles.css";

interface ContainerMensagemProps {
    mensagem: string;
}

const ContainerMensagem: React.FC<ContainerMensagemProps> = ({ mensagem }) => {

    return (
        <div className="mensagem main-container">
            <div className="title-area">
            <div className="title-box">
                <h1 className="title">{mensagem}</h1>
            </div>
            </div>
        </div>
    )
}

export default ContainerMensagem;