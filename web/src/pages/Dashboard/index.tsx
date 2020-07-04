import React from 'react';

import './Dashboard.css'

import Header from '../../components/Header'
import Page from '../../components/Page'
import Content from '../../components/Content'

const Dashboard = () => {
    const [section, setSection] = React.useState(1);

    function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const value = event.currentTarget.value;
        setSection(Number(value));
    }

    return(
        <Page id="page-dashboard">
            <Content>
                <Header/>
                <h1 className="dashboard">Meu Painel</h1>

                <span className="barra" ></span>

                <main className="dashboard">
                    <ul>
                        <li>
                            <button 
                                id="visits" 
                                name="visits"
                                className={(section === 1) ? "section active" : "section"}
                                value="1"
                                onClick={handleClick}
                                >Minhas visitas
                            </button>
                        </li>
                        <li>
                            <button 
                                id="budgets"
                                name="budgets"
                                className={(section === 2) ? "section active" : "section"}
                                value="2"
                                onClick={handleClick}
                                >Meus orçamentos
                            </button>
                        </li>
                        <li>
                            <button 
                                id="works"
                                name="works"
                                className={(section === 3) ? "section active" : "section"}
                                value="3"
                                onClick={handleClick}
                                >Trabalhos em progresso
                            </button>
                        </li>
                    </ul>

                    <div className="table-group">
                        <table className="visits">
                            <tr>
                                <td>Nome</td>
                                <td>Idade</td>
                                <td>Profissão</td>
                            </tr>
                            <tr>
                                <td>Ted</td>
                                <td>22</td>
                                <td>Estudante</td>
                            </tr>
                            <tr>
                                <td>Ralf</td>
                                <td>26</td>
                                <td>Designer</td>
                            </tr>
                        </table>
                    </div>
                </main>
            </Content>
        </Page>
    );
}

export default Dashboard;