import React, { useState } from "react";
import Header from "../../components/Header/";
import MenuLateral from "../../components/MenuLateral/";

import logosalao from "../../assets/images/logosalao.png";
import { FaTrashAlt } from "react-icons/fa";

import "./styles.css";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect } from "react";
import format from "date-fns/format";
import { toast } from "react-toastify";
import api from "../../services/api";
import ContainerMensagem from "../../components/ContainerMensagem";

function CartPage(){
    const location = useLocation<any[]>();
    const history = useHistory();
    const [agendamentos, setAgendamentos] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [desconto, setDesconto] = useState<number>(0);
    const [formaPagamentos, setFormaPagamento] = useState([]);
    const [idFormapagamento, setIdFormapagamento] = useState("");
    const [jaFezAgendamentos, setJaFezAgendamentos] = useState<boolean>(false);

    useEffect(() => {
        getFormaPagamento();
        getJaFezAgendamentos(location.state);

        setAgendamentos(location.state);
    }, [jaFezAgendamentos, desconto]);
    
    async function getFormaPagamento(){
        try {
            const response = await api.get("formaPagamento"); 
            setFormaPagamento(response.data)
        } catch(err) {
            toast.error("Erro ao consultar as formas de pagamentos");
        }
    }

    async function getJaFezAgendamentos(agendamentos: any[]){
        try {            
            const response = await api.get(`agendamento/getJaFezAgendamentos/${agendamentos[0].cliente_id}`); 
            const jaFez = response.data[0].count === "0" ? false : true;
            setJaFezAgendamentos(jaFez);
            calcularTotal(location.state, jaFez);
        } catch(err) {
            toast.error("Erro ao consultar as formas de pagamentos");
        }
    }

    function calculaDesconto(data_nasc: string, total: number, jaFez: Boolean){
        const data = new Date(data_nasc);
        const mesAniversario = data.getMonth();
        const diaAniversario = data.getDate();

        const mesAtual = new Date().getMonth();
        const diaAtual = new Date().getDate();

        if(mesAniversario === mesAtual && diaAniversario === diaAtual){
            setDesconto(total * 20 / 100);
        } else if(!jaFez){
            setDesconto(total * 20 / 100);
        }
    }

    function calcularTotal(agendamentos: any[], jaFez: Boolean){
        let total = 0;
        agendamentos.map(agendamento => {
            total += agendamento.valor;
        });
        setTotal(total); 
        
        calculaDesconto(agendamentos[0].data_nasc, total, jaFez);
    }

    async function finalizar(){
        if(!idFormapagamento){
            toast.warning("Escolha uma forma de pagamento");
            return;
        }

        api.post("pagamento",{
            forma_pagamento_id: idFormapagamento,
            atendimentos: agendamentos
        })

        history.replace("ControleAgenda");
    }

    function excluir(agendamento_id: Number){
        const agendamentosFiltrados = agendamentos.filter(agendamento => {
            return agendamento.agendamento_id !== agendamento_id;
        });
        setAgendamentos(agendamentosFiltrados);
        calcularTotal(agendamentosFiltrados, jaFezAgendamentos);
    }

    return (
        <>
            <Header/>

            <main>
                <MenuLateral/>

                {!agendamentos.length ? 
                (
                    <ContainerMensagem mensagem="Nenhum agendamento"/>
                ) : 
                (                                
                    <div className="cart main-container">
                        <h1>Carrinho de Agendamento</h1>
                    
                        <div className="cart-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Descrição</th>
                                        <th>Data/Hora</th>
                                        <th>Valor</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agendamentos.map(agendamento => (
                                        <tr className="cart-items" key={agendamento.agendamento_id}>
                                            <td>
                                                <div className="cart-img">
                                                    <img src={logosalao} alt="logosalao" />
                                                </div>
                                                <div className="cart-service">
                                                    <span className="item-service">{agendamento.nomeServico}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="cart-service">
                                                    <span className="item-data">{format(agendamento.data_atendimento ? new Date(agendamento.data_atendimento) : new Date(), "dd/MM/yyyy")}</span>
                                                    <span className="item-hora">{agendamento.horario_agendamento}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="cart-value">
                                                    <span className="item-valor">R$ {agendamento.valor},00</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="cart-excluir" onClick={() => excluir(agendamento.agendamento_id)}>
                                                    <button type="button"><FaTrashAlt/></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}                                
                                </tbody>
                            </table>

                            <section className="cart-information">
                                <label className="payment-method">
                                    <span>Qual Pagamento?</span>
                                    <select name="pagamento" id="" /*value={idFormapagamento}*/ onChange={(e) => setIdFormapagamento(e.target.value)}>
                                        <option value="">Selecione o pagamento</option>
                                        {formaPagamentos.map((formaPagamento: any) => (
                                            <option value={formaPagamento.forma_pagamento_id}>{formaPagamento.forma_pagamento}</option>
                                        ))}
                                    </select>
                                </label>

                                <div>
                                    <label htmlFor="">
                                        <span>Subtotal</span> <span>R$ {total},00</span>
                                    </label>
                                    <label htmlFor="">
                                        <span>Desconto</span> <span>R$ {desconto}</span>
                                    </label>
                                    <label htmlFor="">
                                        <span>Valor Final</span> <span>R$ {total - desconto}{!desconto && (",00")}</span>
                                    </label>
                                </div>
                            </section>

                            <div className="cart-buttons">
                                <button type="button" onClick={() => history.push("ControleAgenda")}>Adicionar mais serviços</button>
                                <button type="button" onClick={finalizar}>Finalizar Atendimento</button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    )
}

export default CartPage