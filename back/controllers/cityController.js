const City = require("../models/city.js")

const axios = require("axios")

class CityController {

    // get a country's cities with the country name
    static getAllCities(req, res) {
        City.find({ country_name: req.body.country }).exec((err, cities) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ cities: cities });
            }
        })
    }

    //get all the countries
    static getAllCountries(req, res) {
        City.find().distinct('country_name').exec((err, country) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ country: country });
            }
        })
    }

    // get a city by id
    static getCity(req, res) {
        City.findOne({ id: req.body.id })
            .exec((err, city) => {
                if (err) {
                    res.status(500).json({ error: err.message });
                    res.status(200).json({ city: city });
                }
            })
    }

}



module.exports = CityController;