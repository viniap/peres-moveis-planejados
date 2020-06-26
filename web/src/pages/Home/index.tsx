import React from 'react';
import {} from 'react-icons/';
import { Link } from 'react-router-dom';

import handIcon from '../../assets/hand.svg'
import './Home.css'
import Header from '../../components/Header'

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <Header />

                <main>
                    <h1>Aqui seu projeto dos sonhos se torna realidade</h1>
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
            </div>
        </div>
    );
}

export default Home;