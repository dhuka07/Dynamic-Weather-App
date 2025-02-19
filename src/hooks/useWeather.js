import { useEffect, useState } from "react";
import axios from "axios";
import config from '../../config';

const useWeather = (cityName, unit='metric') => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = config.API_KEY;
  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_URL_FORECAST = "https://api.openweathermap.org/data/2.5/forecast";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          q: cityName,
          appid: API_KEY,
          units: unit,
        },
      });
      setWeatherData(response.data);
      const forecastResponse = await axios.get(API_URL_FORECAST, {
        params: {
            q: cityName,
            appid: API_KEY,
            units: unit,
          },
      });
      setForecastData(forecastResponse.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch weather data, please try again");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchWeather();
    const interval = setInterval(fetchWeather, 5 * 60 * 1000); // refresh time 5 mins
    console.log("refreshed");
    return () => clearInterval(interval);
  }, [cityName, unit]);



  return {weatherData,forecastData, loading, error};
};

export default useWeather;
