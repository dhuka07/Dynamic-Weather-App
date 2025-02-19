import React from "react";
import Forecast from "./Forecast";

export default {
  title: "Forecast",
  component: Forecast,
};

// Mock forecast data
const mockForecastData = {
  list: [
    {
      dt_txt: "2025-02-01 12:00:00",
      main: { temp: 15.4 },
      weather: [{ icon: "01d", description: "clear sky" }],
    },
    {
      dt_txt: "2025-02-02 12:00:00",
      main: { temp: 18.2 },
      weather: [{ icon: "02d", description: "few clouds" }],
    },
    {
      dt_txt: "2025-02-03 12:00:00",
      main: { temp: 12.7 },
      weather: [{ icon: "10d", description: "rain" }],
    },
    {
      dt_txt: "2025-02-04 12:00:00",
      main: { temp: 8.9 },
      weather: [{ icon: "13d", description: "snow" }],
    },
    {
      dt_txt: "2025-02-05 12:00:00",
      main: { temp: 22.1 },
      weather: [{ icon: "03d", description: "scattered clouds" }],
    },
  ],
};

const Template = (args) => <Forecast {...args} />;

export const Default = Template.bind({});
Default.args = {
  forecastData: mockForecastData,
  unit: "metric",
};

export const ImperialUnits = Template.bind({});
ImperialUnits.args = {
  forecastData: mockForecastData,
  unit: "imperial",
};

export const NoData = Template.bind({});
NoData.args = {
  forecastData: null,
  unit: "metric",
};