const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    cities: [String]
});

// verify the correspondance of a password
UserSchema.methods.isValidPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

UserSchema
    .pre('save', function (next) {
        mongoose
            .model('User', UserSchema)
            .findOne({ username: this.username }) // checks if this username already exists
            .exec((err, user) => {
                if (err) next(err);
                else if (user) next(new Error("This username already exists"));
                // if username is unique, hash the password, and save it
                else {
                    bcrypt
                        .hash(this.password, 10)
                        .then(hashedPassword => {
                            this.password = hashedPassword;
                            next();
                        })
                        .catch(err => next(err))
                }
            })
    });

module.exports = mongoose.model("User", UserSchema)