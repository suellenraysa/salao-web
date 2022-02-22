import React, { FormEvent, useState} from "react";
import { useHistory } from "react-router-dom";
import api from "../../services/api";
import imgCadastro from "../../assets/images/escova.jpg";

import { toast } from "react-toastify";
import "./styles.css";
import ValidarCPF from "../../components/ValidarCPF";

function CadastroPage(){
    const history = useHistory();
    const [nome, setNome] = useState("");
    const [cpf, setCPF] = useState("");
    const [sexo, setSexo] = useState("F");
    const SexoList = [
        { id: 'F', name: 'Feminino' },
        { id: 'M', name: 'Masculino' },
    ];
    const [data_nasc, setDataNasc] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    async function cadastrar(e: FormEvent){
        e.preventDefault();

        const validaCPF = ValidarCPF(cpf)

        if(validaCPF === true){
            try{
                const response = await api.post("cliente", {
                    nome: nome,
                    cpf: cpf,
                    sexo: sexo,
                    data_nasc: data_nasc,
                    telefone: telefone,
                    email: email,
                    senha: senha,
                    login: email
                })
    
                toast.success(response.data);
    
                history.push('Login');
            } catch(err){
                toast.error("Falha ao cadastrar o/a cliente!");
            }
        } else {
            toast.error("CPF inválido!");
        }
    }

    return (
        <div className="cliente container-cadastro"> 
            <div className="cliente container-conteudo"> 
                <div className="cadastro-img"> 
                    <img src={imgCadastro} alt="serviço de escova"/>
                </div>

                <div className="cliente cadastro-form">
                    <span>Faça seu Cadastro</span>
                    <form className="form" onSubmit={cadastrar}>
                        <input 
                            id="nome" 
                            type="text" 
                            placeholder="Digite seu nome" 
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />

                        <input 
                            id="cpf" 
                            type="text" 
                            placeholder="Digite seu cpf" 
                            value={cpf}
                            onChange={(e) => setCPF(e.target.value)}
                        />

                        <label>
                            <span>Sexo:</span>
                            <select id="sexo" value={sexo} onChange={(e) => setSexo(e.target.value)}>
                                {SexoList.map((item) => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </label>
                        
                        <input 
                            id="dataNasc" 
                            type="date" 
                            placeholder="Digite a data de nascimento" 
                            value={data_nasc}
                            onChange={(e) => setDataNasc(e.target.value)}
                        />

                        <input 
                            id="telefone" 
                            type="text" 
                            placeholder="Digite seu telefone" 
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                        />

                        <input 
                            id="email" 
                            type="email" 
                            placeholder="E-mail" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input 
                            id="senha" 
                            type="password" 
                            placeholder="Insira uma senha" 
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <button type="submit"> Cadastrar </button>

                        <div className="linha"></div>

                        <div className="cadastro-opcoes">
                            <a href="Login"> Já possui cadastro? <strong>Faça o login!</strong></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CadastroPage