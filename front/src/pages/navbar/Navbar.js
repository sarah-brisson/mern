import React from 'react';
import { Grommet, Text, Menu } from 'grommet';
import '../../styles/navbar.css';
import '../../styles/global.css'

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLight: window.localStorage.getItem("isLight") === (undefined || null || '') ? true : window.localStorage.getItem("isLight")
        };

        this.onClickTheme = this.onClickTheme.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    // light-dark mode handler
    onClickTheme(event) {
        const newLight = this.state.isLight === "true" ? "false" : "true";
        this.setState({ isLight: newLight }, () => {
            window.localStorage.setItem("isLight", this.state.isLight)
        })
    }

    // Logout
    signOut() {
        window.sessionStorage.clear();
        this.props.history.push('/authentification')
    }

    render() {
        return (
            <div id="navbar" className={this.state.isLight === "true" ? "nav-light" : "nav-dark"}>
                <Grommet>
                    <Menu
                        label="Menu"
                        items={[
                            { label: 'Sign out', onClick: this.signOut }
                        ]}
                    />
                    <img src={require('../../images/logo.PNG')} id="logo" alt=""></img>
                    <label id="text">{window.sessionStorage.getItem("username")}</label>
                    <h1 id="title">{this.props.title}</h1>
                    <div id="switch-area">
                        <Text>Light</Text>
                        <label className="switch">
                            <input type="checkbox" onClick={this.onClickTheme} defaultChecked={this.state.isLight === "false"}></input>
                            <span className="slider round"></span>
                        </label>
                        <Text>Dark</Text>
                    </div>
                </Grommet>
            </div>
        );
    }
}

export default Navbar;
