import React from 'react';

import { AuthProvider } from './contexts/auth'
import './App.css';

import Routes from './routes'

function App() {
  return (
    <h1>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </h1>
  );
}

export default App;
