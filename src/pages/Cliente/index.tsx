import React, { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import api from "../../services/api";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'

import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import { format, parseISO } from "date-fns";

import "./styles.css";

// importando os icones
import { AiOutlineUpload } from "react-icons/ai";
import { MdDeleteForever, MdSearch } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";

import ValidarCPF from "../../components/ValidarCPF";

function ClientePage(){
    registerLocale('pt', pt);

    const [clientes, setClientes] = useState([]);
    const [nomeCliente, setNomeCliente] = useState("");
    const [cpfCliente, setCpfCliente] = useState("");
    const [dataNascCliente, setDataNascCliente] = useState(new Date());
    const [telefoneCliente, setTelefoneCliente] = useState("");
    const [sexoCliente, setSexoCliente] = useState("");
    const SexoList = [
        { id: 'F', name: 'Feminino' },
        { id: 'M', name: 'Masculino' },
    ];
    const [emailCliente, setEmailCliente] = useState("");
    const [senhaCliente, setSenhaCliente] = useState("");
    const [idCliente, setIdCliente] = useState("");
    const [pesquisa, setPesquisa] = useState("")

    useEffect(()=>{
        getCliente()
    }, [])

    async function getCliente(){
        try {
            const response = await api.get("cliente");
            setClientes(response.data)
        } catch(err) {
            toast.error("Erro ao consultar cliente");
        }        
    }

    async function pesquisar(e: FormEvent){
        e.preventDefault()

        try{
            const response = await api.get(`cliente/nomeCliente/${pesquisa}`)
            setClientes(response.data)
        } catch(err){
            toast.error(`Erro ao realizar a pesquisa, ${err}`)
        }
    }

    async function salvar(e: FormEvent){
        e.preventDefault();

        if (idCliente){
            editar();
        }
        else {
            cadastrar();
        }
    }

    async function cadastrar(){
        const validaCPF = ValidarCPF(cpfCliente)

        if( validaCPF === true ){
            try{
                await api.post("cliente", {
                    nome: nomeCliente,
                    cpf: cpfCliente,
                    data_nasc: parseISO(format(dataNascCliente, "yyyy-MM-dd")),
                    telefone: telefoneCliente,
                    sexo: sexoCliente,
                    email: emailCliente,
                    senha: senhaCliente
                });
                limpar()
                
                toast.success("Cliente cadastrado com sucesso!");

                getCliente();
            } catch (err){
                toast.error("Falha ao cadastrar cliente");
            }
        } else {
            toast.error("CPF inválido");
        }
    }

    async function editar(){
        try{
            await api.put(`cliente/${idCliente}`, {
                nome: nomeCliente,
                data_nasc: parseISO(format(dataNascCliente, "yyyy-MM-dd")),
                telefone: telefoneCliente,
                sexo: sexoCliente,
                email: emailCliente,
                senha: senhaCliente
            });
            limpar()

            toast.success("Cliente alterado com sucesso!");
    
            getCliente();
        } catch(err){
            toast.error("Erro ao editar cliente!");
        }
    }

    async function desativar(id: number){
        try{
            confirmAlert({
                title: 'Confirmar ação',
                message: 'Tem certeza que deseja desativar o cliente?',
                buttons: [
                    {
                        label: 'Sim',
                        onClick: async ()=> {
                            await api.get(`cliente/desativar/${id}`)
                            getCliente();
                            toast.success("Cliente desativado com sucesso!");
                        }
                    },
                    {
                        label: 'Não',
                        onClick: ()=>{}
                    }
                ]
            });
        } catch(err){
            toast.error("Erro ao desativar cliente!");
        }
    }

    async function carregar(cliente:any){
        setNomeCliente(cliente.nome);
        setCpfCliente(cliente.cpf);
        setDataNascCliente(new Date(cliente.data_nasc));
        setTelefoneCliente(cliente.telefone);
        setSexoCliente(cliente.sexo);
        setEmailCliente(cliente.email);
        setSenhaCliente(cliente.senha);
        setIdCliente(cliente.cliente_id);
    }

    async function limpar(){
        setNomeCliente("");
        setCpfCliente("");
        setDataNascCliente(new Date());
        setTelefoneCliente("");
        setSexoCliente("");
        setEmailCliente("");
        setSenhaCliente("");
        setIdCliente("");
    }

    async function ativar(idCliente: number){

        confirmAlert({
            title: 'Confirmar ação',
            message: 'Tem certeza que deseja ativar o cliente?',
            buttons: [
                {
                    label: 'Sim',
                    onClick: async ()=> {
                        await api.get(`cliente/ativar/${idCliente}`);
                        getCliente();
                        toast.success("Cliente desativado com sucesso!");
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
                
                <div className="cad-cliente main-container">

                    <div className="cad-cliente cadastro-form">
                        <h1>Cadastro de Clientes</h1>
            
                        <form className="form" onSubmit={salvar}>
                            <label htmlFor="nome">
                                <span>Nome</span>
                                <input 
                                    type="text" 
                                    name="nome" 
                                    value={nomeCliente}
                                    onChange={(e)=>setNomeCliente(e.target.value)}
                                />
                            </label>
        
                            <label htmlFor="cpf">
                                <span>CPF</span>
                                <input 
                                    type="text" 
                                    name="cpf" 
                                    value={cpfCliente}
                                    onChange={(e) => setCpfCliente(e.target.value)} 
                                    readOnly={!!idCliente}
                                />
                            </label>
        
                            <label htmlFor="data_nasc">
                                <span>Data Nascimento</span>
                                <DatePicker 
                                    selected={dataNascCliente} 
                                    onChange={(date: Date) => setDataNascCliente(date)} 
                                    locale="pt"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </label>

                            <label htmlFor="telefone">
                                <span>Telefone</span>
                                <input 
                                    type="text" 
                                    name="telefone" 
                                    value={telefoneCliente}
                                    onChange={(e) => setTelefoneCliente(e.target.value)}
                                />
                            </label>

                            <label>
                                <span>Sexo:</span>
                                <select id="sexo" value={sexoCliente} onChange={(e) => setSexoCliente(e.target.value)}>
                                    <option value="">Selecione o sexo</option>
                                    {SexoList.map((item) => (
                                        <option value={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            </label>

                            <label htmlFor="email">
                                <span>Email</span>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={emailCliente}
                                    onChange={(e) => setEmailCliente(e.target.value)}
                                />
                            </label>
        
                            <label htmlFor="senha">
                                <span>Senha</span>
                                <input 
                                    type="password" 
                                    name="senha"
                                    value={senhaCliente}
                                    onChange={(e) => setSenhaCliente(e.target.value)}
                                />
                            </label>

                            <div className="buttons">
                                <button name="acao" value="cadastrar" type="submit">Cadastrar</button>
                                <button name="acao" value="editar" type="submit">Alterar</button>
                            </div>
                        </form>
                    </div>

                    <div className="search">
                        <form onSubmit={pesquisar}>
                            <input 
                                className="pesquisa" 
                                type="text" 
                                placeholder="nome do cliente"
                                onChange={(e)=>setPesquisa(e.target.value)}
                            />
                            <span>
                                <button className="btn_pesquisar" type="submit"><MdSearch/></button>
                            </span>
                        </form>
                    </div>
            
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Data_Nascimento</th>
                                    <th>CPF</th>
                                    <th>Telefone</th>
                                    <th>Email</th>
                                    <th>Sexo</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.map((cliente: any) => (
                                    <tr>
                                        <td>{cliente.nome}</td>
                                        <td>{format(new Date(cliente.data_nasc), "dd/MM/yyyy")}</td>
                                        <td>{cliente.cpf}</td>
                                        <td>{cliente.telefone}</td>
                                        <td>{cliente.email}</td>
                                        <td>{cliente.sexo}</td>
                                        <td>
                                            <div className="form">
                                                {cliente?.ativo && (
                                                    <div className='material excluir'>                                            
                                                        <button name="acao" value='excluir' onClick={() => desativar(cliente.cliente_id)}>
                                                            <span className='material-icons'><MdDeleteForever/></span>
                                                        </button>
                                                    </div>
                                                )}
                                                {cliente?.ativo === false && (
                                                    <div className='material excluir'>                                            
                                                        <button name="acao" value='excluir' onClick={() => ativar(cliente.cliente_id)}>
                                                            <span className='material-icons'><GiConfirmed/></span>
                                                        </button>
                                                    </div>
                                                )}
                                                <div className='material carregar'>
                                                    <button name="acao" value='carregar' onClick={() => carregar(cliente)}>
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

export default ClientePage