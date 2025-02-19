import React, { useEffect } from "react";
import useWeather from "../../hooks/useWeather";
import { WiHumidity, WiStrongWind, WiThermometer } from "react-icons/wi";
import Forecast from "../Forecast/Forecast";

const Weather = ({ cityName, unit, onBackgroundChange }) => {
  const { weatherData, forecastData, loading, error } = useWeather(
    cityName,
    unit
  );
  const temperatureUnit = unit === "metric" ? "°C" : "°F";

  const getBackgroundClass = () => {
    if (!weatherData) return "bg-gray-100"; // Default background

    const isDay = weatherData.weather[0].icon.includes("d");
    const weatherCondition = weatherData.weather[0].main.toLowerCase();

    if (
      weatherCondition.includes("clear") ||
      weatherCondition.includes("sunny")
    ) {
      return isDay
        ? "bg-gradient-to-b from-indigo-400 to-yellow-200"
        : "bg-gradient-to-b from-gray-900 to-indigo-800";
    } else if (
      weatherCondition.includes("cloud") ||
      weatherCondition.includes("smoke") ||
      weatherCondition.includes("haze")
    ) {
      return isDay
        ? "bg-gradient-to-b from-gray-300 to-blue-200"
        : "bg-gradient-to-b from-gray-700 to-gray-900";
    } else if (
      weatherCondition.includes("rain") ||
      weatherCondition.includes("mist")
    ) {
      return "bg-gradient-to-b from-gray-500 to-blue-800";
    } else if (weatherCondition.includes("snow")) {
      return "bg-gradient-to-b from-white to-blue-100";
    } else {
      return "bg-gradient-to-b from-purple-300 to-gray-100"; // Default for unknown weather
    }
  };

  useEffect(() => {
    if (onBackgroundChange) {
      onBackgroundChange(getBackgroundClass());
    }
  }, [weatherData, onBackgroundChange]);

  if (loading) {
    return <div className="text-center py-4">Loading....</div>;
  }
  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }
  return (
    <div className={`min-h-screen p-8 transition-all duration-500`}>
      <div className="bg-gradient-to-b from-[#dcefff] to-white max-w-4xl mx-auto bg-opacity-80 backdrop-blur-md p-6 rounded-4xl text-center">
        <div className="flex items-center justify-center gap-2">
          <h2 className="text-4xl sm:text-5xl text-gray-800 font-bold">
            {Math.round(weatherData.main.temp)}
          </h2>
          <span className="text-2xl sm:text-3xl text-gray-800">
            {temperatureUnit}
          </span>
        </div>

        <span className="text-gray-800">
          {weatherData.name}, {weatherData.sys.country}
        </span>

        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          className="mx-auto"
        />

        <p className="text-sm text-gray-700 capitalize">
          {weatherData.weather[0].description}
        </p>

        <div className="mt-4 text-gray-800 space-y-2">
          <p className="flex items-center justify-center gap-2 text-lg">
            <WiThermometer size={24} className="text-red-500" />
            {Math.round(weatherData.main.feels_like)} {temperatureUnit} feels
            like
          </p>
          <p className="flex items-center justify-center gap-2">
            <WiHumidity size={24} className="text-blue-500" />
            {weatherData.main.humidity}% Humidity
          </p>
          <p className="flex items-center justify-center gap-4">
            <WiStrongWind size={24} className="text-gray-800" />
            {weatherData.wind.speed} {unit === "metric" ? "m/s" : "mph"}
          </p>
          <span className="text-sm mb-4 text-gray-800">
            {Date(weatherData.dt * 1000)}
          </span>
        </div>
      </div>

      {/* Forecast */}
      {forecastData && forecastData.list ? (
        <Forecast
          className={`${getBackgroundClass()}`}
          forecastData={forecastData}
        />
      ) : (
        <div className="text-center py-4">No forecast data available</div>
      )}
    </div>
  );
};

export default Weather;
