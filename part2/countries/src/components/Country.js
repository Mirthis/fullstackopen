import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ capital, weather }) => {
  const iconsUrl = `http://openweathermap.org/img/wn/`;
  if (!weather) return null;
  return (
    <div>
      <h2>Weather in {capital}</h2>
      <div>Temperature {weather.main.temp} Celsus</div>
      <img
        src={`${iconsUrl}${weather.weather[0].icon}@2x.png`}
        alt={weather.weather[0].description}
      />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  );
};

const Languages = ({ languages }) => {
  return (
    <div>
      <h2>languages</h2>
      <ul>
        {Object.values(languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </div>
  );
};

const Country = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY;

  const [weather, setWeather] = useState();
  const hook = () => {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${api_key}&units=metric`
      )
      .then((response) => {
        setWeather(response.data);
      });
  };

  useEffect(hook, [country.capital, api_key]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <Languages languages={country.languages} />
      <img src={country.flags.png} alt={`${country.name.common} flag`} />
      <Weather capital={country.capital} weather={weather} />
    </div>
  );
};

export default Country;
