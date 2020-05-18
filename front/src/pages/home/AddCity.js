import React from 'react';
import '../../styles/city.css';
import '../../styles/global.css'
import { Grommet, Text, Box, Image, Button, Select } from 'grommet';

const imgDark = require('../../images/addImg.PNG')
const imgLight = require('../../images/addImgLight.PNG')
const axios = require('axios')
const back = require('../../utils/back-api')

class AddCity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLight: window.localStorage.getItem("isLight"),
            isImg: true,
            countries: '',
            cities: [],
            ids: [],
            chosenCountry: '',
            chosenCity: '',
            options: ''
        }

        this.addCity = this.addCity.bind(this);
        this.getAllCities = this.getAllCities.bind(this);
    }

    componentDidMount() {
        this.getAllCountries();
    }

    //get the appropriate image
    getImg() {
        if (window.localStorage.getItem("isLight") === "false") {
            return imgDark
        } else {
            return imgLight
        }
    }

    //get all the countries
    getAllCountries() {
        const url = back.URL.base_URL + back.URL.cities + back.URL.getCountries;
        axios.get(url)
            .catch((err) => {
                console.log("error", err);
            })
            .then((res) => {
                this.setState({ countries: res.data.country, options: res.data.country })
            })
    }

    //get all the cities with the country name
    getAllCities() {
        const url = back.URL.base_URL + back.URL.cities + back.URL.getCities;
        const id = [];
        const city = [];
        axios
            .post(url, { country: this.state.chosenCountry })
            .catch((err) => {
                console.log("error", err);
            })
            .then((res) => {
                res.data.cities.forEach(element => {
                    id.push(element.id);
                    city.push(element.city_name);
                });
                this.setState({ cities: city, ids : id })
            })
    }

    onClick() {
        this.setState({ isImg: false })
    }

    addCity() {
        this.setState({ isImg: true });
        const url = back.URL.base_URL + back.URL.users + back.URL.addCity;
        axios.post(url, { city: this.state.ids[this.state.cities.indexOf(this.state.chosenCity)], username: window.sessionStorage.getItem("username") })
            .catch((err) => {
                console.log("error", err);
            })
            .then((res) => {
                window.location.reload(false);
            })
    }



    render() {
        return (
            <div className={this.state.isLight === "true" ? "card-light" : "card-dark"} id="city-card">
                <Grommet>
                    <Box width="Large">
                        <Text alignSelf="center" size="large">ADD CITY</Text>
                        <Button onClick={() => { this.onClick() }} active={this.state.isImg} alignSelf="center">
                            {this.state.isImg ? <Image src={this.getImg()} fit="cover" alt="Click to add a city"></Image> : ''}
                        </Button>
                        {this.state.isImg ? null :
                            <Box active={!this.state.isImg} id="question">
                                <Text>Choose a country :</Text>
                                <Select
                                    value={this.state.chosenCountry}
                                    options={this.state.countries}
                                    onChange={event =>
                                        this.setState({ chosenCountry: event.value }, () => {
                                            this.getAllCities();
                                        })
                                    }
                                // onSearch={(searchText) => {
                                //     const regexp = new RegExp(searchText, 'i');
                                //     this.setState({ options: this.state.countries.filter(o => o.match(regexp)) });
                                // }}
                                />
                                {this.state.chosenCountry ?
                                    <Box active={!!this.state.chosenCountry} id="question">
                                        <Text>Choose a city :</Text>
                                        <Select
                                            color={this.state.isLight === "true" ? "" : "white"}
                                            value={this.state.chosenCity}
                                            options={this.state.cities}
                                            onChange={event =>
                                                this.setState({ chosenCity: event.value })
                                            } />
                                    </Box>
                                    : ''}
                                {this.state.chosenCity ?
                                    <Button onClick={() => { this.addCity() }} label="Add this city" active={!!this.state.chosenCity} id="question" color={this.state.isLight === "true" ? "" : "white"}/>
                                    : null}
                            </Box>
                        }
                    </Box>
                </Grommet>
            </div>
        );
    }
}

export default AddCity;

