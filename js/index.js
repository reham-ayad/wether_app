const searchCityInput = document.getElementById('search');
let row = document.getElementById("row");
let alldata = [];

function setActive(event) {
  var links = document.querySelectorAll('.nav-link');
  links.forEach(function(link) {
      link.classList.remove('active');
  });

  event.target.classList.add('active');
  
}
async function getdata(cityName = "London") {
  try {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3d6483d99a23443c904140656241412&q=${cityName}&days=7`);
    let data = await response.json();
    alldata = data;

    displaydata();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displaydata() {
  let str = ``;

  for (let i = 0; i < 3; i++) {
    let day = alldata.forecast.forecastday[i];
    let cityName = alldata.location.name;
    let date = day.date;
    let nightTemp = day.day.mintemp_c;
    let dayTemp = day.day.maxtemp_c;
    let conditionText = day.day.condition.text;
    let iconUrl = "https:" + day.day.condition.icon;
    let dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'long' });

    if (i == 1) {
      str += `
      <div class="contant pt-1 pb-4 col-md-4 bg-bink text-center">
        <h6 class="text-center pt-3 pb-3 w-100">${dayName}</h6>
        <img src="${iconUrl}" alt="Weather Icon" class="pb-3">
        <h4 class="pb-3">${dayTemp}°C</h4>
        <h6 class="pb-3">${nightTemp}°</h6>
        <p class="ms-3 pb-3">${conditionText}</p>
      </div>
    `;
    } else if (i == 0) {
      str += `
      <div class="contant pt-1 pb-4 col-md-4 bg-blue text-start">
        <h6 class="text-center d-flex pt-3 pb-3 justify-content-between w-100"> <span>${dayName}</span> <span>${date}</span></h6>
        <h6 class="text-start pb-3 w-100">${cityName}</h6>
        <h1 class="fw-bolder fs-1 font w-100 pb-3 ms-3">${dayTemp}°C</h1>
        <img src="${iconUrl}" alt="Weather Icon" class="pb-3">
        <p class="ms-3 pb-3">${conditionText}</p>
      </div>
    `;
      
    } else if (i == 2) {
      str += `
      <div class="contant pt-1 pb-4 col-md-4 bg-blue text-center">
        <h6 class="text-center pt-3 pb-3 w-100">${dayName}</h6>
        <img src="${iconUrl}" alt="Weather Icon" class="pb-3">
        <h4 class="pb-3">${dayTemp}°C</h4>
        <h6 class="pb-3">${nightTemp}°</h6>
        <p class="ms-3 pb-3">${conditionText}</p>
      </div>
    `;
    }
  }

  row.innerHTML = str;
}

function searchCity() {
  let cityName = searchCityInput.value.trim();
  getdata(cityName || "London"); 
}

getdata();
