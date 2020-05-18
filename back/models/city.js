const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
    id: {type : Number, required: true, unique: true, index: true},
    city_name:{ type: String },
    elevation:{ type: String },
    state_code:{ type: String },
    state_name:{ type: String },
    country_code:{ type: String },
    country_name:{ type: String }
});

module.exports = mongoose.model("City", CitySchema)