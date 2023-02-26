//Today Card
let today = document.getElementById('today'),
    todayDate = document.getElementById('today-date'),
    locationCity = document.getElementById('location'),
    todayDegree = document.getElementById('today-degree'),
    todayIcon = document.getElementById('today-icon'),
    tadayDescription = document.getElementById('taday-description'),
    humidty = document.getElementById('humidty'),
    wind = document.getElementById('wind'),
    compass = document.getElementById('compass'),
    searchInput = document.getElementById('searchInput');



// //Next Day Card
let nextday = document.getElementsByClassName('nextday'),
    nextDayIcon = document.getElementsByClassName('next-day-icon'),
    maxDegree = document.getElementsByClassName('max-degree'),
    minDegree = document.getElementsByClassName('min-degree'),
    nextDayDescripton = document.getElementsByClassName('next-day-descripton'),
    monthName = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Des'],
    days = ["Sunday", "Monday", "TeuseDay", "Wednesday", "ThursDay", "Friday", "Saterday"],
    currentCity;
let apiResponse;
let ApiData;



async function getWeatherData(currentCity = 'cairo') {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=147beabdb34741f3ba7152747211309&q=${currentCity}&days=3`);
    ApiData = await apiResponse.json();
    console.log(ApiData);
    DisplayDate();
    DisplayNextDay();
}
getWeatherData('cairo');

function DisplayDate() {
    let date = new Date();
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${monthName[date.getMonth()]}`;
    locationCity.innerHTML = ApiData.location.name;
    todayDegree.innerHTML = ApiData.current.temp_c;
    todayIcon.setAttribute("src", `https:${ApiData.current.condition.icon}`);
    tadayDescription.innerHTML = ApiData.current.condition.text;
    humidty.innerHTML = ApiData.current.humidity;
    wind.innerHTML = ApiData.current.wind_kph;
    compass.innerHTML = ApiData.current.wind_dir;
}


function DisplayNextDay() {
    for (var i = 0; i < nextday.length; i++) {
        nextday[i].innerHTML = days[new Date(ApiData.forecast.forecastday[i + 1].date).getDay()];
        nextDayIcon[i].setAttribute("src", `https:${ApiData.forecast.forecastday[i + 1].day.condition.icon}`);
        maxDegree[i].innerHTML = ApiData.forecast.forecastday[i + 1].day.maxtemp_c;
        minDegree[i].innerHTML = ApiData.forecast.forecastday[i + 1].day.mintemp_c;
        nextDayDescripton[i].innerHTML = ApiData.forecast.forecastday[i + 1].day.condition.text;

    }
}



searchInput.addEventListener("keyup", function () {
    currentCity = searchInput.value;
    // console.log(currentCity);
    getWeatherData(currentCity);
})



