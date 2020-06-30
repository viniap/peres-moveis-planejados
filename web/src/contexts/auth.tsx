import React from 'react'
import api from '../services/api'

interface User {
    id: number;
    name: string;
    surname: string;
    email: string;
    whatsapp: string;
    address_id: number;
}

interface AuthContextData {
    signed: boolean;
    user: User | null;
    signIn(data: object): Promise<void>;
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
        const response = await api.post<ServerAuthResponse>('/users/session', data);

        setUser(response.data.user);

        api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

        localStorage.setItem('@peres-moveis-planejados/user', JSON.stringify(response.data.user));
        localStorage.setItem('@peres-moveis-planejados/token', response.data.token);
        window.location.reload();
    }

    function signOut() {
        localStorage.clear();
        setUser(null);
    }

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