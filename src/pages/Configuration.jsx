import React from 'react';
import '../assets/configuracao.css';

class Configuration extends React.Component {
  render() {
    return (
      <div className="divconteiner">
        <form className="hconfig">
          <h1 className="h1config" data-testid="settings-title">
            Configuração
          </h1>
          <span>
            Categoria
            <br />
            <select className="inputOpition">
              <option/>
            </select>
          </span>
          <br />
          <span>
            Dificuldade
            <br />
            <select className="inputOpition">
              <option/>
            </select>
          </span>
          <br />
          <span>
            Tipo
            <br />
            <select className="inputOpition">
              <option/>
            </select>
          </span>
        </form>
      </div>
    );
  }
}

export default Configuration;
