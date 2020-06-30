import React from 'react'

import './Profile.css'
import api from '../../services/api'

import Header from '../../components/Header'
import useAuth from '../../contexts/auth'

const Profile = () => {
    const { user } = useAuth();

    const [inputData, setInputData] = React.useState({
        name: user?.name,
        surname: user?.surname,
        email: user?.email,
        cep: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        reference: '',
        whatsapp: user?.whatsapp,
        password: '',
        newpassword: ''
    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;

        setInputData({ ...inputData, [name]: value })
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
    
        const address = {
            cep: inputData.cep,
            state: inputData.state,
            city: inputData.city,
            neighborhood: inputData.neighborhood,
            street: inputData.street,
            number: inputData.number,
            reference: inputData.reference
        }

        const visitData = {
            address,
            whatsapp: inputData.whatsapp,
        }
    
        await api.post('visits', visitData);
    
        alert('Visita agendada com sucesso');
      }

    return (
        <div id="page-profile">
            <div className="content">
                <Header />

                <h1>Meu perfil</h1>

                <span className="barra" ></span>

                <form onSubmit={handleSubmit}>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="cep">Nome</label>
                            <input 
                                type="text"
                                name="name"
                                id="name"
                                defaultValue={inputData.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="cep">Sobrenome</label>
                            <input 
                                type="text"
                                name="surname"
                                id="surname"
                                defaultValue={inputData.surname}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="cep">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                defaultValue={inputData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="cep">CEP</label>
                            <input 
                                type="text"
                                name="cep"
                                id="cep"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="state">Estado</label>
                            <input 
                                type="text"
                                name="state"
                                id="state"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <input 
                                type="text"
                                name="city"
                                id="city"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="neighborhood">Bairro</label>
                            <input 
                                type="text"
                                name="neighborhood"
                                id="neighborhood"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="street">Rua/Avenida</label>
                            <input 
                                type="text"
                                name="street"
                                id="street"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="num">Número</label>
                            <input 
                                type="text"
                                name="num"
                                id="num"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="reference">Referência (opcional)</label>
                            <input 
                                type="text"
                                name="reference"
                                id="reference"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                defaultValue={inputData.whatsapp}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="date">Senha</label>
                            <input 
                                type="text"
                                name="date"
                                id="date"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="time">Nova senha</label>
                            <input 
                                type="text"
                                name="time"
                                id="time"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <button className="schedule" type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}

export default Profile;