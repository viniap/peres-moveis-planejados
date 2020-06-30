import React from 'react';
import { Link } from 'react-router-dom';

import './Login.css'

import Header from '../../components/Header'
import RegisterModal from '../RegisterModal'
import useAuth from '../../contexts/auth'

const Login = () => {

    const { signIn } = useAuth();

    const [inputData, setInputData] = React.useState({
        email: '',
        password: ''
      });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;

        setInputData({ ...inputData, [name]: value })
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
    
        const { email, password } = inputData;
    
        const data = {
          email,
          password
        };

        signIn(data);
    }

    return (
        <div id="page-login">
            <div className="content">
                <Header />

                <h1>Entrar</h1>

                <span className="barra" ></span>

                <form onSubmit={handleSubmit}>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="password">Senha</label>
                            <input 
                                type="password"
                                name="password"
                                id="password"
                                onChange={handleInputChange}
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