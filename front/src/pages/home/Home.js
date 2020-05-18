import React from 'react';
import { Grommet, Box } from 'grommet';
import '../../styles/App.css';
import '../../styles/global.css'
import Navbar from '../navbar/Navbar'
import City from './City';
import AddCity from './AddCity';

const axios = require('axios');
const back = require("../../utils/back-api.js")

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mounted: false,
            isLight: window.localStorage.getItem("isLight"),
            cities: [String]
        }

        this.getCities = this.getCities.bind(this);
    }

    componentDidMount() {
        this.getCities();
    }

    // get cities with the username
    getCities() {
        const url = back.URL.base_URL + back.URL.users + back.URL.getCities;
        const user = window.sessionStorage.getItem("username")
        axios
            .post(url, { username: user })
            .catch((err) => {
                console.log("error", err);
            })
            .then((res) => {
                this.setState({ cities: res.data.cities, mounted: true })
            });

    }

    render() {
        return (
            <div className={this.state.isLight === "true" ? "light" : "dark"}>
                <Navbar history={this.props.history} title="Today"/>
                <Grommet>
                    <Box direction="row">
                        {this.state.mounted ? this.state.cities.map(element => {
                            return <City id={element} history={this.props.history}/>
                        }) : ''}
                        <AddCity />
                    </Box>
                </Grommet>
            </div>
        );
    }
}

export default Home;
