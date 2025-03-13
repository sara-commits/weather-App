import React, { useRef } from "react";
import { assets } from "./assets/assets";
import Search from "./components/Search";
import CurrentWeather from "./components/CurrentWeather";
import HourlyWeather from "./components/HourlyWeather";
import { useState, useEffect } from "react";
import { weatherIcons } from "./constants";
import NoResultsDiv from "./components/NoResultsDiv";

const App = () => {

  const API_KEY= import.meta.env.VITE_API_KEY;


  const [currentWeather, setCurrentWeather] = useState({});
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const searchInputRef = useRef(null);
  const [noResults, setNoResults] = useState(false)

  const filterHourlyForecast = (hourlyData) => {
    const currentHour = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentHour + 24 * 60 * 60 * 1000;

     const next24HoursData = hourlyData.filter(({time}) => {
      const forecastTime = new Date(time).getTime();
      return forecastTime >= currentHour && forecastTime <= next24Hours;
     });

     setHourlyForecast(next24HoursData);
  }

  const getWeatherDetails= async (API_URL) => {
    setNoResults(false);
     try {
       const response = await fetch(API_URL);
        if(!response.ok) throw new Error();

       const data = await response.json();
       const temperature = Math.floor(data.current.temp_c);
       const description = data.current.condition.text;
       const weatherIcon = Object.keys(weatherIcons).find(key => 
        weatherIcons[key].includes(data.current.condition.code)
      );
       setCurrentWeather({temperature, description, weatherIcon});
       const combinedHourlyData = [...data.forecast.forecastday[0].hour, ...data.forecast.forecastday[1].hour];
       searchInputRef.current.value = data.location.name;
       filterHourlyForecast(combinedHourlyData);
     } catch {
       setNoResults(true);
     }
  }

  useEffect(() => 
    {
      const defaultCity = 'London';
      const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${defaultCity}&days=2`;
      getWeatherDetails(API_URL);
      
    },[]);

  return (
    <div className="container">
      <Search getWeatherDetails={getWeatherDetails} searchInputRef={searchInputRef} />

      {noResults ? (
        <NoResultsDiv/>
      ) : (
        <div className="weather-section">
        <CurrentWeather currentWeather={currentWeather} />

        <div className="hourly-forecast">
          <ul className="weather-list">
            {hourlyForecast.map((hourlyWeather) => (
            <HourlyWeather key={hourlyWeather.time_epoch} hourlyWeather={hourlyWeather} />
            ))}
          </ul>
        </div>
      </div>
      )
    }

     
    </div>
  );
};

export default App;
