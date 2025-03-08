import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WeatherCard from "../components/WeatherCard";
import LocationSelector from "../components/LocationSelector";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CityWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  let { city } = useParams();

  useEffect(() => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
    )
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  }, [city]);

  return (
    <div className="flex justify-center items-center h-screen">
      <WeatherCard city={city} weather={weatherData} />
    </div>
  );
};

export default CityWeather;
