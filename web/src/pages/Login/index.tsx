import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css'

import logo from '../../assets/logo.svg'

const Login = () => {
    return (
        <div id="page-login">
            <div className="content">
                <header>
                    <img src={logo} alt="Peres Móveis Planejados"/>
                    <div>
                        <Link to="/sobre"><span>Sobre</span></Link>
                        <Link to="/portfolio"><span>Portfólio</span></Link>
                        <Link to="/contato"><span>Contato</span></Link>
                        <Link className="login" to="/entrar">Entrar</Link>
                    </div>
                </header>

                <h1>Entrar</h1>

                <span className="barra" ></span>

                <form>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="password">Senha</label>
                            <input 
                                type="password"
                                name="password"
                                id="password"
                            />
                        </div>

                        <button type="submit">Entrar</button>
                        {/*<Link to="/esqueci">Esqueci minha senha</Link>*/}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;