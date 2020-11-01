function loaddata() {
    const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
    const API_KEY = "c4a160adf3af55f98898ed8d294d41d0";
    const LOCATION_CODE = document.querySelector(".searchbox-input").value;
    const FULL_API_URL = `${API_URL}?q=${LOCATION_CODE}&appid=${API_KEY}`;

    axios
        .get(FULL_API_URL)
        .then(response => {
            // Assign vars to response data
            const temperatureK = response.data.main.temp;
            const weatherState = response.data.weather[0].main;
            const humidity = response.data.main.humidity;
            const windSpeedK = response.data.wind.speed;
            const windDeg = response.data.wind.deg;
            const cityName = response.data.name;
            const countryName = response.data.sys.country;
            const cityTimezone = response.data.timezone;
            const temperatureMin = response.data.main.temp_min - 273.15;
            const temperatureMax = response.data.main.temp_max - 273.15;
            const temperatureFeels = response.data.main.feels_like - 273.15;
            const temperatureC = temperatureK - 273.15;

            let output = document.createElement('div');

            d = new Date()
            localTime = d.getTime()
            localOffset = d.getTimezoneOffset() * 60000;
            utc = localTime + localOffset
            var a = utc + (1000 * cityTimezone)
            nd = new Date(a)

            output.classList = "card";

            if (temperatureC > 20) { output.className += " redbg" };
            if (temperatureC < 13) { output.className += " bluebg" };
            if (temperatureC < 20 && temperatureC > 13) { output.className += " greenbg" };

            output.innerHTML =
                "<i class='fas fa-times' onclick='this.parentElement.remove();'></i>" +
                "<h1 id='temperature'>" + temperatureC.toFixed(1) + "°C</h1>" +
                "<span id='state'>" + weatherState + "</span>" +

                "<hr>" +

                "<span id='location'>" + cityName + ", " + countryName + "</span>" +
                "<h1 id='#time'>" + nd.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' }) + "</h1>" +

                "<hr>" +

                "<span id='humidity'>Humidity: " + humidity + "%</span>" +
                "<span id='windspeed'>Windspeed: " + windSpeedK + "km/h</span>" +
                "<span id='winddirection'>Wind direction: " + windDeg + "°</span>" +

                "<hr>" +
                "<span id='winddirection'>Min temperature: " + temperatureMin.toFixed(1) + "°</span>" +
                "<span id='winddirection'>Max temperature: " + temperatureMax.toFixed(1) + "°</span>" +
                "<span id='winddirection'>Feels like: " + temperatureFeels.toFixed(1) + "°</span>";

            document.querySelector(".cards").appendChild(output);

            document.querySelector(".searchbox-input").value = '';
            document.getElementById("error").style.display = "none";
        })
        .catch(err => {
            if (err.response) {
                document.getElementById("error").style.display = "flex";
            }
        });
}