import React from 'react';
import { VscCalendar } from "react-icons/vsc";

function divCtaBtn(){
    return (
        <div className="cta-btn" title="Realizar agendamento">
            <a href="/agendamento">
                <span className="material-icons"><VscCalendar/></span>
                Agende seu horário
            </a>
        </div>
    )
}

export default divCtaBtn;