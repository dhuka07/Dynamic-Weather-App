import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";

const useCitySuggestions = (query) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const API_KEY = config.API_KEY;
  const GEOCODING_API_URL = "https://api.openweathermap.org/geo/1.0/direct";

  useEffect(() => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(GEOCODING_API_URL, {
          params: {
            q: query,
            limit: 5, // Limit the number of suggestions
            appid: API_KEY,
          },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  return { suggestions, isLoading };
};

export default useCitySuggestions;