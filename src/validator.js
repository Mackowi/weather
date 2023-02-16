import { getLocation, getWeather } from "./main";
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
            console.log(searchField.value);
            let cityName = searchField.value;
            let location = await getLocation(cityName);
            let weatherData = await getWeather(location);
            let weather = {
                temp: parseInt(weatherData.main.temp),
                description: weatherData.weather[0].main,
                pressure: weatherData.main.pressure,
                humidity: weatherData.main.humidity,
                wind: parseInt(weatherData.wind.speed),
            };
            console.log(weather);
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
    
    const showError = () => {
        if (searchField.validity.valueMissing) {
            searchFieldError.textContent = '';
          }
        if (searchField.validity.patternMismatch) {
            searchFieldError.textContent = `City name shouldn't consist any numbers or symbols.`;
        }
         else if (searchField.validity.tooShort) {
            searchFieldError.textContent = 'City name should be at least 3 characters long.';
        } 
    }

    return {
        init: initValidator
    };
})()


