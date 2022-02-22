import React from "react";
import { AiOutlineStar } from "react-icons/ai";
import { FiPhone, FiMail } from "react-icons/fi";
import { MdAttachMoney, MdExitToApp } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import tratamento from "../../assets/images/tratamento.jpg";
import unhas from "../../assets/images/unhas.jpg";
import escova from "../../assets/images/escova.jpg";
import corte from "../../assets/images/corte.jpg";
import coloração2 from "../../assets/images/coloração2.jpg";
import depilacao from "../../assets/images/depilacao.jpg";
import pes from "../../assets/images/pes.jpg";
import logo from "../../assets/images/logo.png";
import map from "../../assets/images/map.svg";
import insta from "../../assets/images/instagram.png";
import whats from "../../assets/images/whats.png";
import face from "../../assets/images/facebook.svg";

import "./styles.css";
import Components from "../../components/CallToAction"

function PrincipalPage(){
    function openClassOption(){
        document.querySelector('nav')?.classList.toggle('show')
    }

    return (
        <>
            <header className="header-principal">
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
                            <li><span className="material-icons"><MdExitToApp/></span><a href="login">Login/Cadastro</a></li>
                            <li><span className="material-icons"><AiOutlineStar/></span><a href="#services">Serviços</a></li>
                            <li><span className="material-icons"><MdAttachMoney/></span><a href="TabelaPreco">Tabela de Preços</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="background">
                    <Components/>
                </div>
            </header>
            <main>
                <section className="page" id="services">
                    <h1>Nossos Serviços</h1>

                    <section className="services-list">
                        <article>
                            <div className="pics">
                                <img src= {tratamento} alt="tratamento de cabelo feminino" />
                            </div>

                            <div className="service-title">
                                <p className="description-title">Tratamentos</p>
                            </div>

                            <div className="service-description">
                                <p className="service-description-p">Seus cabelos andam frágeis, quebradiços, elásticos e com muitas pontas duplas?</p>
                                <p className="service-description-p">É hora de marcar a sua Reconstrução Capilar </p>
                                <p className="service-description-p">Responsável por devolver a massa capilar, a reconstrução reestabelece a estrutura do fio, dando mais saúde e vitalidade. 😁 Agende a sua! 😉 #ReconstruçãoCapilar #Cabelos #cabeloperfeito #cabeleireiro</p>
                            </div>
                        </article>
        
                        <article>
                            <div className="pics">
                                <img src={escova} alt="escova emcabelo feminino" />
                            </div>

                            <div className="service-title">
                                <p className="description-title">Escova</p>
                            </div>

                            <div className="service-description">
                                <p className="service-description-p">Fios alinhados ou cabelos modelados, você decide, nossos profissionais estão prontos para te atender e fazer você arrasar! </p>
                            </div>
                        </article>

                        <article>
                            <div className="pics">
                                <img src={unhas} alt="unha sendo feita" />
                            </div>

                            <div className="service-title">
                                <p className="description-title">Unhas</p>
                            </div>

                            <div className="service-description">
                                <p className="service-description-p">Contamos com as mais modernas técnicas de "Nail Designer" disponiveis no mercado, nossos profissionais arrasam na cutilagem e nos desenhos, que são verdadeiras obras de arte, marque seu horário e venha conferir!</p>
                            </div>
                        </article>

                        <article>
                            <div className="pics">
                                <img src={corte} alt="corte de cabelo feminino com tesoura" />
                            </div>

                            <div className="service-title">
                                <p className="description-title">Corte</p>
                            </div>

                            <div className="service-description">
                                <p className="service-description-p">Cortar os cabelos regularmente evita o ressecamento e o surgimento das pontas duplas. Não corra esse risco, faça-nos uma visita regular, te receberemos com o maior carinho e conforto.</p>
                            </div>
                        </article>

                        <article>
                            <div className="pics">
                                <img src={coloração2} alt="cabelo em processo de tintura" />
                            </div>

                            <div className="service-title">
                                <p className="description-title">Tintura</p>
                            </div>

                            <div className="service-description">
                                <p className="service-description-p">Existem muitas técnicas envolvidas na tintura de cabelos, aqui trabalhamos com profissionalismo para melhor atender as espectativa de nossos clientes. Você que mudar o visual ou simplesmente cobrir os fios brancos, ou a raiz?</p>
                                <p className="service-description-p">Venha conversar com a gente e descobrir a melhor opção para o seu caso!</p>
                            </div>
                        </article>

                        <article>
                            <div className="pics">
                                <img src={depilacao} alt="depilação" />
                            </div>

                            <div className="service-title">
                                <p className="description-title">Depilação</p>
                            </div>

                            <div className="service-description">
                                <p className="service-description-p"> Está querendo aquela pele lisinha e livre de pelos? Aqui é o lugar certo, atendemos Homens e mulheres, utilizamos as melhores técnicas para que você não sofra, venha fazer um teste!</p>
                            </div>
                        </article>

                        <article>
                            <div className="pics">
                                <img src={pes} alt="cabelo 15 anos" />
                            </div>

                            <div className="service-title">
                                <p className="description-title">Spa dos pés</p>
                            </div>

                            <div className="service-description">
                                <p className="service-description-p">Sabe a expressão "Pés de fada", então, aqui você encontra. Oferecemos esfoliação, hidratação e massagens relaxantes. Venha aliviar as tensões e ainda por cima ficar com um pé maravilhoso!</p>
                            </div>
                        </article>
                    </section>
                </section>
                
                <section className="page social-media">
                    <p>Siga nossas Redes Sociais</p>
                    <span className="social-media-icons">
                        <a href="http://www.facebook.com.br" target="_blank" rel="noreferrer"><img src={face} alt="Facebook ícone" title="Facebook grátis ícone" /></a>
                        <a href="http://www.instagram.com.br" target="_blank" rel="noreferrer"><img src={insta} alt="Instagram ícone" /></a>
                        <a href="http://www.whatsapp.com.br" target="_blank" rel="noreferrer"><img src={whats} alt="Whatsapp ícone" /></a>
                    </span>
                </section>

                <section className="page" id="site-map">
                    <div className="site-map-logo">
                        <div className="header-menu-logo">
                            <img src={logo} alt="nossa logo" />
                        </div>
                        <p>Nosso objetivo é fazer as nossas clientes se sentirem ainda mais belas.</p>
                        <p>Acreditamos que a auto estima é o elemento essencial na busca pelo equilíbrio emocional.</p>
                    </div>
                    
                    <div className="site-map-btn">
                        <div className="site-map-btn-align">
                            <h1>Mapa do site</h1>
                            <ul>
                                <li><a href="#services">Serviços</a></li>
                                <li><a href="tabelaPreco">Tabela de preços</a></li>
                                <li><a href="agendamento">Agendamento</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="site-map-address">
                        <h1>Nosso endereço</h1>
                        
                        <span><img src={map} alt="icone do google maps" /></span>
                        <div className="site-map-address-description">
                            <p>Rua Maravilha, 326 - Bangu - Rio de Janeiro</p>
                            <p>Horário de atendimento:</p>
                            <p>De terça a sabado de 09:00 às 18:00</p>
                        </div>
                    </div>
                </section>
            </main>

            <footer>
                <p>Made by B²CS&copy;</p>
            </footer>
        </>
    ) 
}

export default PrincipalPage