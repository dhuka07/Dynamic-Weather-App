import React from 'react';
import { render } from '@testing-library/react';
import Forecast from './Forecast';

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
  ],
};

describe('Forecast Component', () => {
  test('renders without crashing', () => {
    render(<Forecast forecastData={mockForecastData} unit="metric" />);
  });

  test('renders forecast data correctly', () => {
    const { getByText, getByAltText } = render(<Forecast forecastData={mockForecastData} unit="metric" />);
    
    expect(getByText('Mon')).toBeInTheDocument();
    expect(getByText((content, element) => content.includes('2/3/2025'))).toBeInTheDocument();
    expect(getByAltText('clear sky')).toBeInTheDocument();
    expect(getByText((content, element) => content.includes('Avg Temp: 274.'))).toBeInTheDocument();

  });

  test('renders null when no forecast data is provided', () => {
    const { container } = render(<Forecast forecastData={null} unit="metric" />);
    expect(container.firstChild).toBeNull();
  });
});
