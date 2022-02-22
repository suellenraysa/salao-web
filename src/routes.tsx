import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import PerfilPage from "./pages/Perfil";
import FormaPagamentoPage from "./pages/FormaPagamento";
import ServicoPage from "./pages/Servico";
import AgendamentoPage from "./pages/Agendamento";
import FuncaoPage from "./pages/Funcao";
import ProfissionalPage from "./pages/Profissional";
import CadastroPage from "./pages/Cadastro";
import PrincipalPage from "./pages/Principal";
import TabelaPrecoPage from "./pages/TabelaPreco";
import ClientePage from "./pages/Cliente";
import ProfissionalFuncaoPage from "./pages/ProfissionalFuncao";
import RelatorioServicoPage from "./pages/RelatorioServico";
import RelatorioComissaoPage from "./pages/RelatorioComissao";
import AgendaProfissionalPage from "./pages/AgendaProfissional";
import ControleAgendaPage from "./pages/ControleAgenda";
import CarrinhoPage from "./pages/Carrinho";

import FuncionarioPrivateRouter from "./routes/FuncionarioPrivateRouter";
import ClientePrivateRouter from "./routes/ClientePrivateRouter";
import PrivateRouter from "./routes/PrivateRouter";
import FuncionarioPage from "./pages/Funcionario";
import ProfissionalPrivateRouter from "./routes/ProfissionalPrivateRouter";
import AgendamentoFunc from "./pages/AgendamentoFunc";
import GerentePrivateRouter from "./routes/GerentePrivateRouter";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={PrincipalPage} />
      <Route path="/login" exact component={Login} />
      <Route path="/cadastro" exact component={CadastroPage} />
      <Route path="/tabelaPreco" exact component={TabelaPrecoPage} />
      <Route path="/perfil" exact component={PerfilPage} />
      <Route path="/carrinho" exact component={CarrinhoPage} />

      <PrivateRouter path="/home" exact component={Home} />

      <ClientePrivateRouter path="/agendamento" exact component={AgendamentoPage} />

      <GerentePrivateRouter path="/formaPagamento" exact component={FormaPagamentoPage} />
      <GerentePrivateRouter path="/servico" exact component={ServicoPage} />
      <GerentePrivateRouter path="/funcao" exact component={FuncaoPage} />
      <GerentePrivateRouter path="/funcionario" exact component={FuncionarioPage} />
      <GerentePrivateRouter path="/relatorioServico" exact component={RelatorioServicoPage} />
      <GerentePrivateRouter path="/relatorioComissao" exact component={RelatorioComissaoPage} />
      
      <FuncionarioPrivateRouter path="/profissional" exact component={ProfissionalPage} />
      <FuncionarioPrivateRouter path="/cliente" exact component={ClientePage} />      
      <FuncionarioPrivateRouter path="/profissionalFuncao" exact component={ProfissionalFuncaoPage} />      
      <FuncionarioPrivateRouter path="/controleAgenda" exact component={ControleAgendaPage} />      
      <FuncionarioPrivateRouter path="/agendamentoFunc" exact component={AgendamentoFunc} />      
      
      <ProfissionalPrivateRouter path="/agendaProfissional" exact component={AgendaProfissionalPage} />
    </BrowserRouter>
  );
}

export default Routes;
