import React from 'react';
import { render, screen } from '@testing-library/react';
import Weather from './Weather';
import useWeather from '../../hooks/useWeather';

jest.mock('../../hooks/useWeather');

const mockWeatherData = {
  main: {
    temp: 273.15,
    feels_like: 270.15,
    humidity: 80,
  },
  weather: [
    {
      icon: '01d',
      description: 'clear sky',
      main: 'Clear',
    },
  ],
  name: 'Toronto',
  sys: {
    country: 'CA',
  },
  wind: {
    speed: 5,
  },
  dt: 1618317040,
};

const mockForecastData = {
  list: [
    {
      dt_txt: '2025-02-04 12:00:00',
      main: { temp: 273.15 },
      weather: [{ icon: '01d', description: 'clear sky' }],
    },
    {
      dt_txt: '2025-02-04 15:00:00',
      main: { temp: 275.15 },
      weather: [{ icon: '02d', description: 'few clouds' }],
    },
    // Add more mock data as needed
  ],
};

describe('Weather Component', () => {
  test('renders loading state', () => {
    useWeather.mockReturnValue({ weatherData: null, forecastData: null, loading: true, error: null });
    render(<Weather cityName="Toronto" unit="metric" />);

    expect(screen.getByText('Loading....')).toBeInTheDocument();
  });

  test('renders error state', () => {
    useWeather.mockReturnValue({ weatherData: null, forecastData: null, loading: false, error: 'Error fetching data' });
    render(<Weather cityName="Toronto" unit="metric" />);

    expect(screen.getByText('Error fetching data')).toBeInTheDocument();
  });

  test('renders weather data correctly', () => {
    useWeather.mockReturnValue({ weatherData: mockWeatherData, forecastData: mockForecastData, loading: false, error: null });
    render(<Weather cityName="Toronto" unit="metric" />);

    expect(screen.getByText('Toronto, CA')).toBeInTheDocument();
    expect(screen.getByText(/feels like/i)).toBeInTheDocument();
    expect(screen.getByText('80% Humidity')).toBeInTheDocument();
    expect(screen.getByText('5 m/s')).toBeInTheDocument();
  });

  test('renders forecast data', () => {
    useWeather.mockReturnValue({ weatherData: mockWeatherData, forecastData: mockForecastData, loading: false, error: null });
    render(<Weather cityName="Toronto" unit="metric" />);

    expect(screen.getByText('Mon')).toBeInTheDocument();
    expect(screen.getByText('2/3/2025')).toBeInTheDocument();
    expect(screen.getByText(/Avg Temp:/i)).toBeInTheDocument();
  });

  test('calls onBackgroundChange with correct class', () => {
    const mockOnBackgroundChange = jest.fn();
    useWeather.mockReturnValue({ weatherData: mockWeatherData, forecastData: mockForecastData, loading: false, error: null });

    render(<Weather cityName="Toronto" unit="metric" onBackgroundChange={mockOnBackgroundChange} />);

    expect(mockOnBackgroundChange).toHaveBeenCalledWith('bg-gradient-to-b from-indigo-400 to-yellow-200');
  });
});
