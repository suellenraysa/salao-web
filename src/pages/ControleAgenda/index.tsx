import React, { FormEvent, useState } from "react";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import { toast } from "react-toastify";
import {MdDeleteForever, MdCheckCircle} from "react-icons/md";
import {AiFillClockCircle} from "react-icons/ai";
import "./styles.css";

import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import { format } from "date-fns";

import api from "../../services/api";
import { useHistory } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'

function ControleAgendaPage(){
    registerLocale('pt', pt)

    const history = useHistory();
    const [agendamentos, setAgendamentos] = useState([]);
    const [data, setData] = useState(new Date());

    async function verAgenda(e:FormEvent) {
        e.preventDefault()

        const response = await api.get(`agendamento/getAgendamentoData/${format(data, "yyyy-MM-dd")}`)
        setAgendamentos(response.data)
    }

    function selecionarAtendimentos(){
        const agendamentosSelecionados = agendamentos.filter((agendamento: any) => {
            if (agendamento.selecionado) return agendamento; 
        });

        const agendamentosSemInicioAtendimento = agendamentosSelecionados.filter((agendamento: any) => {
            if (!agendamento.inicio_atendimento) return agendamento;
        });

        if(agendamentosSemInicioAtendimento.length) {
            toast.warning("Só pode selecionar atendimentos que já foram iniciados");
            return;
        }

        if(!agendamentosSelecionados.length) {
            toast.warning("Selecione pelo menos um atendimento");
            return;
        }

        let clienteId: any;
        let agendamentosClientesDiferentes = false;

        agendamentosSelecionados.map((agendamento: any) => {
            if(!clienteId) {
                clienteId = agendamento.cliente_id;
            } else if(clienteId !== agendamento.cliente_id) {
                agendamentosClientesDiferentes = true;
            }
        });

        if(agendamentosClientesDiferentes){
            toast.warning("Só pode selecionar agendamentos do mesmo cliente");
            return;
        }

        history.push({ 
            pathname: '/Carrinho',
            state: agendamentosSelecionados
        })
    }

    async function cancelarAgendamento(idAgendamento: Number){
        confirmAlert({
            title: 'Confirmar ação',
            message: 'Tem certeza que deseja cancelar o agendamento?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: async ()=> {
                        await api.delete(`agendamento/${idAgendamento}`)
                        toast.success("Forma de pagamento excluído com sucesso!");
                    }
                },
                {
                    label: 'Não',
                    onClick: ()=>{}
                }
            ]
        });
    }

    return (
        <>
            <Header/>
            <main>
                <MenuLateral/>
                <div className="controle-agenda main-container">
                    <h1>Controle de atendimentos</h1>

                    <section className="info-select">
                        <div className="select-data">
                            <span className="spn-titulo">Selecione o dia</span>
                            
                            <form onSubmit={verAgenda}>
                                <label htmlFor="">
                                    <span>Dia:</span>
                                    <DatePicker
                                        selected={data}
                                        onChange={(date: Date)=>setData(new Date(date))}
                                        locale="pt"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </label>

                                <button className="buttons" type="submit">Ver Agenda</button>
                            </form>
                        </div>
                    </section>

                    <div className="controle-agenda table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Encerrar</th>
                                    <th>Cliente</th>
                                    <th>Dia</th>
                                    <th>hora</th>
                                    <th>Serviço</th>
                                    <th>Profissional</th>
                                    <th>Forma de Pagamento</th>
                                    <th>Status</th>
                                    <th>Valor</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                            {agendamentos.map((agendamento: any) => (                                
                                <tr key={agendamento.agendamento_id}>
                                    <td>
                                        {!agendamento.forma_pagamento_id && (
                                        <form action="">
                                            <input type="checkbox" value={agendamento.selecionado} onChange={() => agendamento.selecionado = !agendamento.selecionado}/>
                                        </form>
                                        )}
                                    </td>
                                    <td>{agendamento.nomeCliente}</td>
                                    <td>{format(new Date(agendamento.data_atendimento), "dd/MM/yyyy")}</td>
                                    <td>{agendamento.horario_agendamento}</td>
                                    <td>{agendamento.nomeServico}</td>
                                    <td>{agendamento.nomeProfissional}</td>
                                    <td>{agendamento.forma_pagamento}</td>

                                    {!agendamento.inicio_atendimento && !agendamento.fim_atendimento && (
                                        <td></td>
                                    )}
                                    {agendamento.inicio_atendimento && !agendamento.fim_atendimento && (
                                        <td><span className="material-icons andamento"><AiFillClockCircle /></span></td>
                                    )}
                                    {agendamento.inicio_atendimento && agendamento.fim_atendimento && (
                                        <td><span className="material-icons concluido"><MdCheckCircle/></span></td>
                                    )}

                                    <td>R${agendamento.valor},00</td>         
                                    <td>
                                        {!agendamento.inicio_atendimento && (
                                            <div className="form">
                                                <div className='material excluir'>                                                    
                                                    <button name='acao' id={agendamento.agendamento_id} onClick={()=>cancelarAgendamento(agendamento.agendamento_id)}>
                                                        <span className="material-icons"><MdDeleteForever /></span>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>                               
                                </tr>                                
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="buttons-checkout">
                        <button className="buttons" type="button" onClick={selecionarAtendimentos}>Selecionar Atendimentos</button>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ControleAgendaPage