import React, { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import api from "../../services/api";
import { toast } from "react-toastify";
import { AiOutlineUpload } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'

import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import { format, parseISO } from "date-fns";

import "./styles.css";
import "../../components/Table/styles.css";

function ProfissionalPage(){
    registerLocale('pt', pt);

    const [profissionais, setProfissionais] = useState([])
    const [nomeProfissional, setNomeProfissional] = useState("")
    const [dataNascProfissional, setDataNascProfissional] = useState(new Date())
    const [cpfProfissional, setCpfProfissional] = useState("")
    const [telefoneProfissional, setTelefoneProfissional] = useState("")
    const [emailProfissional, setEmailProfissional] = useState("")
    const [senhaProfissional, setSenhaProfissional] = useState("")
    const [idProfissional, setIdProfissional] = useState("")

    useEffect( () => {
        getProfissional()
    }, [] )

    async function getProfissional(){
        const response = await api.get("profissional");
        setProfissionais(response.data);
    }

    async function salvar(e: FormEvent){
        e.preventDefault();

        if (idProfissional){
            alterar();
        }
        else {
            cadastrar();
        }
    }

    async function cadastrar(){

        try{
            await api.post("profissional", {
                nome: nomeProfissional,
                data_nasc: parseISO(format(dataNascProfissional, "yyyy-MM-dd")),                
                cpf: cpfProfissional,
                telefone: telefoneProfissional,
                email: emailProfissional,
                senha: senhaProfissional
            });
            limpar()

            toast.success("Profissional cadastrado com sucesso!");

            getProfissional();
            
        } catch(err) {
            toast.error("Erro ao cadastrar o profissional");
        }
    }

    async function excluir(id:number){
        try{
            confirmAlert({
                title: 'Confirmar ação',
                message: 'Tem certeza que deseja desativar o profissional?',
                buttons: [
                    {
                        label: 'Sim',
                        onClick: async ()=> {
                            await api.delete(`profissional/${id}`)
                            getProfissional();
                            toast.success("Profissional Excluído com sucesso");
                        }
                    },
                    {
                        label: 'Não',
                        onClick: ()=>{}
                    }
                ]
            });
        } catch(err){
            toast.error("Profissional não pode ser exluído, possui agendamentos");
        }
    }

    //Função responsável por preencher o formulário com os dados da tabela
    async function carregar(profissional:any){
        setNomeProfissional(profissional.nome);
        setDataNascProfissional(new Date(profissional.data_nasc));
        setCpfProfissional(profissional.cpf);
        setTelefoneProfissional(profissional.telefone);
        setEmailProfissional(profissional.email);
        setSenhaProfissional(profissional.senha);
        setIdProfissional(profissional.profissional_id);
    }

    async function limpar() {
        setNomeProfissional("");
        setDataNascProfissional(new Date());
        setCpfProfissional("");
        setTelefoneProfissional("");
        setEmailProfissional("");
        setSenhaProfissional("");
        setIdProfissional("");
    }

    async function alterar(){
        try{
            await api.put(`profissional/${idProfissional}`, {
                nome: nomeProfissional,
                data_nasc: parseISO(format(dataNascProfissional, "yyyy-MM-dd")),
                telefone: telefoneProfissional,
                email: emailProfissional,
                senha: senhaProfissional
            });
            limpar()

            toast.success("Profissional alterado com sucesso!");
    
            getProfissional();
        } catch(err){
            toast.error("Erro ao alterar profissional!");
        }
    }

    return (
        <>
            <Header />

            <main>
                <MenuLateral />

                <div className="profissional main-container">
                    <div className="profissional cadastro-form">
                        <h1>Cadastro de Profissional</h1>
                        <form className="form" onSubmit={salvar}>
                            <label htmlFor="nome">
                                <span>Nome</span>
                                <input 
                                    type="text" 
                                    name="nome"
                                    value={nomeProfissional} 
                                    onChange={ (e) => setNomeProfissional(e.target.value) }
                                    placeholder="Entre com o nome completo"
                                />
                            </label>

                            <label htmlFor="data_nasc">
                                <span>Data Nascimento</span>
                                <DatePicker 
                                    selected={dataNascProfissional} 
                                    onChange={(date: Date) => setDataNascProfissional(date)} 
                                    locale="pt"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </label>

                            <label htmlFor="cpf">
                                <span>CPF</span>
                                <input type="text" 
                                    name="cpf" 
                                    value={cpfProfissional} 
                                    onChange={ (e) => setCpfProfissional(e.target.value) }
                                    readOnly={!!idProfissional}
                                />                                    
                            </label>

                            <label htmlFor="telefone">
                                <span>Telefone</span>
                                <input 
                                    type="text" 
                                    name="telefone" 
                                    value={telefoneProfissional} 
                                    onChange={ (e) => setTelefoneProfissional(e.target.value) }
                                    placeholder="Apenas números"/>
                            </label>

                            <label htmlFor="email">
                                <span>Email</span>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={emailProfissional} 
                                    onChange={ (e) => setEmailProfissional(e.target.value) }
                                    placeholder="example@mail.com"/>
                            </label>

                            <label htmlFor="senha">
                                <span>Senha</span>
                                <input 
                                    type="password" 
                                    name="senha"
                                    value={senhaProfissional} 
                                    onChange={ (e) => setSenhaProfissional(e.target.value) }
                                />
                            </label>

                            <div className="buttons">
                                <button name="acao" value="cadastrar" type="submit">Cadastrar</button>
                                <button name="acao" value="alterar" type="submit">Alterar</button>
                            </div>
                        </form>
                    </div>

                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Data de Nascimento</th>
                                    <th>CPF</th>
                                    <th>Telefone</th>
                                    <th>Email</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                { profissionais.map((profissional: any) => (
                                    <tr>
                                        <td>{profissional.nome}</td>
                                        <td>{format(new Date(profissional.data_nasc), "dd/MM/yyyy")}</td>
                                        <td>{profissional.cpf}</td>
                                        <td>{profissional.telefone}</td>
                                        <td>{profissional.email}</td>
                                        <td>
                                            <div className="form">
                                                <div className='material excluir'>
                                                    <button name='acao' value='excluir' onClick={() => excluir(profissional.profissional_id)}>
                                                        <span className="material-icons"><MdDeleteForever/></span>
                                                    </button>
                                                </div>
                                                <div className='material carregar'>
                                                    <button name='acao' value='carregar' onClick={() => carregar(profissional)}>
                                                        <span className='material-icons carregar'><AiOutlineUpload/></span>
                                                    </button>
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
    )
}

export default ProfissionalPage