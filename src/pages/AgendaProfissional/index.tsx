import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import api from "../../services/api";
import { getUser } from "../../services/auth";
import {AiFillClockCircle} from "react-icons/ai";
import {MdCheckCircle} from "react-icons/md";

import format from "date-fns/format";

import "./styles.css";
import { toast } from "react-toastify";

function AgendaProfissionalPage(){
    const user = getUser();
    const [agendaProfissionais, setAgendaProfissionais] = useState([])
    const [data] = useState(new Date())

    useEffect(() => {
        getAgenda()
    }, [])

    async function getAgenda(){
        const response = await api.get(`agendamento/getAgendamentoProfissional/${user.profissionalId}/${format(data, "yyyy-MM-dd")}`);
        setAgendaProfissionais(response.data)
    }
    
    async function iniciar() {
        const agendamentoSelecionado: any[] = agendaProfissionais.filter((agendamento: any) => {
            if(agendamento.selecionado) return agendamento;
        })

        if(!agendamentoSelecionado.length){
            toast.warning("Necessário selecionar um atendimento");
            return;
        }

        if(agendamentoSelecionado.length > 1){
            toast.warning("Somente pode selecionar um atendimento");
            return;
        }

        if(agendamentoSelecionado[0].inicio_atendimento){
            toast.warning("Serviço já iniciado!");
            return;
        }

        await api.get(`agendamento/iniciarAtendimento/${agendamentoSelecionado[0].agendamento_id}`)

        getAgenda()
    }

    async function encerrar() {
        const agendamentoSelecionado: any[] = agendaProfissionais.filter((agendamento: any) => {
            if(agendamento.selecionado) return agendamento;
        })

        if(!agendamentoSelecionado.length){
            toast.warning("Necessário selecionar um atendimento");
            return;
        }

        if(agendamentoSelecionado.length > 1){
            toast.warning("Somente pode selecionar um atendimento");
            return;
        }

        await api.get(`agendamento/encerrarAtendimento/${agendamentoSelecionado[0].agendamento_id}`)

        getAgenda()
    }

    return (
        <>
            <Header/>
            <main>
                <MenuLateral/>

                <div className="agenda-profissional main-container">
                    <h1> Agenda do dia </h1>
                    
                    <h2>Gerencie seus atendimentos!</h2>

                    <div className="agenda-profissional table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Selecionar</th>
                                    <th>Cliente</th>
                                    <th>Data Agendamento</th>
                                    <th>Hora Agendamento</th>
                                    <th>Serviço</th>
                                    <th>Valor</th>
                                    <th>Comissão</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agendaProfissionais.map((agendamento: any) => (
                                    <tr>
                                        <td>
                                            {!agendamento.fim_atendimento && (
                                            <form action="">
                                                <input type="checkbox" value={agendamento.selecionado} onChange={() => agendamento.selecionado = !agendamento.selecionado}/>
                                            </form>
                                            )}
                                        </td>
                                        <td>{agendamento.nomeCliente}</td>
                                        <td>{format(new Date(agendamento?.data_atendimento), "dd/MM/yyyy")}</td>
                                        <td>{agendamento.horario_agendamento}</td>
                                        <td>{agendamento.nomeServico}</td>
                                        <td>{agendamento.valor}</td>
                                        <td>{agendamento.comissao}</td>
                                        {!agendamento.inicio_atendimento && !agendamento.fim_atendimento && (
                                        <td></td>
                                        )}
                                        {agendamento.inicio_atendimento && !agendamento.fim_atendimento && (
                                            <td><span className="material-icons andamento"><AiFillClockCircle /></span></td>
                                        )}
                                        {agendamento.inicio_atendimento && agendamento.fim_atendimento && (
                                            <td><span className="material-icons concluido"><MdCheckCircle/></span></td>
                                        )}
                                    </tr>
                                ))}                    
                            </tbody>
                        </table>
                    </div>

                    <div className="buttons-export">
                        <label htmlFor="">
                            <button className="buttons" type="button" onClick={iniciar}>Iniciar</button>
                        </label>

                        <label htmlFor="">
                            <button className="buttons" type="button" onClick={encerrar}>Encerrar</button>
                        </label>
                    </div>
                </div>
            </main>
        </>
    )
}

export default AgendaProfissionalPage