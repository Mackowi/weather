const d = document;
let displayedUnit = '°C';
let currentDate = new Date().toLocaleDateString();

const weatherSection = document.querySelector('.weather');
const toggle = document.querySelector('#toggle');
const toggleIcon = document.querySelector('#toggle-icon')
const toggleUnit = document.querySelector('#toggle-unit')

let weatherDisplay = document.querySelector('#weather-display');


toggle.addEventListener('click', (e) => {
    if (toggleIcon.classList.contains('fa-toggle-on')) {
        toggleIcon.classList.remove('fa-toggle-on');
        toggleIcon.classList.add('fa-toggle-off');
        toggleUnit.innerText = ' F';
        DomHandler.swapTempUnit();
        displayedUnit = 'F';
        console.log('displayedUnit')
        console.log(displayedUnit)
    } else {
        toggleIcon.classList.add('fa-toggle-on');
        toggleIcon.classList.remove('fa-toggle-off');
        toggleUnit.innerText = '°C';
        DomHandler.swapTempUnit();
        displayedUnit = '°C';
        console.log('displayedUnit')
        console.log(displayedUnit)
    }
})

export default class DomHandler {

    static async clearScreen() {
        return new Promise(resolve => {
            let weatherDisplay = document.querySelector('#weather-display');
            if (weatherDisplay) {
                weatherDisplay.classList.add('fadeOut');
                weatherDisplay.addEventListener('animationend', () => {
                    weatherDisplay.remove();
                    resolve();
                });
            } else {
                resolve();
            } 
        });
    }

    static populateScreen() {
        // this allows for smooth animation when new city is about to be present
        if (weatherDisplay) {
            weatherDisplay.classList.remove('fadeOut')
            weatherDisplay.addEventListener('animationend', (event) => {
                console.log('animation population ended')
                return
            });
        } 
    }

    static async createWeatherDisplay(data) {
        weatherDisplay = d.createElement('div');
        weatherDisplay.classList = 'weather-display';
        weatherDisplay.setAttribute('id', 'weather-display')
        weatherDisplay.innerHTML = `
        <div class="weather-city-name">
            ${data.cityName}
        </div>
        <div class="weather-date">
            ${currentDate}
        </div>
        <div class="weather-temp">
            ${data.temp + displayedUnit}
        </div>
        <div class="weather-description">
            ${data.description}
        </div>
        <div class="weather-display-wrapper">
            <div class="weather-pressure">
                ${data.pressure + 'hpa'}
            </div>
            <div class="weather-humidity">
                ${data.humidity + '%'}
            </div>
            <div class="weather-wind-spead">
                ${data.wind + 'km/h'}
            </div>
        </div>
        `
        weatherSection.appendChild(weatherDisplay);
    }
    
    static swapTempUnit() {
        let temp = weatherSection.querySelector('.weather-temp');
        if (!temp) {
            return
        }
        let tempValue = temp.innerText.match(/\d+(\.\d+)?/);
        tempValue = tempValue[0];
        if (displayedUnit == '°C') {
            tempValue = (tempValue * 1.8) + 32;
            temp.innerText = parseFloat(tempValue).toFixed(0) + 'F';
        } else {
            tempValue = (tempValue - 32) / 1.8;
            temp.innerText = parseFloat(tempValue).toFixed(0) + '°C';
        }
    }
}

export { displayedUnit }
