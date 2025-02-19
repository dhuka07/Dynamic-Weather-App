import React from "react";
import Weather from "./Weather";

export default {
  title: "Weather",
  component: Weather,
};

// Mock weather data
const mockWeatherData = {
  name: "Toronto",
  sys: { country: "CA" },
  main: {
    temp: 15.4,
    feels_like: 14.2,
    humidity: 60,
  },
  weather: [
    {
      icon: "01d",
      description: "clear sky",
    },
  ],
  wind: {
    speed: 3.6,
  },
};

// Mock forecast data
const mockForecastData = {
  list: [
    {
      dt_txt: "2023-10-01 12:00:00",
      main: { temp: 15.4 },
      weather: [{ icon: "01d", description: "clear sky" }],
    },
    {
      dt_txt: "2023-10-02 12:00:00",
      main: { temp: 18.2 },
      weather: [{ icon: "02d", description: "few clouds" }],
    },
  ],
};

const Template = (args) => <Weather {...args} />;

export const Default = Template.bind({});
Default.args = {
  cityName: "Toronto",
  unit: "metric",
  onBackgroundChange: (bgClass) => console.log(`Background class: ${bgClass}`),
};

export const Loading = Template.bind({});
Loading.args = {
  cityName: "InvalidCityName", // Simulate loading state
  unit: "metric",
  onBackgroundChange: (bgClass) => console.log(`Background class: ${bgClass}`),
};

export const Error = Template.bind({});
Error.args = {
  cityName: "InvalidCityName", // Simulate error state
  unit: "metric",
  onBackgroundChange: (bgClass) => console.log(`Background class: ${bgClass}`),
};

export const WithForecast = Template.bind({});
WithForecast.args = {
  cityName: "Toronto",
  unit: "metric",
  onBackgroundChange: (bgClass) => console.log(`Background class: ${bgClass}`),
  weatherData: mockWeatherData, // Pass mock weather data
  forecastData: mockForecastData, // Pass mock forecast data
};