const apiKey = '7b667e8ac19abd6752180a176b6cb401';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Pell City,AL,US&units=imperial&appid=${apiKey}`
        );
        const data = await response.json();
        
        if (response.ok) {
            displayWeather(data);
        } else {
            alert('Weather data unavailable. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    }
}
function setBackgroundColor(temperature) {
    const body = document.body;
    
    if (temperature >= 95) {
        // Hot - Red/Orange gradient
        body.style.background = 'linear-gradient(135deg, #ff4e50, #f9d423)';
    } else if (temperature >= 85) {
        // Warm - Orange/Yellow gradient
        body.style.background = 'linear-gradient(135deg, #ff8c00, #ffd700)';
    } else if (temperature >= 70) {
        // Pleasant - Green/Blue gradient
        body.style.background = 'linear-gradient(135deg, #00feba, #5b548a)';
    } else if (temperature >= 50) {
        // Cool - Blue/Purple gradient
        body.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)';
    } else if (temperature >= 32) {
        // Cold - Light Blue/White gradient
        body.style.background = 'linear-gradient(135deg, #e0c3fc, #8ec5fc)';
    } else {
        // Freezing - Blue/White gradient
        body.style.background = 'linear-gradient(135deg, #7de2fc, #b9b6e5)';
    }
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `Last updated: ${formattedHours}:${formattedMinutes} ${ampm}`;
}

function displayWeather(data) {
    document.getElementById('city').textContent = `Weather in Pell City`;
    document.getElementById('country').textContent = 'US';
    document.getElementById('temp').textContent = `${Math.round(data.main.temp)}°F`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('wind').textContent = `${(data.wind.speed).toFixed(1)} MPH`;
    document.getElementById('weather-icon').src = 
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    
    // Add timestamp
    document.getElementById('timestamp').textContent = formatTimestamp(data.dt);
    
    setBackgroundColor(Math.round(data.main.temp));
}


searchButton.addEventListener('click', () => {
    const city = searchInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

searchInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const city = searchInput.value.trim();
        if (city) {
            getWeather(city);
        }
    }
});

// Load Pell City weather by default
getWeather('Pell City');

function disableSearchControls() {
    searchInput.disabled = true;
    searchButton.disabled = true;
}

function enableSearchControls() {
    searchInput.disabled = false;
    searchButton.disabled = false;
}

async function getWeather(city) {
    disableSearchControls();
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Pell City,AL,US&units=imperial&appid=${apiKey}`
        );
        const data = await response.json();
        
        if (response.ok) {
            displayWeather(data);
        } else {
            alert('Weather data unavailable. Please try again.');
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    } finally {
        disableSearchControls();
    }
}