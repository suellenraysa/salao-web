import React, { useState, useEffect, FormEvent } from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import { toast } from "react-toastify";
import { getUser, logout } from "../../services/auth";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'

import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import { format, parseISO } from "date-fns";

import "./styles.css";

function PerfilPage(){
    registerLocale('pt', pt)

    const [idCliente, setIdClientes] = useState("")
    const [nomeCliente, setNomeClientes] = useState("")
    const [cpfCliente, setCpfClientes] = useState("")
    const [dataNascCliente, setDataNascClientes] = useState(new Date())
    const [telefoneCliente, setTelefoneClientes] = useState("")
    const [sexoCliente, setSexoClientes] = useState("")
    const SexoList = [
        { id: 'F', name: 'Feminino' },
        { id: 'M', name: 'Masculino' },
    ];
    const [emailCliente, setEmailClientes] = useState("")
    const [senhaCliente, setSenhaClientes] = useState("")

    const user = getUser()
    const userID = user.clienteId

    const history = useHistory()

    useEffect( ()=>{
        getClientes()
    }, [])

    async function getClientes(){
        try{
            const response = await api.get(`cliente/${userID}`);
            setIdClientes(response.data.cliente_id)
            setNomeClientes(response.data.nome)
            setCpfClientes(response.data.cpf)
            setDataNascClientes(parseISO(format(new Date(response.data.data_nasc), "yyyy-MM-dd")))
            setTelefoneClientes(response.data.telefone)
            setSexoClientes(response.data.sexo)
            setEmailClientes(response.data.email)
            setSenhaClientes(response.data.senha)

            console.log(response.data)
        } catch(err){
            toast.error("Erro ao consultar clientes")
        }
    }
    
    async function editar(e: FormEvent){
        e.preventDefault() 
        await api.put(`cliente/${idCliente}`, {
            nome: nomeCliente,
            cpf: cpfCliente,
            data_nasc: parseISO(format(dataNascCliente, "yyyy-MM-dd")),
            telefone: telefoneCliente,
            sexo: sexoCliente,
            email: emailCliente,
            senha: senhaCliente
        })

        toast.success('Cliente editado com sucesso')

        getClientes();
    }

    async function desativar(idCliente: number){
        try{
            // await api.get(`cliente/desativar/${idCliente}`);
            // toast.success('Sua conta foi desativada em nossa base');
            // logout();
            // history.push('/');
            confirmAlert({
                title: 'Confirmar ação',
                message: 'Tem certeza que deseja desativar seu cadastro?',
                buttons: [
                    {
                        label: 'Sim',
                        onClick: async ()=> {
                            await api.get(`cliente/desativar/${idCliente}`);
                            toast.success('Sua conta foi desativada em nossa base');
                            logout();
                            history.push('/');
                        }
                    },
                    {
                        label: 'Não',
                        onClick: ()=>{}
                    }
                ]
            });
        } catch(err){
            toast.error('Erro ao desativar a conta')
        }
    }

    return (
        <>
            <Header/>

            <main>
                <MenuLateral/>
                
                <div className="area-cliente main-container">
                    <div className="area-cliente cadastro-form">
                        <h1>Meu Perfil</h1>

                        <form className="form" onSubmit={editar}>
                            <label htmlFor="nome">
                                <span>Nome</span>
                                <input 
                                    type="text" 
                                    name="nome" 
                                    value={ nomeCliente }
                                    onChange={ (e) => setNomeClientes(e.target.value) }
                                />
                            </label>

                            <label htmlFor="cpf">
                                <span>CPF</span>
                                <input 
                                    type="text" 
                                    name="cpf" 
                                    value={ cpfCliente }
                                    readOnly
                                />
                            </label>

                            <label htmlFor="data_nasc">
                                <span>Data Nascimento</span>
                                <DatePicker
                                    selected={dataNascCliente}
                                    onChange={(date: Date) => setDataNascClientes(date)}
                                    locale="pt"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </label>

                            <label htmlFor="telefone">
                                <span>Telefone</span>
                                <input 
                                    type="text" 
                                    name="telefone" 
                                    value={ telefoneCliente }
                                    onChange={ (e) => setTelefoneClientes(e.target.value) }
                                />
                            </label>

                            <label htmlFor="sexo">
                                <span>Sexo:</span>
                                    <select id="sexo" value={sexoCliente} onChange={(e) => setSexoClientes(e.target.value)}>
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
                                    onChange={ (e) => setEmailClientes(e.target.value) }
                                />
                            </label>

                            <label htmlFor="senha">
                                <span>Senha</span>
                                <input 
                                    type="password" 
                                    name="senha" 
                                    value={senhaCliente} 
                                    onChange={ (e)=> setSenhaClientes(e.target.value) }
                                />
                            </label>

                            <div className="buttons">
                                <button className="form-btn" type="submit">Atualizar</button>
                                <button className="form-btn" onClick={() => desativar(userID)}>Desativar Cadastro</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}

export default PerfilPage