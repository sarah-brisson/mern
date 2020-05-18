const Router = require("express").Router;
const CityController = require('../controllers/cityController');
const AuthMiddleWare = require('../middlewares/auth');


const router = Router();

router.all("/cities/", AuthMiddleWare);

router
    .route("/cities/getCity")
    .post(CityController.getCity)

router
    .route("/cities/getCities")
    .post(CityController.getAllCities)

router
    .route("/cities/getCountries")
    .get(CityController.getAllCountries)

module.exports = router;