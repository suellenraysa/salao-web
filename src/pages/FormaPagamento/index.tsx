import React, { FormEvent, useEffect, useState } from "react";
import api from "../../services/api";
import Header from "../../components/Header/";
import MenuLateral from "../../components/MenuLateral/";

import { toast } from "react-toastify";
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineUpload } from "react-icons/ai";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'

import "./styles.css";

function FormaPagamentoPage() {
  const [formaPagamento, setFormaPagamento] = useState("");
  const [idFormapagamento, setIdFormapagamento] = useState("");
  const [formasPagamentos, setFormasPagamentos] = useState([]);


    useEffect(() => {
        getFormasPagamentos() 
    }, [])

    async function getFormasPagamentos(){
        try {
            const response = await api.get("formaPagamento"); 
            setFormasPagamentos(response.data)
        } catch(err) {
            toast.error("Erro ao consultar formas de pagamentos");
        }
    }

    async function salvar(e: FormEvent){
        e.preventDefault();

        if (idFormapagamento){
            editar();
        }
        else {
            cadastrar();
        }
    }

  async function cadastrar() {

    try {   
      await api.post("formaPagamento", {
        forma_pagamento : formaPagamento
      });

      setFormaPagamento("")
      getFormasPagamentos()

      toast.success("Forma de pagamento cadastrado com sucesso!");
    } catch (err) {
      toast.error(err.error);
    }
  }

  async function editar(){
    try{
        await api.put(`formaPagamento/${idFormapagamento}`, {
            forma_pagamento: formaPagamento,
        });
        limpar()

        toast.success("Forma de pagamento alterado com sucesso!");

        getFormasPagamentos();
    } catch(err){
        toast.error("Erro ao editar forma de pagamento!");
        }
    }   

    async function limpar(){
        setFormaPagamento("");
    }


  async function excluir(id: number){
    confirmAlert({
        title: 'Confirmar ação',
        message: 'Tem certeza que deseja excluir a forma de Pagamento?',
        buttons: [
            {
                label: 'Sim',
                onClick: async ()=> {
                    await api.delete(`formaPagamento/${id}`);
                    toast.success("Forma de pagamento excluído com sucesso!");
                    getFormasPagamentos()
                }
            },
            {
                label: 'Não',
                onClick: ()=>{}
            }
        ]
    });
  }

  async function carregar(formaPagamento:any){
    setFormaPagamento(formaPagamento.forma_pagamento);
    setIdFormapagamento(formaPagamento.forma_pagamento_id)
  } 

  return (
      <>
        <Header />

        <main>
            <MenuLateral />

            <div className="formaPagamento main-container">
                <div className="formaPagamento cadastro-form">
                    <h1>Cadastro de Formas de Pagamentos</h1>

                    <form className="form" onSubmit={salvar}> 
                        <label htmlFor="forma_pagamento">
                            <span>Forma de Pagamento</span>
                            <input type="text" 
                            name="forma_pagamento" 
                            value={formaPagamento}
                            onChange={(e) => setFormaPagamento(e.target.value)}
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
                                <th>Forma de Pagamento</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formasPagamentos.map((forma: any) => (
                                <tr key={forma.forma_pagamento_id}>
                                    <td>{forma.forma_pagamento}</td>
                                    <td>
                                        <div className="form">
                                            <div className='material excluir' onClick={() => excluir(forma.forma_pagamento_id)}>
                                                <button name='acao' value='excluir'> 
                                                    <span className='material-icons'><MdDeleteForever/></span>
                                                </button>
                                            </div>
                                            <div className='material carregar' onClick={() => carregar(forma)}>
                                                <button name='acao' value='carregar'>
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
  );
}

export default FormaPagamentoPage;
