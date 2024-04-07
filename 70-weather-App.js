// Weather App.
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput"); 
const card = document.querySelector(".card");
const apiKey = "474b0be854045f52dd67af83f5ceedac";

weatherForm.addEventListener("submit",async (event) => {
  event.preventDefault();
  const city = cityInput.value;

  if (city) {
    try{

        const weatherData= await getweatherData(city);
        displayweatherInfo(weatherData);

    } catch(error){
console.error(error);
displayError(error);

    }
    


    
  } else {
    displayError("Please enter a city!"); // Display error message
  }
});

async function getweatherData(city) {
  // Implementing weather data retrieval logic

const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}
`;

const response=await fetch(apiURL);

// console.log(response);
if(!response.ok){
    throw new Error("Oops! Unable to fetch weather data! Enter the correct place name & Try again!");
}

return await response.json();
}

function displayweatherInfo(data) {
  // Implementing weather data display logic

  console.log(data);
//Here concept of object destructuring is used.

const {name:city,
    main:{temp,humidity},
    weather:[{description,id}]}=data;

    card.textContent=" ";
    card.style.display="flex";

    const cityDisplay=document.createElement("h1");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const weatherEmojiDisplay=document.createElement("p");

cityDisplay.textContent=city;
tempDisplay.textContent=`${(temp-273.15).toFixed(2)}˚C`;
humidityDisplay.textContent=`Humidity:${humidity}%`;
descDisplay.textContent=description;
weatherEmojiDisplay.textContent=getweatherEmoji(id);


cityDisplay.classList.add("cityDisplay");
tempDisplay.classList.add("tempDisplay");
humidityDisplay.classList.add("humidityDisplay");
descDisplay.classList.add("descDisplay");
weatherEmojiDisplay.classList.add("weatherEmoji");

card.appendChild(cityDisplay);
card.appendChild(tempDisplay);
card.appendChild(humidityDisplay);
card.appendChild(descDisplay);
card.appendChild(weatherEmojiDisplay);

}


function getweatherEmoji(weatherId) {
  // Implementing weather emoji logic

  switch(true){
case (weatherId>=200 && weatherId<=300):
    return "⚡";
    case (weatherId>=300 && weatherId<400):
    return "🌧";
    case (weatherId>=500 && weatherId<600):
    return "⛈";
    case (weatherId>=600 && weatherId<700):
    return "❄";
    case (weatherId>=700 && weatherId<800):
    return "🌫";
    case (weatherId===800):
    return "☀";
    case (weatherId>=801 && weatherId<810):
    return "☁";
    default:
        return "❓";

  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");
  card.textContent = " ";
  card.style.display = "block";
  card.appendChild(errorDisplay);
}
