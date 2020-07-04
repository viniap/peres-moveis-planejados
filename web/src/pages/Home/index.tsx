import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css'
import useAuth from '../../contexts/auth'
import handIcon from '../../assets/hand.svg'
import Header from '../../components/Header'
import Page from '../../components/Page'
import Content from '../../components/Content'

const Home = () => {
    const { signOut } = useAuth();

    return (
        <Page id="page-home">
            <Content>
                <Header />

                <main className="home">
                    <h1 className="home">Aqui seu projeto dos sonhos se torna realidade</h1>

                    <p>
                        Mora no Distrito Federal e deseja móveis planejados exclusivos 
                        e sob medida para sua casa ou estabelecimento? Agende uma visita já.
                    </p>

                    <Link to="/agendar">
                        <span>
                            <img src={handIcon} alt=""></img>
                        </span>

                        <strong>Agende uma visita</strong>
                    </Link>
                </main>
            </Content>
        </Page>
    );
}

export default Home;