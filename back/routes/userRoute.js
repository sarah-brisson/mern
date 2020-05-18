const Router = require("express").Router;
const UserController = require('../controllers/userController')
const AuthMiddleWare = require('../middlewares/auth');
const router = Router();


router.post("/users/register", UserController.register)
router.post("/users/login", UserController.login);
router.post("/users/addCity", UserController.addCity, AuthMiddleWare);
router.post("/users/getCities", UserController.getCities, AuthMiddleWare);
router.post("/users/removeCity", UserController.removeCity, AuthMiddleWare)

module.exports = router;