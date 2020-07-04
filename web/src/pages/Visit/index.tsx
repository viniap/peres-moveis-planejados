import React from 'react'

import './Visit.css'
import api from '../../services/api'

import Header from '../../components/Header'
import useAuth from '../../contexts/auth'
import Page from '../../components/Page'
import Content from '../../components/Content'

const Visit = () => {
    const [inputData, setInputData] = React.useState({
        cep: '',
        state: '',
        city: '',
        neighborhood: '',
        street: '',
        number: '',
        reference: '',
        whatsapp: '',
        date: '',
        time: '',
        description: '',
        image: ''
    });

    const { user } = useAuth();

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

        const datetime = inputData.date + " " + inputData.time;

        const user_id = user?.id;
        console.log(user_id);

        const visitData = {
            user_id,
            address,
            whatsapp: inputData.whatsapp,
            datetime,
            description: inputData.description,
            image: inputData.image
        }
    
        await api.post('visits', visitData);
    
        alert('Visita agendada com sucesso');
      }

    return (
        <Page id="page-visit">
            <Content>
                <Header />

                <h1 className="visit">Agendamento de visita</h1>

                <span className="barra" ></span>

                <form className="visit" onSubmit={handleSubmit}>
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
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="date">Data</label>
                            <input 
                                type="text"
                                name="date"
                                id="date"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="time">Horário</label>
                            <input 
                                type="text"
                                name="time"
                                id="time"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="field-group description">
                        <div className="field">
                            <label htmlFor="description">Descrição dos móveis planejados</label>
                            <input 
                                type="text"
                                name="description"
                                id="description"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <p>Gostou de algum móvel e deseja algo igual ou parecido? Envie-nos uma imagem</p>

                    <button className="upload">Upload</button>

                    <button className="schedule" type="submit">Agendar</button>
                </form>
            </Content>
        </Page>
    );
}

export default Visit;