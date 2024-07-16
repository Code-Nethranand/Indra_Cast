const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

// console.log(elCloneInfoHumidity)

const fetchData =async()=>{
    const APIKey ='05f73b7b5b8440f0f61fec0f584d0cd9';
    const city = document.querySelector('.search-box input').value;
    const res =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    const json =await res.json()

    if (city == '')
        return;
 
   
    console.log(json);
        if(json.cod == '404'){
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        
        container.style.height = '555px';
        weatherBox.classList.remove('active');
        weatherDetails.classList.remove('active');
        error404.classList.add('active');


        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.humidity-text');
        const wind = document.querySelector('.wind-text');

        if (cityHide.textContent === city) {
            return;
        }
        else {
            cityHide.textContent = city;
            container.style.height = '555px';
            container.classList.add =('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            error404.classList.remove('active');

            setTimeout(() => {
                container.classList.remove =('active');
            }, 2500);

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = './images/clear.png';
                    break;
    
                case 'Rain':
                    image.src = './images/rain.png';
                    break;
    
                case 'Snow':
                    image.src = './images/snow.png';
                    break;
    
                case 'Clouds':
                    image.src = './images/cloud.png';
                    break;
    
                case 'Mist':
                    image.src = './images/mist.png';
                    break;
    
                case 'Haze':
                    image.src = './images/mist.png';
                    break;
            
                default:
                    image.src = 'images/cloud.png';
            }
            
            temperature.innerHTML = `${parseInt(json?.main?.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            // console.log(json?.main?.humidity)
            if(json?.main?.humidity) humidity.innerHTML = `${json?.main?.humidity}%`;
            // console.log(json?.wind?.speed)
            wind.innerHTML = `${json?.wind?.speed}Km/h`;

            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            // console.log(elCloneInfoHumidity)

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


            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length; 
            const cloneInfoWeatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];

            if (totalCloneInfoWeather > 0) {
                cloneInfoWeatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');

                setTimeout(() => {
                    cloneInfoWeatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2200);
            }

        }
    
    }


    //Map integration
    
    const initMap =async()=>{
        const APIKey ='05f73b7b5b8440f0f61fec0f584d0cd9';
        const city = document.querySelector('.search-box input').value;
        const res =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        const json =await res.json()
        const { Map } = await google.maps.importLibrary("maps");
    
        map = new Map(document.getElementById("map"), {
        center: { lat: json.coord.lat, lng: json.coord.lon },
        zoom: 8,
        labels:true
        });
    
        new google.maps.Marker({
        position: { lat: json.coord.lat, lng: json.coord.lon },
        map: map,
        animation: google.maps.Animation.DROP
        })
    }

    const submit = document.querySelector(".hello")
    // console.log(submit)
    submit.addEventListener("submit",(e)=>{
        e.preventDefault();
        // console.log(e)
        fetchData();
        initMap();
    })



search.addEventListener('click',() => {
    fetchData();
    initMap();

});