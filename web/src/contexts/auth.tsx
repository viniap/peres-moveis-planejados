import React from 'react'
import api from '../services/api'

interface Address {
    cep: string;
    state: string;
    city: string;
    neighborhood: string;
    street: string;
    number: string;
    reference: string | null;
}

interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    whatsapp: string;
    address: Address | null;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(data: object): Promise<any>;
    signOut(): void;
}

interface ServerAuthResponse {
    message: string;
    token: string;
    user: User;
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {

    const [user, setUser] = React.useState<User | null>(null);
    //const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadStorageData() {
            const storagedUser = localStorage.getItem('@peres-moveis-planejados/user');
            const storagedToken = localStorage.getItem('@peres-moveis-planejados/token');

            if(storagedUser && storagedToken) {
                api.defaults.headers['Authorization'] = `Bearer ${storagedToken}`
                setUser(JSON.parse(storagedUser));
                //setLoading(false);
            }
        }

        loadStorageData();
    }, []);

    async function signIn(data: object) {
        const responseStatus = await api.post/*<ServerAuthResponse>*/('/users/session', data)
            .then(function(response) {
                setUser(response.data.user)
                api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;
                localStorage.setItem('@peres-moveis-planejados/user', JSON.stringify(response.data.user));
                localStorage.setItem('@peres-moveis-planejados/token', response.data.token);
                //window.location.reload();
                return response.status;
            })
            .catch(function(error) {
                return error.response.status;
            });
        return responseStatus;
        /*setUser(response.data.user);

        api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

        localStorage.setItem('@peres-moveis-planejados/user', JSON.stringify(response.data.user));
        localStorage.setItem('@peres-moveis-planejados/token', response.data.token);
        window.location.reload();*/
    }

    function signOut() {
        localStorage.clear();
        setUser(null);
    }

    /*function updateUser(newUser: User) {
        setUser(newUser);
    }*/

    return(
        <AuthContext.Provider value={{ signed: !!user, user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    const context = React.useContext(AuthContext);

    return context;
}