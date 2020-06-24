import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css'

import Header from '../../components/Header'
import RegisterModal from '../RegisterModal'

const Login = () => {
    return (
        <div id="page-login">
            <div className="content">
                <Header />

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

                        <div className="button-group">
                            <button type="submit">Entrar</button>
                            <Link to="/esqueci">Esqueci minha senha</Link>
                        </div>
                    </div>

                    <main>
                        <h6>Ainda não possui uma conta?</h6>
                        <RegisterModal />
                    </main>
                </form>
            </div>
        </div>
    );
}

export default Login;