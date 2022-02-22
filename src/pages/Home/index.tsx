import React from "react";
import Header from "../../components/Header";
import MenuLateral from "../../components/MenuLateral";

import "./styles.css";

function Home() {

  return (
    <>
      <Header />
      
      <main>
        <MenuLateral />

        <div className="main-container">
          <div className="title-area">
            <div className="title-box">
              <h1 className="title">Escolha uma opção do menu</h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
