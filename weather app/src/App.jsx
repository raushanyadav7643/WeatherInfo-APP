import "./App.css";
import React, { useEffect, useState } from "react";
import Navbar from "../src/components/Navbar";
import FiveDayForecast from "./components/FiveDayForecast";
import TodayHighlights from "../src/components/TodayHighlights";
import Mainweather from "../src/components/Mainweather";

import axios from "axios";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Patna");
  const [airQualityData, setAirQualityData] = useState(null);
  const [fiveDayForecast, setFiveDayForecast] = useState(null);

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const fetchAirQualityData = (lat, lon) => {
    const API_KEY = "2e8ca93802e67b1c9b2ab0d44b78771e";
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      .then((response) => setAirQualityData(response.data.list[0]))
      .catch((error) =>
        console.error("Error fetching air quality data:", error)
      );
  };

  const fetchWeatherData = (city) => {
    const API_KEY = "2e8ca93802e67b1c9b2ab0d44b78771e";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
        fetchAirQualityData(data.coord.lat, data.coord.lon);
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`
          )
          .then((response) => setFiveDayForecast(response.data))
          .catch((error) =>
            console.error("Error fetching 5-day forecast:", error)
          );
      })
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  const handleSearch = (searchedCity) => {
    setCity(searchedCity);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />
      {weatherData && airQualityData && (
        <div style={{ display: "flex", padding: "30px", gap: "20px" }}>
          <div style={{ flex: "1", marginRight: "10px" }}>
            <Mainweather weatherData={weatherData} />
            <p
              style={{
                fontWeight: "700",
                fontSize: "20px",
                marginTop: "20px",
                color: "white",
              }}
            >
              Forecast
            </p>
            {fiveDayForecast && (
              <FiveDayForecast forecastData={fiveDayForecast} />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: "0.5",
              gap: "20px",
            }}
          >
            <TodayHighlights
              weatherData={weatherData}
              airQualityData={airQualityData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default WeatherDashboard;
