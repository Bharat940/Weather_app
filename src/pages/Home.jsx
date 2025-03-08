import { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";
import LocationSelector from "../components/LocationSelector";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Home = () => {
  const [currentCity, setCurrentCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [manualCitySelected, setManualCitySelected] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    if (!manualCitySelected) {
      getUserLocation();
    }
  }, [darkMode, manualCitySelected]);

  // Light/Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // User's location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await getCityName(latitude, longitude);
        },
        () => {
          setError("Location access denied. Please search for a city.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  // Lat/Lon
  const getCityName = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}&aqi=no`
      );
      const data = await res.json();
      if (data.location?.name) {
        setCurrentCity(data.location.name);
        fetchWeather(data.location.name);
      }
    } catch {
      setError("Could not fetch city name.");
      setLoading(false);
    }
  };

  // Weather data
  const fetchWeather = async (cityName) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Manual city selection
  const handleCitySelect = (city) => {
    setCurrentCity(city.value);
    fetchWeather(city.value);
    setManualCitySelected(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-colors">
      {/* Theme Button */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full shadow-md transition hover:scale-105 active:scale-95"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>

      {/* Title */}
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-4 text-center">
        Weather in {currentCity || "your location"}
      </h1>

      {/* Manual Search */}
      <div className="max-w-md md:max-w-lg lg:max-w-xl w-full mb-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md p-4">
          <LocationSelector onCitySelect={handleCitySelect} />
        </div>
      </div>

      {/* Weather */}
      {loading && (
        <p className="text-gray-600 dark:text-gray-400">
          Detecting location...
        </p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {weatherData && (
        <div className="w-full max-w-sm md:max-w-lg lg:max-w-2xl">
          <WeatherCard weather={weatherData} />
        </div>
      )}
    </div>
  );
};

export default Home;
