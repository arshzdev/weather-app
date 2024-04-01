import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [currentTemperature, setCurrentTemperature] = useState(null);
  const [currentWindSpeed, setCurrentWindSpeed] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let latitude = 13.09;
      let langitude = 80.28;
      try {
        const response = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${langitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );
        setCurrentTemperature(response.data.current.temperature_2m);
        setCurrentWindSpeed(response.data.current.wind_speed_10m);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App bg-gray-200 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Weather App</h1>
        <h2 className="text-xl mb-2">City: Chennai</h2>
        <h2 className="text-xl mb-2">Current Temperature: {currentTemperature}°C</h2>
        <h2 className="text-xl">Current Wind Speed: {currentWindSpeed} km/h</h2>
      </div>
    </div>
  );
}

export default App;

