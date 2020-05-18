import React from 'react';
import '../../styles/city.css';
import '../../styles/global.css'
import { Grommet, Text, Box } from 'grommet';
import convertTemp from '../../utils/generalService';

class DayWeather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLight: window.localStorage.getItem("isLight"),
        }
    }

    // Return the name of the weekday
    getTheDay() {
        const d = new Date(this.props.date[0]);
        let weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";

        return weekday[d.getDay()];
    }

    render() {
        return (
            <div className={this.state.isLight === "true" ? "card-light" : "card-dark"} id="day-weather">
                <Grommet>
                    <Box>
                        <Text alignSelf="center">{this.getTheDay()}</Text>
                        <Box direction="row">
                            <Box id="temp-day-min">
                                <Text textAlign="center" >{convertTemp(this.props.date[1])}</Text>
                                {/* <br></br> */}
                                <Text textAlign="center" size="small" color="#00ff9f">Min</Text>
                            </Box>
                            <Box id="temp-day-max">
                                <Text textAlign="center">{convertTemp(this.props.date[2])}</Text>
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

export default DayWeather;

