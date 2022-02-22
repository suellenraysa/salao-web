import React, { FormEvent, useEffect, useState } from "react";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";
import api from "../../services/api";
import {RiFileExcel2Line} from "react-icons/ri";
import { CSVLink } from "react-csv";

import DatePicker, { registerLocale } from "react-datepicker";
import pt from 'date-fns/locale/pt-BR';
import { format } from "date-fns";

import "./styles.css";

function  RelatorioComissaoPage(){
    registerLocale("pt", pt)

    const [relatorioComissoes, setRelatorioComissao] = useState([]);
    const [csvData, setCsvData] = useState<any[]>([]);
    const [profissionais, setProfissionais] = useState([]);
    const [idProfissional, setIdProfissional] = useState('');
    const [dataFrom, setDataFrom] = useState(new Date());
    const [dataTo, setDataTo] = useState(new Date());

    useEffect(() => {
        getProfissional()
    }, [])

    async function getProfissional(){
        const response = await api.get("profissional");
        setProfissionais(response.data);
    }

    async function geraRelatorio(e: FormEvent){
        e.preventDefault();

        const dataFromFormatada = format(dataFrom, "yyyy-MM-dd");
        const dataToFormatada = format(dataTo, "yyyy-MM-dd");

        const response = await api.post("relatorio/servico", {
            profissional_id: idProfissional,
            from: dataFromFormatada,
            to: dataToFormatada
        });

        const dados = response.data.map((dado: any) => {
            return {
                nome_profissional: dado.nome_profissional,
                data_atendimento: format(new Date(dado.data_atendimento), "dd/MM/yyyy"),
                nome_servico: dado.nome_servico,
                valor: `R$ ${dado.valor}`,
                comissao: `${dado.comissao}%`,
                valorComissao: "R$" + (dado.valor * dado.comissao) / 100
            }            
        })

        setRelatorioComissao(dados);

        const csv = [];

        csv.push(["Relatório de Comissão"]);
        csv.push([format(new Date(), "dd/MM/yyyy hh:MM")]);
        csv.push(["Profissional", "Data Atendimento", "Serviço", "Valor", "Comissão", "Valor da Comissão"]);
        
        dados.map((dado: any) => {
            let linha = [];
            linha.push(dado.nome_profissional);
            linha.push(dado.data_atendimento);
            linha.push(dado.nome_servico);
            linha.push(dado.valor);
            linha.push(dado.comissao);
            linha.push(dado.valorComissao);

            csv.push(linha);
        })

        setCsvData(csv);
    }

    return (
        <>
            <Header/>

            <main>
                <MenuLateral/>

                <div className="relatorio-comissao main-container">
                    <h1>Relatorio de Comissão</h1>
                    <section className="info-select">
                        <div className="select-profissional">
                            <label htmlFor="">
                                <span className="spn-titulo">Selecione o profissional</span>
                                <select name="comissao" id="" onChange={(e) => setIdProfissional(e.target.value)}>
                                    <option value="">Selecione o profissional</option>
                                    {profissionais.map((profissional: any) => (
                                        <option value={profissional.profissional_id}>{profissional.nome}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
        
                        <div className="select-data">
                            <span className="spn-titulo">Selecione o período</span>
                            <form onSubmit={geraRelatorio}>
                                <label htmlFor="">
                                    <span>De:</span>
                                    <DatePicker
                                        selected={dataFrom}
                                        onChange={(date: Date) => setDataFrom(date)}
                                        locale="pt"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </label>

                                <label htmlFor="">
                                    <span>Até:</span>
                                    <DatePicker
                                        selected={dataTo}
                                        onChange={(date: Date) => setDataTo(date)}
                                        locale="pt"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </label>

                                <button className="buttons" type="submit">Gerar Relatório</button>
                            </form>
                        </div>
                    </section>

                        <div className="table">
                            <table>
                                <thead>
                                    <tr>                                
                                        <th>Profissional</th>
                                        <th>Data</th>
                                        <th>Serviço</th>
                                        <th>Valor do Serviço</th>
                                        <th>Comissão</th>
                                        <th>Valor da comissão</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {relatorioComissoes.map((relatorioComissao: any) => (
                                        <tr>
                                            <td>{relatorioComissao.nome_profissional}</td>
                                            <td>{relatorioComissao.data_atendimento}</td>
                                            <td>{relatorioComissao.nome_servico}</td>
                                            <td>{relatorioComissao.valor}</td>
                                            <td>{relatorioComissao.comissao}</td>
                                            <td>{relatorioComissao.valorComissao}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    <div className="buttons-export">
                        <label htmlFor="">
                            <CSVLink
                                className="buttons"
                                data={csvData}
                                filename={`relatorioComissao.csv`}
                                separator=";"
                            >
                                Exportar para Excel
                            </CSVLink>
                            <span className="material-icons"><RiFileExcel2Line/></span>
                        </label>
                    </div>
                </div>
            </main>
        </>
    )
}

export default RelatorioComissaoPage