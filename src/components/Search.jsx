import React from 'react'
import { assets } from '../assets/assets'

const Search = ({getWeatherDetails, searchInputRef}) => {

    const API_KEY= import.meta.env.VITE_API_KEY;


    const handleSubmitSearch = (e) => {
        e.preventDefault();
        const searchInput = e.target.querySelector('.search-input'); 
        const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchInput.value}&days=2`;
        getWeatherDetails(API_URL);
    }

    const handleLocationSearch = () => {
       navigator.geolocation.getCurrentPosition( 
        (position) => {
          const {latitude, longitude} = position.coords;
          const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
          getWeatherDetails(API_URL);
          
       },
       () => {
        alert('Please enable location services to use this feature');
       }
      )};
   

  return (

      <div className='search-section'>
              <form action="#" className='search-form' onSubmit={handleSubmitSearch}>
                <img className='search-icon' src={assets.search} alt="" />
                <input type="search" placeholder='Enter a city' ref={searchInputRef} className='search-input' required />
              </form>
                <button className='location-button' onClick={handleLocationSearch}>
                <img className='location-icon' src={assets.location} alt="" />
                </button>
            </div>
    
  )
}

export default Search
