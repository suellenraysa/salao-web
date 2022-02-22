import React, { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header/";
import MenuLateral from "../../components/MenuLateral/";
import api from "../../services/api";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'
import "./styles.css";

// importando os icones
import { AiOutlineUpload } from "react-icons/ai";
import { MdDeleteForever, MdSearch } from "react-icons/md";

function ServicoPage(){
    const [funcoes, setFuncoes] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [idFuncao, setIdFuncao] = useState("")
    const [nomeServico, setNomeServico] = useState("");
    const [valorServico, setValorServico] = useState("");
    const [comissaoServico, setComissaoServico] = useState("");
    const [tempoServico, setTempoServico] = useState("");
    const [idServico, setIdServico] = useState("");
    const [pesquisa, setPesquisa] = useState("")

    useEffect(() => {
        getFuncoes() 
        getServicos()
    }, [])

    async function getFuncoes(){
        try {
            const response = await api.get("funcao"); 
            setFuncoes(response.data)
        } catch(err) {
            toast.error("Erro ao consultar funções");
        }
    }

    async function getServicos(){
        try {
            const response = await api.get("servicos"); 
            setServicos(response.data)
        } catch(err) {
            toast.error("Erro ao consultar servicos");
        }
    }

    async function pesquisar(e: FormEvent){
        e.preventDefault()

        try{
            const response = await api.get(`servicos/nomeServico/${pesquisa}`)
            setServicos(response.data)
        } catch(err){
            toast.error(`Erro ao realizar a pesquisa, ${err}`)
        }
    }

    async function salvar(e: FormEvent){
        e.preventDefault();

        if (idServico){
            alterar();
        }
        else {
            cadastrar();
        }
    }

    async function cadastrar(){
        try{
            await api.post("servicos", {
                funcao_id: idFuncao,
                nome: nomeServico,
                valor: valorServico,
                comissao: comissaoServico,
                tempo_servico: tempoServico
            });
            limpar()

            toast.success("Serviço cadastrado com sucesso!");
    
            getServicos();
        } catch(err){
            toast.error("Erro ao cadastrar serviço!");
        }
    }

    async function alterar(){
        try{
            await api.put(`servicos/${idServico}`, {
                funcao_id: idFuncao,
                nome: nomeServico,
                valor: valorServico,
                comissao: comissaoServico,
                tempo_servico: tempoServico
            });
            limpar()

            toast.success("Serviço alterado com sucesso!");
    
            getServicos();
        } catch(err){
            toast.error("Erro ao alterar serviço!");
        }
    }

    async function excluir(id:number){
        try{
            confirmAlert({
                title: 'Confirmar ação',
                message: 'Tem certeza que deseja excluir este serviço?',
                buttons: [
                    {
                        label: 'Sim',
                        onClick: async ()=> {
                            await api.delete(`servicos/${id}`)
                            getServicos();
                            toast.success("Serviço excluído com sucesso!");
                        }
                    },
                    {
                        label: 'Não',
                        onClick: ()=>{}
                    }
                ]
            });
        } catch(err){
            toast.error("Erro ao excluir serviço!");
        }
    }   
    
    async function carregar(servico:any){
        setNomeServico(servico.nome);
        setValorServico(servico.valor);
        setComissaoServico(servico.comissao);
        setTempoServico(servico.tempo_servico);
        setIdFuncao(servico.funcao_id);
        setIdServico(servico.servicos_id);
    }

    async function limpar(){
        setNomeServico("");
        setValorServico("");
        setComissaoServico("");
        setTempoServico("");
        setIdFuncao("");
        setIdServico("");
    }

    return (
        <>
            <Header />

            <main>
                <MenuLateral />

                <div className="servico main-container">
                    <div className="servico cadastro-form">
                        <h1>Cadastro de Serviços</h1>
                        <form className="form" onSubmit={salvar}>
                            <label htmlFor="funcao">
                                <span>Função</span>
                                <select name="nome_funcao" onChange={(e)=> setIdFuncao(e.target.value)}>
                                <option value="">Selecione a Função</option>
                                    {funcoes.map((funcao: any) => (
                                        <option key={funcao.funcao_id}
                                            id={funcao.funcao_id} 
                                            value={funcao.funcao_id} 
                                            selected={idFuncao && idFuncao === funcao.funcao_id ? true : false}
                                        >
                                            {funcao.nome_funcao}
                                        </option>
                                    ))}
                                </select>
                            </label>
                                
                            <label htmlFor="nome">
                                <span>Nome do Servico</span>
                                <input 
                                    type="text" 
                                    name="nome_servico" 
                                    value={nomeServico}
                                    onChange={(e)=> setNomeServico(e.target.value)}
                                />
                            </label>
                            
                            <label htmlFor="valor">
                                <span>Valor do Servico</span>
                                <input 
                                    type="text" 
                                    name="valor_servico"
                                    value={valorServico}
                                    onChange={(e) => setValorServico(e.target.value)} 
                                />
                            </label>
                            
                            <label htmlFor="comissao">
                                <span>Comissão</span>
                                <input 
                                    type="text" 
                                    name="comissao_servico" 
                                    value={comissaoServico}
                                    onChange={(e) => setComissaoServico(e.target.value)}
                                />
                            </label>
                            
                            <label htmlFor="tempo_servico">
                                <span>Tempo de execução do Servico</span>
                                <input 
                                    type="time" 
                                    name="tempo_servico" 
                                    value={tempoServico}
                                    onChange={(e) => setTempoServico(e.target.value)} 
                                />
                            </label>
                            
                            <div className="buttons">
                                <button name="acao" value="cadastrar" type="submit">Cadastrar</button>
                                <button name="acao" value="alterar" type="submit">Alterar</button>
                            </div>
                        </form>
                    </div>

                    <div className="search">
                        <form onSubmit={pesquisar}>
                            <input 
                                className="pesquisa" 
                                type="text" 
                                placeholder="nome do serviço"
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
                                    <th>Função de quem realiza o serviço</th>
                                    <th>Nome do Serviço</th>
                                    <th>Valor</th>
                                    <th>Comissão</th>
                                    <th>Tempo do serviço</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicos.map((servico: any) => (
                                    <tr key={servico.servicos_id}>
                                        <td>
                                            {funcoes.map((funcao: any) => (
                                                funcao.funcao_id === servico.funcao_id ? funcao.nome_funcao : ""
                                            ))}
                                        </td>
                                        <td>{servico.nome}</td>
                                        <td>{servico.valor}</td>
                                        <td>{servico.comissao}</td>
                                        <td>{servico.tempo_servico}</td>
                                        <td>
                                            <div className="form" >
                                                <div className='material excluir'>
                                                    <button name='acao' value='excluir' onClick={() => excluir(servico.servicos_id)}>
                                                        <span className='material-icons'><MdDeleteForever/></span>
                                                    </button>
                                                </div>
                                                <div className='material carregar'>
                                                    <button name='acao' value='carregar' onClick={() => carregar(servico)}>
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

export default ServicoPage