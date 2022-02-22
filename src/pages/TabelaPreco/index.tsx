import React from "react";
import logo from "../../assets/images/logo.png";
import { FaRegHandPeace } from "react-icons/fa";
import { FiPhone, FiMail } from "react-icons/fi";
import { GiMaggot, GiFemaleLegs, GiHamburgerMenu } from "react-icons/gi";
import { MdExitToApp } from "react-icons/md";

import "./styles.css";
import Components from "../../components/CallToAction"

function TabelaPrecoPage(){
    function openClassOption(){
        document.querySelector('nav')?.classList.toggle('show')
    }

    return (
        <>
            <header className="header-tab-preco">
                <div className="menu-fixed"> 
                    <div className="contacts">
                        <div className="logo">
                        <img src={logo} alt="logo" />
                        </div>
        
                        <div className="direct-contacts">
                            <span className="material-icons"><FiPhone/></span> <p> (21)2404-0695 </p>
                            <span className="material-icons"><FiMail/></span> <p> E-mail: beauty_salao@gmail.com </p>
                        </div>
        
                        <div className="hamburguer" onClick={openClassOption}>
                            <span className="material-icons"><GiHamburgerMenu/></span>
                        </div>
        
                        <nav>
                            <ul>
                                <li><span className="material-icons"><MdExitToApp/></span><a href="/">Início</a></li>
                                <li><span className="material-icons"><GiMaggot/></span><a href="#cabelos">Cabelos</a></li>
                                <li><span className="material-icons"><FaRegHandPeace/></span><a href="#maos">Mãos e pés</a></li>
                                <li><span className="material-icons"><GiFemaleLegs/></span><a href="#depilacao">Depilação</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
    
            <main className="TabelaPreco_main-container">
                <section>
                    <div className="tab-title" id="cabelos">
                        <h1>Cabelos</h1>
                    </div>
                    <div className="tab-price">
                        <div className="card">
                            <h2>Cortes</h2>
    
                            <div className="tab-services">    
                                <span className="service-name">Masculino</span> <span className="service-price">R$20,00</span>
                                <span className="service-name">Feminino</span> <span className="service-price">R$20,00</span>
                                <span className="service-name">Infantil</span> <span className="service-price">R$22,00</span>
                            </div>
                        </div>
                                                                        
                        <div className="card">
                            <h2>Escova Definitiva</h2>
    
                            <div className="tab-services">
                                <span className="service-name">Médio</span> <span className="service-price">R$299,00</span>
                                <span className="service-name">Longo</span> <span className="service-price">R$350,00</span>
                                <span className="service-name">Retoque de Raiz(até 3 meses após)</span> <span className="service-price">R$180,00</span>
                            </div>
                        </div>
                        
                        <div className="card">
                            <h2>Reconstruções</h2>
    
                            <div className="tab-services">
                                <span className="service-name">Cauterização Curto</span> <span className="service-price">R$70,00</span>
                                <span className="service-name">Cauterização Médio</span> <span className="service-price">R$90,00</span>
                                <span className="service-name">Cauterização Longo</span> <span className="service-price">R$95,00</span>
                            </div>
                        </div>

                        <div className="card">
                            <h2>Escovar e Modelar</h2>
    
                            <div className="tab-services">
                                <span className="service-name">Escova Curto</span> <span className="service-price">R$19,00</span>
                                <span className="service-name">Escova Médio</span> <span className="service-price">R$23,00</span>
                                <span className="service-name">Escova Longo</span> <span className="service-price">R$28,00</span>
                                <span className="service-name">Piastra(curto sem escova)</span> <span className="service-price">R$20,00</span>
                                <span className="service-name">Piastra(longo sem escova)</span> <span className="service-price">R$26,00</span>
                                <span className="service-name">Baby Liss(sem escova)</span> <span className="service-price">R$30,00</span>
                            </div>
                        </div>

                        <div className="card">
                            <h2>Tonalizantes e colorações</h2>
    
                            <div className="tab-services">
                                <span className="service-name">Retoque Raiz(trazendo a tinta)</span> <span className="service-price">R$20,00</span>
                                <span className="service-name">Coloração sem secagem(trazendo a tinta)</span> <span className="service-price">R$25,00</span>
                                <span className="service-name">Curto(até 30cm)</span> <span className="service-price">R$50,00</span>
                                <span className="service-name">Médio(até 45cm)</span> <span className="service-price">R$62,00</span>
                                <span className="service-name">Longo(acima de 45cm)</span> <span className="service-price">R$75,00</span>
                            </div>
                        </div>
                    </div>
                </section>
    
                <section>
                    <div className="tab-title" id="maos">
                        <h1>Mãos e Pés</h1>
                    </div>
                    <div className="tab-price">
                        <div className="tab-services">
                            <span className="service-name">Pé ou Mão(segunda a quinta)</span> <span className="service-price">R$12,00</span>
                            <span className="service-name">Pé ou Mão(sexta ou sábado)</span> <span className="service-price">R$17,00</span>
                            <span className="service-name">SPA dos pés</span> <span className="service-price">R$28,00</span>
                            <span className="service-name">SPA das mãos</span> <span className="service-price">R$28,00</span>
                        </div>
    
                        <div className="tab-services">
                            <span className="service-name">Francesinha na mão</span> <span className="service-price">+R$4,00</span>
                            <span className="service-name">Francesinha no pé</span> <span className="service-price">+R$4,00</span>
                            <span className="service-name">Unhas de Acrigel</span> <span className="service-price">R$85,00</span>
                            <span className="service-name">Manutenção Acrigel(inclui cutilagem e esmaltação)</span> <span className="service-price">R$75,00</span>
                        </div>
                    </div>
                </section>
    
                <section>
                    <div className="tab-title" id="depilacao">
                        <h1>Depilação</h1>
                    </div>
                    <div className="tab-price">
                        <div className="tab-services">
                            <span className="service-name">Axila</span> <span className="service-price">R$16,00</span>
                            <span className="service-name">Buço</span> <span className="service-price">R$10,00</span>
                            <span className="service-name">Braços</span> <span className="service-price">R$18,00</span>
                            <span className="service-name">Meia Perna</span> <span className="service-price">R$22,00</span>
                            <span className="service-name">Perna Inteira</span> <span className="service-price">R$30,00</span>
                        </div>
    
                        <div className="tab-services">
                            <span className="service-name">Sobrancelha com cera</span> <span className="service-price">R$16,00</span>
                            <span className="service-name">Sobrancelha com pinça</span> <span className="service-price">R$14,00</span>
                            <span className="service-name">Tricotomia(púbis, virilha e ânus)</span> <span className="service-price">R$40,00</span>
                            <span className="service-name">Virilha</span> <span className="service-price">R$22,00</span>
                            <span className="service-name">Virilha Cavada</span> <span className="service-price">R$30,00</span>
                        </div>
                    </div>
                </section>
    
                <Components/>
            </main>

            <footer>
                <p>Made by B²CS&copy;</p>
            </footer>
        </>
    )
}

export default TabelaPrecoPage;