import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import useAuth from './contexts/auth'

import Home from './pages/Home'
import Login from './pages/Login'
import Visit from './pages/Visit'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'

const LoggedRoutes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Visit} path="/agendar" />
            <Route component={Profile} path="/perfil" />
            <Route component={Dashboard} path="/painel" />
        </BrowserRouter>
    );
}

const UnloggedRoutes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/entrar" />
        </BrowserRouter>
    );
}

const Routes = () => {

    const { signed } = useAuth();

    return signed ? <LoggedRoutes/> : <UnloggedRoutes/>;
}

export default Routes;