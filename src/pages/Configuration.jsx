import React from 'react';
import '../assets/configuracao.css';
import '../assets/login.css';

class Configuration extends React.Component {
  redirectLogin = () => {
    const { history } = this.props;
    history.push('/');
  }

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
              <option />
            </select>
          </span>
          <br />
          <span>
            Dificuldade
            <br />
            <select className="inputOpition">
              <option />
            </select>
          </span>
          <br />
          <span>
            Tipo
            <br />
            <select className="inputOpition">
              <option />
            </select>
            <br />
          </span>
          <button
            type="button"
            onClick={ this.redirectLogin }
            className="button"
          >
            Back
          </button>
        </form>
      </div>
    );
  }
}

export default Configuration;
