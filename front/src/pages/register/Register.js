import React from 'react';
import { Button, Form, FormField, Grommet } from 'grommet';
import '../../styles/App.css';

const axios = require('axios');
const back = require('../../utils/back-api')

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            username: '',
            password: ''
        };

        this.handleRegister = this.handleRegister.bind(this);
    }

    // Register a new user
    handleRegister(event) {
        const url = back.URL.base_URL + back.URL.users + back.URL.register;
        this.setState({ username: event.target[0].value, password: event.target[1].value }, () => {
            axios.post(url, {
                username: this.state.username,
                password: this.state.password
            })
                .catch((err) => {
                    this.setState({ error: err.response.data.error })
                })
                .then((res) => {
                    if (res) {
                        alert("Your account was created.");
                        this.props.history.push('/authentification')
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
                    <div className="register">
                        <h1 id="title-auth">Register</h1>
                        <em>{this.state.error}</em>
                        <Form onSubmit={this.handleRegister}>
                            <FormField name="usernmame" type="text" label="Username" maxLength="50" required />
                            <FormField name="password" type="password" label="Password" maxLength="50" required />
                            <div id="title-auth">
                                <Button type="submit" label="Sign in" />
                            </div>
                        </Form>
                    </div>
                </div>
            </Grommet>
        );
    }
}

export default Register;
