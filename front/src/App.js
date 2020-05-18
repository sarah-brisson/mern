import React from 'react';
import { Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css';
import Authentification from './pages/login/Auth';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import DetailPage from './pages/detailPage/DetailPage'

function App() {
    return (
        <Router>
            <Route path="/home" component={Home} />
            <Route path="/detail/:id" component={DetailPage} />
            <Route path="/authentification" component={Authentification} />
            <Route path="/register" component={Register} />
            <Route exact path="/">
                <Redirect to="home" />
            </Route>
        </Router>
    );
}

export default App;
