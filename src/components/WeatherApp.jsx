import React, { useState } from 'react';
import axios from 'axios';
import '../styles/WeatherApp.css'
import Cards from '../components/Cards';

import icon01d from '../animated/01d.svg';
import icon01n from '../animated/01n.svg';
import icon02d from '../animated/02d.svg';
import icon02n from '../animated/02n.svg';
import icon03d from '../animated/03d.svg';
import icon04d from '../animated/04d.svg';
import icon04n from '../animated/04n.svg';
import icon09d from '../animated/09d.svg';
import icon10d from '../animated/10d.svg';
import icon11d from '../animated/11d.svg';
import icon13d from '../animated/13d.svg';
import icon50d from '../animated/50d.svg';

import defaultIcon from '../animated/weather.svg';

const iconMap = {
  '01d': icon01d,
  '01n': icon01n,
  '02d': icon02d,
  '02n': icon02n,
  '03d': icon03d,
  '04d': icon04d,
  '04n': icon04n,
  '09d': icon09d,
  '10d': icon10d,
  '11d': icon11d,
  '13d': icon13d,
  '50d': icon50d,
};

function WeatherApp() {

    const [weatherData, setWeatherData] = useState({});
    const [isWeatherData, setIsWeatherData] = useState(false);
    const [country, setCountry] = useState('');
    const [error, setError] = useState('');
    const { main, name, sys, weather, wind, coord, timezone } = weatherData;

    const iconCode = weather && weather[0] && weather[0].icon;
    const weatherIcon = iconMap[iconCode] || defaultIcon;


    const fetchWeatherData = async () => {
        const apiKey = 'aa56feb06eed8a2a227df36ccf5b528e';
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey}`);
            setWeatherData(response.data);  
            setIsWeatherData(true);  
            console.log(response.data)     
            setError('');
        } catch (err) {
            setError('City not found!');
            setWeatherData({});
            setIsWeatherData(false);
        }       
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };


  return (
    <div className='container mt-5 mb-5 row p-0'>
        <div className="col-md-4 section1 p-4">
                <form className="search input-group" onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Enter city name" 
                        className="form-control border-end-0 border rounded-pill" 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <button type='submit' id="searchButton" className="rounded-pill border ms-3">Search</button>
                </form>
                <div>
                    <h4 className="text-center mt-5">Provide you a world wide weather forecast</h4>
                    <hr />
                    {isWeatherData && <div id="weather" className="weather">
                        <p>{error}</p>                      
                        <h4 className='text-capitalize'>{country}  {sys.country}</h4>
                        <img src={weatherIcon} alt="Weather Icon" />
                        <h4>{weatherData.weather[0].description}</h4>
                        <p>Temperature: {main.temp} °C</p>
                    </div> }
                </div>
        </div>
        <div className="col-md-8 section2 p-4">
            <h5 className="text-start ms-3">Check out today's weather information</h5>
            <div className="row mt-4">              
                <div className="col-sm-4 mt-3">
                    <div className="card">
                    {isWeatherData ? <Cards title="Wind" value={wind.speed} unit="km/h"/> : <Cards title="Wind" />}            
                    </div>  
                </div>
                <div className="col-sm-4 mt-3">
                    <div className="card">
                    {isWeatherData ? <Cards title="Humidity" value={main.humidity} unit="%"/> :  <Cards title="Humidity" />}
                    </div>
                </div>
                <div className="col-sm-4 mt-3">
                    <div className="card">
                    {isWeatherData ? <Cards title="Real Feel" value={main.temp} unit="°C"/> : <Cards title="Real Feel" />}
                    </div>
                </div>
                <div className="col-sm-4 mt-3">
                    <div className="card">
                    {isWeatherData ? <Cards title="Sea Level" value={main.sea_level} unit="hPa"/> : <Cards title="Sea Level"/>}
                    </div>
                </div>
                <div className="col-sm-4 mt-3">
                    <div className="card">
                    {isWeatherData ? <Cards title="Pressure" value={main.pressure} unit="hPa"/> : <Cards title="Pressure"/>}
                    </div>
                </div>
                <div className="col-sm-4 mt-3">
                    <div className="card">
                    {isWeatherData ? <Cards title="lat & lon" value={coord.lat} unit="hPa"/> : <Cards title="lat & lon"/>}
                    </div>
                </div>
                <div className="col-sm-4 mt-3">
                    <div className="card">
                    {isWeatherData ? <Cards title="Sun Rise Time" value={sys.sunset} /> : <Cards title="Sun Rise Time"/>}
                    </div>
                </div>
                <div className="col-sm-4 mt-3">
                    <div className="card">
                    {isWeatherData ? <Cards title="Sun Set Time" value={sys.sunrise}/> : <Cards title="Sun Set Time"/>}
                    </div>
                </div>
                <div className="col-sm-4 mt-3">
                    <div className="card">
                    {isWeatherData ? <Cards title="Time Zone" value={timezone}/> : <Cards title="Time Zone"/>}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default WeatherApp