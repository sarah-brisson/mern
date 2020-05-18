const User = require("../models/users");
const jwt = require("jsonwebtoken");

class UserController {
    // register a new user
    static register(req, res) {
        const newUser = new User(req.body);
        newUser.save((err, user) => {
            if (err) {
                res.status(401).json({ error: err.message })
            } else {
                newUser.password = undefined;
                res.status(201).json(newUser);
            }
        });
        return newUser._id;
    }

    // login
    static login(req, res) {
        User.findOne({ username: req.body.username })
            .exec((err, user) => {
                if (!user) res.status(401).json({ error: "User does not exist." })
                else if (err) res.status(401).json({ error: err.message }) 
                else {
                    user.isValidPassword(req.body.password).then(isValid => {
                        if (!isValid) res.status(401).json({ error: "Invalid Password" })
                        else {
                            const token = jwt.sign(
                                { username: user.name },
                                process.env.JWT_SECRET
                            );
                            res.status(200).json({ token: token });
                            return user._id;
                        }
                    })
                        .catch(err => res.status(401).json({ error: err.message }));
                }
            });
    }

    //add a city to a user
    static addCity(req, res) {
        User.findOneAndUpdate({ username: req.body.username }, { "$addToSet": { cities: req.body.city }}, {new: true})
            .exec((err, user) => {
                if (err) res.status(401).json({ error: err.message })
                else if (!user) res.status(401).json({ error: "User does not exist." })
                else {
                    res.status(200).json({ msg: "City added", user: user });
                }
            })
    }

    // get the cities of a user with username
    static getCities(req, res) {
        User.findOne({ username: req.body.username })
            .exec((err, city) => {
                if (err) res.status(401).json({ error: err.message })
                else if (city === null) res.status(200).json({ cities: [] });
                else res.status(200).json({ cities: city.cities });
            })
    }

    // remove a city for a user
    static removeCity(req, res) {
        User.findOneAndUpdate({ username: req.body.username }, { "$pullAll": { cities: [req.body.city] }}, {new: true})
            .exec((err, user) => {
                if (err) res.status(401).json({ error: err.message })
                else {
                    res.status(200).json({ msg: "City removed", user: user });
                }
            })
    }
}

module.exports = UserController;