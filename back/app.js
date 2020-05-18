const express = require("express");
const mongoose = require("mongoose");
const cityRoute = require('./routes/cityRoute');
const userRoute = require('./routes/userRoute');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require('cors')

// config
const PORT = process.env.PORT;

// init express
const app = express();

app.use(cors({origin: true, credentials: 'same-origin'}));
// for debug
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// for security
app.use(helmet());
app.use(
    rateLimit({
        windowMs: 1000 * 60 * 15, // 15 minutes
        max: 100 // 100 requests per 15 minutes
    })
)

mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    },
    err => {
        if (!err) {
            console.log("MongoDB Connection Succeeded.");
        } else {
            console.log("Error in DB connection:" + err);
        }
    });

// add routes
app.use(cityRoute);
app.use(userRoute);

// start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

