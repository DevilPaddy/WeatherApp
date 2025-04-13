import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search from '../assets/search.png'
import clear from '../assets/clear.png'
import cloud from '../assets/cloud.png'
import drizzle from '../assets/drizzle.png'
import humidity from '../assets/humidity.png'
import snow from '../assets/snow.png'
import wind from '../assets/wind.png'
import rain from '../assets/rain.png'

const Weather = () => {
    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);
    const allIcons = {
        "01d":clear,
        "01n":clear,
        "02d":cloud,
        "02n":cloud,
        "03d":cloud,
        "03n":cloud,
        "04d":drizzle,
        "04n":drizzle,
        "09d":rain,
        "09n":rain,
        "10d":rain,
        "10n":rain,
        "13d":snow,
        "13n":snow,
    }

    const searchf = async(city_name)=>{
        if(city_name === ""){
            alert("Enter City Name");
            return;
        }
        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&units=metric&appid=${import.meta.env.VITE_API_KEY}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok){
                alert(data.message);
                return;
            }
            
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;
            setWeatherData({
                humid: data.main.humidity,
                windSpeed: data.wind.speed,
                temp: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        }
        catch(error){
            console.log(error);
            setWeatherData(false);
        }
    }

    useEffect(()=>{
        searchf("Amravati");
    },[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="search" />
            <img src={search} alt="search" onClick={()=>{searchf(inputRef.current.value)}} />
        </div>
        {weatherData? <>
            <img className='weather-icon' src={weatherData.icon} alt="" />
            <p className='temp'>{weatherData.temp}°C</p>
            <p className='location'>{weatherData.location}</p>

            <div className="weather-data">
                <div className="col">
                    <img src={humidity} alt="" />
                    <div>
                        <p>{weatherData.humid}%</p>
                        <span>Humidity</span>
                    </div>
                </div>

                <div className="col">
                    <img src={wind} alt="" />
                    <div>
                        <p>{weatherData.windSpeed}Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </>:<></>}
       
    </div>
  )
}

export default Weather