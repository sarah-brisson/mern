import React from 'react';
import '../../styles/city.css';
import '../../styles/global.css';
import { Grommet, Anchor, Box, Heading } from 'grommet';
import { FormPreviousLink, Trash } from 'grommet-icons';
import Navbar from '../navbar/Navbar';
import DayWeather from './DayWeather';

const axios = require('axios')
const api = require("../../utils/weather-api.js")
const back = require("../../utils/back-api.js")

class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLight: window.localStorage.getItem("isLight"),
            city_name: '',
            dates: [],
            mounted: false,
            index: ''
        }

        this.getCityWeather = this.getCityWeather.bind(this);
        this.deleteCity = this.deleteCity.bind(this);
    }

    componentDidMount() {
        this.getCityWeather(this.props.match.params.id);
    }

    //get weather of city
    getCityWeather(id) {
        let url = api.api.base_URL + api.api.forecast_weather + "id=" + id + "&appid=" + api.api.API_KEY;
        axios.get(url)
            .catch((err) => {
                console.error(err)
            })
            .then((data) => {
                this.setAllInfo(data.data);
            })
    }

    // set the states with the informations received
    setAllInfo(data) {
        let dates = [];
        let date = '';
        let tempMin = 1000;
        let tempMax = 0;
        // for each date calculate the min and max temps
        data.list.forEach(element => {
            if (date === '') date = element.dt_txt.split(' ')[0];
            if (date !== element.dt_txt.split(' ')[0]) {
                dates.push([date, tempMin, tempMax]);
                date = element.dt_txt.split(' ')[0];
                tempMin = 1000;
                tempMax = 0;
            }
            if (element.main.temp_min < tempMin) tempMin = element.main.temp_min;
            if (element.main.temp_max > tempMax) tempMax = element.main.temp_max;
        });

        this.setState({
            city_name: data.city.name,
            dates: dates,
            mounted: true
        })
    }

    deleteCity() {
        const url = back.URL.base_URL + back.URL.users + back.URL.removeCity
        axios
            .post(url, { city: this.props.match.params.id, username: window.sessionStorage.getItem("username") })
            .catch((err) => {
                console.log("error", err);
            })
            .then((res) => {
                this.props.history.push('/#/home')
            })
    }

    render() {
        return (
            <div className={this.state.isLight === "true" ? "light" : "dark"}>
                <Navbar theme="true" history={this.props.history} title="Forecast" />
                <Grommet>
                    <Box>
                        <div>
                            <Anchor icon={<FormPreviousLink />} href="/#/home" label="Go back" size="large" id="go-back" color={this.state.isLight === "true" ? "" : "white"}/>
                            <Anchor icon={<Trash />} label="Delete this city" size="large" id="delete" onClick={() => { this.deleteCity() }} color={this.state.isLight === "true" ? "" : "white"}/>
                        </div>
                        <Heading alignSelf="center" size="large">{this.state.city_name}</Heading>
                        <Box direction="row" alignSelf="center">
                            {this.state.mounted ? this.state.dates.map(element => {
                                return <DayWeather date={element} />
                            }) : ''}
                        </Box>
                    </Box>
                </Grommet>
            </div>
        );
    }
}

export default DetailPage;

