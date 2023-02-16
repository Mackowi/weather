const d = document;
let displayedUnit = 'C'

const weatherSection = document.querySelector('.weather');
const weatherDisplay = document.querySelector('#weather-display');
const toggle = document.querySelector('#toggle');
const toggleIcon = document.querySelector('#toggle-icon')
const toggleUnit = document.querySelector('#toggle-unit')

toggle.addEventListener('click', (e) => {
    if (toggleIcon.classList.contains('fa-toggle-on')) {
        toggleIcon.classList.remove('fa-toggle-on');
        toggleIcon.classList.add('fa-toggle-off');
        toggleUnit.innerText = ' F';
        displayedUnit = 'F';
    } else {
        toggleIcon.classList.add('fa-toggle-on');
        toggleIcon.classList.remove('fa-toggle-off');
        toggleUnit.innerText = '°C';
        displayedUnit = 'C';
    }
})

export default class DomHandler {

    static clearScreen() {
        weatherDisplay.classList.add('fadeOut')
        weatherDisplay.addEventListener('animationend', (event) => {
            weatherDisplay.remove();
        });
    }

    static populateScreen() {
        // this allows for smooth animation when new city is about to be present
        weatherDisplay.classList.remove('fadeOut')
    }

    static createWeatherDisplay(data) {
        let weatherDisplay = d.createElement('div');
        weatherDisplay.classList = 'weather-display';
        weatherDisplay.setAttribute('id', 'weather-display')
        weatherDisplay.innerHTML = `
        <div class="weather-city-name">
            Amsterdam
        </div>
        <div class="weather-date">
            Today 29.23.2023
        </div>
        <div class="weather-temp">
            14°C
        </div>
        <div class="weather-description">
            Clouds
            <i class="fa-sharp fa-solid fa-cloud"></i>
        </div>
        <div class="weather-display-wrapper">
            <div class="weather-pressure">
                1998hpa
            </div>
            <div class="weather-humidity">
                32%
            </div>
            <div class="weather-wind-spead">
                69km/h
            </div>
        </div>
        `
        weatherSection.appendChild(weatherDisplay);
    }
    
}
