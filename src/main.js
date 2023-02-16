import './styles.css';
import DomHandler from './domHandler';
import { Validator } from './validator';

const apiKey = '9bc645f876eb2f0d2cc1eaaca24d7612';
const limit = 5;
const time = 'current';

DomHandler.createWeatherDisplay();
Validator.init();

export async function getLocation(city) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`, {mode: 'cors'});
    const cityData = await response.json();
    if (!cityData) {
        throw Error('Missing city data');
    }
    const location = {
        lon: cityData[0].lon,
        lat: cityData[0].lat
    }

    // console.log(cityData[0])
    // console.log(location)

    return location
}

export async function getWeather(location) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${apiKey}`, {mode: 'cors'});
    const weatherData = await response.json();
    if (!weatherData) {
        throw Error('Missing weather data');
    }

    // console.log(weatherData)

    return weatherData
}


