import React, { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header"
import MenuLateral from "../../components/MenuLateral"
import Calendar from 'react-calendar'
import { toast } from "react-toastify";
import api from "../../services/api";
import {MdCheckCircle} from "react-icons/md";
import {MdDeleteForever} from "react-icons/md";
import {AiFillClockCircle} from "react-icons/ai";
import { addMinutes, isBefore, subMinutes, format, isAfter, addSeconds } from "date-fns";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'

import "./styles.css";
import { getUser } from "../../services/auth";

function AgendamentoPage() {
    const user = getUser();
    const [agendamentos, setAgendamentos] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [IdServicos, setIdServicos] = useState("");
    const [clientes, setClientes] = useState([]);
    const [idCliente, setIdCliente] = useState(user.clienteId);
    const [profissionais, setProfissionais] = useState([]);
    const [idProfissional, setIdProfissional] = useState('');
    const [horarios, setHorarios] = useState<string[]>([]);
    const [horario_agendamento, setHorarioAgendamento] = useState('');
    const [data_atendimento, setDataAtendimento] = useState(new Date());
    const [data_agendamento, setDataAgendamento] = useState(new Date());
    const [total, setTotal] = useState('');
    const [servicoSelecionado, setServicoSelecionado] = useState<any>();
    const [agendamentosHjCliente, setAgendamentosHjCliente] = useState<any[]>([]);

    useEffect(() => {
        getAgendamentos()
        getAgendamentosDataCliente(new Date())
        getServicos()
        getClientes()
    }, [])

    async function getAgendamentos(){
        try {
            const response = await api.get(`agendamento/${idCliente}`); 
            setAgendamentos(response.data)
        } catch(err) {
            toast.error("Erro ao consultar a agenda");
        }
    }

    async function getAgendamentosDataCliente(dataSelecionada: Date){
        try {
            const dataFormatada = dataSelecionada.getUTCFullYear() + "-" + (dataSelecionada.getUTCMonth() + 1) + "-" + dataSelecionada.getUTCDate()
            const response = await api.get(`agendamento/getAgendamentoCliente/${idCliente}/${dataFormatada}`); 

            let datasAgendamentosDataCliente: any[] = response.data.map((h:any) => {
                return converteTempoEmData(h.horario_agendamento, h.tempo_servico, h.data_atendimento);
            });
            setAgendamentosHjCliente(datasAgendamentosDataCliente)
            console.log(datasAgendamentosDataCliente)

        } catch(err) {
            toast.error("Erro ao consultar a agenda");
        }
    } 
    
    async function getServicos(){
        try {
            const response = await api.get("servicos"); 
            setServicos(response.data)
        } catch(err) {
            toast.error("Erro ao consultar os serviços");
        }
    }   

    async function getProfissionais(idFuncao:Number){
        try {
            const response = await api.get(`profissionalFuncao/porFuncao/${idFuncao}`); 
            setProfissionais(response.data)
        } catch(err) {
            toast.error("Erro ao consultar os profissionais");
        }
    }

    async function getClientes(){
        try {
            const response = await api.get("cliente"); 
            setClientes(response.data)
        } catch(err) {
            toast.error("Erro ao consultar os clientes");
        }
    }

    function getHorarios(servico:any){
        servico = JSON.parse(servico)
        
        getProfissionais(servico.funcao_id)
        setTotal(servico.valor)
        setIdServicos(servico.servicos_id)
        setServicoSelecionado(servico)
    }

    async function agendar(e: FormEvent){
        e.preventDefault();
        try{
            await api.post('agendamento', {
                profissional_id: idProfissional,
                cliente_id: idCliente,
                data_atendimento: data_atendimento,
                data_agendamento: data_agendamento,
                total: total,
                horario_agendamento: format(new Date(), "yyyy-MM-dd") + " " + horario_agendamento + ":00 America/Sao_Paulo",
                servico_id: IdServicos,
            });
            limpar();
            getServicos();
            getAgendamentos() 
            getAgendamentosDataCliente(new Date())

            toast.success("Agendamento adicionado com sucesso!");
            toast.success("Tempo de tolerância 10 min!");

        } catch (err) {
            toast.error("Erro ao gerar agendamento!");
        }
    }

    function limpar(){
        setDataAgendamento(new Date())
        setDataAtendimento(new Date())
        setIdServicos('')
        setIdProfissional('')
        setHorarios([])
        setTotal('')
        setHorarioAgendamento('')
    }

    function setData(data: any){
        setDataAtendimento(data);
        getAgendamentosDataCliente(data);
    }

    async function getHorariosProfissionais(id:string) {
        setIdProfissional(id)
        const response = await api.get(`agendamento/getAgendamentoProfissional/${id}/${format(data_atendimento, "yyyy-MM-dd")}`)

        const datasProfissional: any[] = response.data.map((h:any) => {
            return converteTempoEmData(h.horario_agendamento, h.tempo_servico, h.data_atendimento);
        });

        const dataInicial = new Date(data_atendimento)
        dataInicial.setHours(9, 0, 0);

        let dataInicioAgendamento = dataInicial;
        let dataFinalAgendamento = dataInicial;
        
        const dataFinal = new Date(data_atendimento)
        dataFinal.setHours(18, 0, 0)
       
        const horarios = [];
        
        const tempo:any[] = servicoSelecionado.tempo_servico.split(':')
        const hora = Number(tempo[0]) * 60;
        const minuto = Number(tempo[1]);
        const tempoServioMinutos = hora + minuto;

        const dataLimiteAgendamento = subMinutes(dataFinal, tempoServioMinutos);

        const datasClientes = JSON.parse(JSON.stringify(agendamentosHjCliente));
    
        while(isBefore(dataInicioAgendamento, dataLimiteAgendamento)){

            dataInicioAgendamento = addSeconds(dataInicioAgendamento, 1);
            
            let horaFormatada = format(dataInicioAgendamento, "HH:mm");

            let achou = false;

            if (isAfter(new Date(), dataInicioAgendamento)){
                achou = true;
            }

            for(var i=0; i<datasProfissional.length; i++){
                if(
                    (isAfter(dataInicioAgendamento, datasProfissional[i].dataInicial) && isBefore(dataInicioAgendamento, datasProfissional[i].dataFinal)) 
                    || (isAfter(dataFinalAgendamento, datasProfissional[i].dataInicial) && isBefore(dataFinalAgendamento, datasProfissional[i].dataFinal))
                ){
                    achou = true;
                    break;
                }
            }

            for(var j=0; j<datasClientes.length; j++){
                if(
                    (isAfter(dataInicioAgendamento, new Date(datasClientes[j].dataInicial)) && isBefore(dataInicioAgendamento, new Date(datasClientes[j].dataFinal))) 
                    || (isAfter(dataFinalAgendamento, new Date(datasClientes[j].dataInicial)) && isBefore(dataFinalAgendamento, new Date(datasClientes[j].dataFinal)))
                ){
                    achou = true;
                    break;
                }
            }

            if(!achou){
                horarios.push(horaFormatada);
            }

            dataInicioAgendamento = addMinutes(dataInicioAgendamento, tempoServioMinutos);
            dataFinalAgendamento = addMinutes(dataInicioAgendamento, tempoServioMinutos);
            dataFinalAgendamento = subMinutes(dataFinalAgendamento, 1);
        }
    
        setHorarios(horarios);
    }
    
    function converteTempoEmData(horario: string, tempoServico: string, data_atendimento: any){
        const tempo:any[] = tempoServico.split(':')
        const hora = Number(tempo[0]) * 60;
        const minuto = Number(tempo[1]);
        const novaHora = hora + minuto;

        const dataInicial = data_atendimento 
            ? new Date(format(new Date(data_atendimento), "yyyy-MM-dd") + " " + horario)
            : new Date(format(new Date(), "yyyy-MM-dd") + " " + horario)

        const dataFinal = addMinutes(dataInicial, novaHora);

        return {
            dataInicial,
            dataFinal
        }
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
                        getAgendamentos()
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
            <Header />

            <main>
                <MenuLateral />
                <div className="main-container">
                    <div className="container-conteudo">
                        <span className="titulo">Agende seu serviço aqui!</span>

                        <Calendar 
                            onChange={(data) => setData(data)} 
                            minDate={new Date()}
                        />

                        <div className="agendamento-form">
                            <form className="form" onSubmit={agendar}>
                                <label htmlFor="">
                                    <span>Em que Data?</span>
                                    <input type="text" disabled value={format(data_atendimento, "dd/MM/yyy")}/>
                                </label>
                                
                                <label htmlFor="">
                                    <span>Qual Serviço?</span>
                                    <select name="servico" id=""  onChange={(e) => getHorarios(e.target.value)}>
                                        <option value="">Selecione o Serviço</option>
                                        {servicos.map((servico: any) => (
                                            <option value={JSON.stringify(servico)}>{servico.nome}</option>
                                        ))}
                                    </select>
                                </label>

                                {servicoSelecionado && (
                                <label htmlFor="">
                                    <span>Valor do serviço</span>
                                    
                                    <input type="text" disabled value={ `R$${servicoSelecionado?.valor},00`}/>
                                </label>
                                )}
                                
                                <label htmlFor="">
                                    <span>Qual Profissional?</span>
                                    <select name="profissional" id="" value={idProfissional} onChange={(e) => getHorariosProfissionais(e.target.value)}>
                                        <option value="">Selecione o profissional</option>
                                        {profissionais.map((profissional: any) => (
                                            <option value={profissional.profissional_id}>{profissional.nome}</option>
                                        ))}
                                    </select>
                                </label>

                                <label htmlFor="">
                                    <span>Qual Horário?</span>
                                    <select name="horario" id="" onChange={(e) => setHorarioAgendamento(e.target.value)}>
                                        <option value="">Selecione o horário</option>
                                        {horarios.map((horario: any) => (
                                            <option value={horario}>{horario}</option>
                                        ))}
                                    </select>         
                                </label>

                                <button type='submit'> Agendar </button>
                            </form>                       
                        </div>
                    </div>

                    <div className="historico-agendamento">
                        <table>
                            <thead>
                                <tr>
                                    <th>Dia</th>
                                    <th>Hora</th>
                                    <th>Cliente</th>
                                    <th>Profissional</th>
                                    <th>Serviço</th>
                                    <th>Valor</th>
                                    <th>Status</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {agendamentos.map((agendamento: any) => (
                                    <tr>
                                        <td>{format(new Date(agendamento.data_atendimento), "dd/MM/yyyy")}</td>
                                        <td>{agendamento.horario_agendamento}</td>
                                        <td>
                                            {clientes.map((cliente: any) => (
                                                agendamento.cliente_id === cliente.cliente_id ? cliente.nome : ""
                                            ))}
                                        </td>
                                        <td>
                                            {agendamento.nome}                                        
                                        </td>
                                        <td>
                                            {servicos.map((servico: any) => (
                                                agendamento.servicos_id === servico.servicos_id ? servico.nome : ""
                                            ))}
                                        </td>
                                        <td>
                                        {servicos.map((servico: any) => (
                                                agendamento.servicos_id === servico.servicos_id ? `R$${servico.valor},00` : ""
                                            ))} 
                                        </td>
                                        {!agendamento.inicio_atendimento && !agendamento.fim_atendimento && (
                                            <td></td>
                                        )}
                                        {agendamento.inicio_atendimento && !agendamento.fim_atendimento && (
                                            <td><span className="material-icons andamento"><AiFillClockCircle /></span></td>
                                        )}
                                        {agendamento.inicio_atendimento && agendamento.fim_atendimento && (
                                            <td><span className="material-icons concluido"><MdCheckCircle/></span></td>
                                        )}

                                        <td>
                                            <div className="form">
                                                <div className='material excluir'>
                                                    {!agendamento.inicio_atendimento && (
                                                        <button name='acao' id={agendamento.agendamento_id} onClick={()=>cancelarAgendamento(agendamento.agendamento_id)}>
                                                            <span className="material-icons"><MdDeleteForever /></span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    );
}

export default AgendamentoPage;