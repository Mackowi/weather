import { getLocation, getWeather } from "./main.js";
import DomHandler from './domHandler.js';
import { displayedUnit } from './domHandler.js';


export const Validator = (() => {

    const searchForm = document.querySelector('#search-form');
    const searchField = document.querySelector('#search');
    const searchFieldError = document.querySelector('.error') 
    
    const initValidator = () => {
        searchForm.addEventListener('submit', handleSubmit);
        searchField.addEventListener('input', handleInput);
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchField.validity.valid) {
            showError();
        } else {
            //send to api
            let cityName = searchField.value;
            let location = await getLocation(cityName);
            if (!location) {
                console.log('show error')
                showError(true)
                return;
            }
            let weatherData = await getWeather(location);
            let temp = null;
            if (displayedUnit == 'F') {
                temp = kelToFahr(weatherData.main.temp)
            } else {
                temp = kelToCel((weatherData.main.temp))
            }
            let weather = {
                cityName: cityName,
                temp: temp,
                description: weatherData.weather[0].main,
                pressure: weatherData.main.pressure,
                humidity: weatherData.main.humidity,
                wind: parseInt(weatherData.wind.speed),
            };
            await DomHandler.clearScreen();
            DomHandler.createWeatherDisplay(weather);
            searchForm.reset();
        }
    }
    
    const handleInput = (e) => {
        if (searchField.validity.valid) {
            searchFieldError.textContent = '';
        } else {
            showError();
        }
    }
    
    const showError = (notFound = false) => {
        if (searchField.validity.valueMissing) {
            searchFieldError.textContent = '';
        } else if (searchField.validity.patternMismatch) {
            searchFieldError.textContent = `City name shouldn't consist any numbers or symbols.`;
        }
        else if (searchField.validity.tooShort) {
            searchFieldError.textContent = 'City name should be at least 3 characters long.';
        } else if (notFound) {
            searchFieldError.textContent = 'City not founded.';
        }
    }

    const kelToCel = (value) => {
        return parseFloat(value - 273.15).toFixed(0);
    }

    const kelToFahr = (value) => {
        return parseFloat(1.8 * (value - 273.15) + 32).toFixed(0);
    }

    return {
        init: initValidator
    };
})()


