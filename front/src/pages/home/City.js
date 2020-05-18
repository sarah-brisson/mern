import React from 'react';
import '../../styles/city.css';
import '../../styles/global.css'
import { Grommet, Text, Box, Image } from 'grommet';
import convertTemp from '../../utils/generalService';

const snow_light = require('../../images/snowing_light.png')
const snow_dark = require('../../images/snowing_dark.png')
const storm_light = require('../../images/storm_light.png')
const storm_dark = require('../../images/storm_dark.png')
const cloud_light = require('../../images/cloudy_light.png')
const cloud_dark = require('../../images/cloudy_dark.png')
const rain_light = require('../../images/raining_light.png')
const rain_dark = require('../../images/raining_dark.png')
const sun_light = require('../../images/sunny_light.png')
const sun_dark = require('../../images/sunny_dark.png')
const axios = require('axios')
const api = require("../../utils/weather-api.js")

class City extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLight: window.localStorage.getItem("isLight"),
            city_name: '',
            country_name: '',
            current_temp: '',
            min_temp: '',
            max_temp: '',
            weather: '',
            imgPath: ''
        }

        this.getCityWeather = this.getCityWeather.bind(this);
        this.goToDetail = this.goToDetail.bind(this);
    }

    componentDidMount() {
        this.getCityWeather(this.props.id);
    }

    getImg() {
        let path;
        if (this.state.weather.toLowerCase().includes('cloud')) {
            path = this.state.isLight === 'true' ? cloud_light : cloud_dark;
        } else if (this.state.weather.toLowerCase().includes('snow')) {
            path = this.state.isLight === 'true' ? snow_light : snow_dark;
        } else if (this.state.weather.toLowerCase().includes('storm')) {
            path = this.state.isLight === 'true' ? storm_light : storm_dark;
        } else if (this.state.weather.toLowerCase().includes('rain')) {
            path = this.state.isLight === 'true' ? rain_light : rain_dark;
        } else {
            path = this.state.isLight === 'true' ? sun_light : sun_dark;
        }

        return path;
    }

    //get weather of city
    getCityWeather(id) {
        let url = api.api.base_URL + api.api.current_weather + "id=" + id + "&appid=" + api.api.API_KEY;
        axios.get(url)
            .catch((err) => {
                console.error(err)
            })
            .then((data) => {
                this.setState({
                    city_name: data.data.name,
                    country_name: data.data.sys.country,
                    current_temp: data.data.main.temp,
                    min_temp: data.data.main.temp_min,
                    max_temp: data.data.main.temp_max,
                    weather: data.data.weather[0].main
                })
            })
    }

    goToDetail() {
        this.props.history.push('/detail/' + this.props.id)
    }

    render() {
        return (
            <div className={this.state.isLight  === "true" ? "card-light" : "card-dark"} id="city-card">
                <Grommet>
                    <Box width="Large" onClick={() => { this.goToDetail() }}>
                        <Text alignSelf="center" size="large">{this.state.city_name}, {this.state.country_name}</Text>
                        <Image src={this.getImg()} alignSelf="center" fit="contain" id="weather-img"></Image>
                        <Box>
                            <Text textAlign="center" size="large">{convertTemp(this.state.current_temp)}°</Text>
                        </Box>
                        <Box direction="row">
                            <Box id="temp-min">
                                <Text textAlign="center" >{convertTemp(this.state.min_temp)}</Text>
                                {/* <br></br> */}
                                <Text textAlign="center" size="small" color="#00ff9f">Min</Text>
                            </Box>
                            <Box textAlign="end" id="temp-max">
                                <Text textAlign="center">{convertTemp(this.state.max_temp)}</Text>
                                {/* <br></br> */}
                                <Text textAlign="center" size="small" color="#e74960">Max</Text>
                            </Box>
                        </Box>
                    </Box>
                </Grommet>
            </div>
        );
    }
}

export default City;

