import React from "react";

const Forecast = ({ forecastData, unit }) => {
  if (!forecastData) return null;

  // Group forecast data by day
  const dailyForecast = forecastData.list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0]; // Extract date
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const nextDays = Object.keys(dailyForecast).slice(0, 7);

  return (
    <div className="mt-8 justify-center items-center">
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {nextDays.map((date) => {
          const dayForecast = dailyForecast[date];
          const avgTemp =
            dayForecast.reduce((sum, item) => sum + item.main.temp, 0) /
            dayForecast.length;
          const weather = dayForecast[0].weather[0];

          return (
            <div
              key={date}
              className="bg-gradient-to-b from-white to-[#81c4ff] p-4 rounded-3xl  text-center"
            >
              <p className="font-semibold">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <p>{new Date(date).toLocaleDateString()}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                className="mx-auto"
              />
              <p>{weather.description}</p>
              <p>
                Avg Temp: {avgTemp.toFixed(1)}°{unit === "metric" ? "C" : "F"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
