import React from 'react'

import './Visit.css'

import Header from '../../components/Header'

const Visit = () => {
    return (
        <div id="page-visit">
            <div className="content">
                <Header />

                <h1>Agendamento de visita</h1>

                <span className="barra" ></span>

                <form>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="cep">CEP</label>
                            <input 
                                type="text"
                                name="cep"
                                id="cep"
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
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <input 
                                type="text"
                                name="city"
                                id="city"
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
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="num">Número</label>
                            <input 
                                type="text"
                                name="num"
                                id="num"
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
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="time">Horário</label>
                            <input 
                                type="text"
                                name="time"
                                id="time"
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
                            />
                        </div>
                    </div>

                    <p>Gostou de algum móvel e deseja algo igual ou parecido? Envie-nos uma imagem</p>

                    <button className="upload">Upload</button>

                    <button className="schedule">Agendar</button>
                </form>
            </div>
        </div>
    );
}

export default Visit;