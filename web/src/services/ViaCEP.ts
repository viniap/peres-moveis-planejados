import axios from 'axios'

const ViaCEP = axios.create({
    baseURL: 'https://viacep.com.br/ws/'
});

export default ViaCEP;