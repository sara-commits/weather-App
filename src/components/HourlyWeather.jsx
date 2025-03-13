import React from 'react'
import { assets } from '../assets/assets'
import { weatherIcons } from '../constants'

const HourlyWeather = ({hourlyWeather}) => {
  const temprature = Math.floor(hourlyWeather.temp_c);
  const time = hourlyWeather.time.split(" ")[1];;
    const weatherIcon = Object.keys(weatherIcons).find(key => 
          weatherIcons[key].includes(hourlyWeather.condition.code)
        );
  return (
    
                 <li className="weather-item">
                  <p className="time">{time}</p>
                   <img src={assets[weatherIcon]} className="weather-icon" />
                  <p className="temperature">{temprature} <span>&deg;</span></p>
                  </li>
    
  )
}

export default HourlyWeather
