import React from 'react';
import { Button, Form, FormField, Grommet, TextInput, Anchor } from 'grommet';
import '../../styles/App.css';
const axios = require('axios')
const back = require('../../utils/back-api')

class Authentification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            username: '',
            password: ''
        };

        this.handleLogin = this.handleLogin.bind(this);
    }

    // Login
    handleLogin(event) {
        const url = back.URL.base_URL + back.URL.users + back.URL.login;
        this.setState({ username: event.target[0].value, password: event.target[1].value }, () => {
            axios.post(url, {
                username: this.state.username,
                password: this.state.password
            })
                .catch((err) => {
                    this.setState({error : err.response.data.error})
                    console.log(err.response.data.error);
                })
                .then((res) => {
                    if (res) {
                        window.sessionStorage.setItem("key", res.data.token);
                        window.sessionStorage.setItem("username", this.state.username)
                        this.props.history.push('/#/home');
                    }
                })
        });
    }

    render() {
        return (
            <Grommet>
                <div className="header">
                    <img src={require('../../images/logo.PNG')} id="theLogo" alt=""></img>
                    <img src={require('../../images/name.PNG')} id="name" alt=""></img>
                </div>
                <div className="auth-all">
                    <div className="auth">
                        <h1 id="title-auth">Login</h1>
                        <em>{this.state.error}</em>
                        <Form onSubmit={this.handleLogin}>
                            <FormField name="usernmame" label="Username" size="small">
                                <TextInput name="usernmame" type="text" label="Username" maxLength="50" size="small" required />
                            </FormField>
                            <FormField name="password" label="Password" size="small">
                                <TextInput name="password" type="password" label="Password" maxLength="50" size="small" required />
                            </FormField>
                            <div id="title-auth">
                                <Button type="submit" label="Login" />
                            </div>
                        </Form>
                    </div>
                    <div id="register">
                        <Anchor href="/register" primary label="Create an account" />
                    </div>
                </div>
            </Grommet>
        );
    }
}

export default Authentification;
