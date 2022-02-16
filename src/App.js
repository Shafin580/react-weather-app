import React, {useState} from "react";

const weatherAPI = {
  key: process.env.REACT_APP_OPEN_WEATHER_API_KEY, //openweather api key
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = ((event) => {
    event.key === "Enter" && fetch(`${weatherAPI.base}weather?q=${query}&units=metric&APPID=${weatherAPI.key}`)
    .then(res => res.json())
    .then(result =>{
      setWeather(result);
      setQuery('');
      //console.log(result);
    }).catch((error)=>{console.log(error)});
  })

  const dateBuilder = ((d) => {

    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  
    const month = monthNames[d.getMonth()];
    const date = d.getDate();
    const day = days[d.getDay()];
    const year = d.getFullYear();
  
    return `${day}, ${date}, ${month}, ${year}`;
  });



  return (
    <div className={typeof weather.main != "undefined" ? 
    ((weather.main.temp > 16) ? 'App warm' : 'App') : 'App'}>
      <main>
        <h1 className="title">Weather App</h1>
        <div className="search-box">
          <input
          type="text"
          className="search-bar"
          placeholder="Search City"
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search} />
        </div>
        {typeof weather.main !="undefined" && (
          <div>
            <div className="location-box">
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">{Math.round(weather.main.temp)}°C</div>
          <div className="weather">{weather.weather[0].main}</div>
        </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
