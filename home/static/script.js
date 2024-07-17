const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

const fetchData = async () => {
    const APIKey = '05f73b7b5b8440f0f61fec0f584d0cd9';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`);
    const json = await res.json();

    if (json.cod == '404') {
        container.style.height = '400px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');
        return json;  // Return json to use in initMap function
    }

    console.log(json);

    const image = document.querySelector('.weather-box img');
    const temperature = document.querySelector('.weather-box .temperature');
    const description = document.querySelector('.weather-box .description');
    const humidity = document.querySelector('.humidity-text');
    const wind = document.querySelector('.wind-text');

    if (cityHide.textContent === city) {
        return;
    } else {
        cityHide.textContent = city;
        container.style.height = '500px';
        container.classList.add('active');
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        setTimeout(() => {
            container.classList.remove('active');
        }, 2500);

        switch (json.weather[0].main) {
            case 'Clear':
                image.src = clear;
                break;
            case 'Rain':
                image.src = rain;
                break;
            case 'Snow':
                image.src = snow;
                break;
            case 'Clouds':
                image.src = cloud;
                break;
            case 'Mist':
            case 'Haze':
                image.src = mist;
                break;
            default:
                image.src = cloud;
        }

        temperature.innerHTML = `${parseInt(json?.main?.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        if (json?.main?.humidity) humidity.innerHTML = `${json?.main?.humidity}%`;
        wind.innerHTML = `${json?.wind?.speed}Km/h`;

        const infoWeather = document.querySelector('.info-weather');
        const infoHumidity = document.querySelector('.info-humidity');
        const infoWind = document.querySelector('.info-wind');

        // Remove existing cloned elements
        document.querySelectorAll('.active-clone').forEach(el => el.remove());

        const elCloneInfoWeather = infoWeather.cloneNode(true);
        const elCloneInfoHumidity = infoHumidity.cloneNode(true);
        const elCloneInfoWind = infoWind.cloneNode(true);

        elCloneInfoWeather.id = 'clone-info-weather';
        elCloneInfoWeather.classList.add('active-clone');

        elCloneInfoHumidity.id = 'clone-info-humidity';
        elCloneInfoHumidity.classList.add('active-clone');

        elCloneInfoWind.id = 'clone-info-wind';
        elCloneInfoWind.classList.add('active-clone');

        setTimeout(() => {
            infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
            infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
            infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
        }, 2200);
    }

    return json;  // Return json to use in initMap function
}

// Map integration
const initMap = async (json) => {
    const mapContainer = document.getElementById("map");

    if (json.cod == '404') {
        if (mapContainer.firstChild) {
            mapContainer.removeChild(mapContainer.firstChild); // Remove existing map data
        }
        return;
    }

    const { Map } = await google.maps.importLibrary("maps");

    const map = new Map(mapContainer, {
        center: { lat: json.coord.lat, lng: json.coord.lon },
        zoom: 8,
        labels: true
    });

    new google.maps.Marker({
        position: { lat: json.coord.lat, lng: json.coord.lon },
        map: map,
        animation: google.maps.Animation.DROP
    });
}

const submit = document.querySelector(".hello");
submit.addEventListener("submit", async (e) => {
    e.preventDefault();
    const json = await fetchData();
    initMap(json);
});

search.addEventListener('click', async () => {
    const json = await fetchData();
    initMap(json);
});
