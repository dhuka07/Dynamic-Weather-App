import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useCitySuggestions from "../../hooks/useCitySuggestion";

const Search = ({ onSearch }) => {
  const [city, setCity] = useState("");
  // Use the mock implementation in Storybook
  const { suggestions, isLoading } = window.__USE_CITY_SUGGESTIONS_MOCK__
    ? window.__USE_CITY_SUGGESTIONS_MOCK__(city)
    : useCitySuggestions(city);

  const handleSuggestionClick = (suggestion) => {
    setCity("");
    onSearch(suggestion.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      suggestions;
    }
  };

  return (
    <div className="flex justify-center my-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center w-full max-w-lg gap-2 mb-6 relative"
      >
        <div className="relative w-full">
          <input
            type="text"
            role="form"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              suggestions.length = 0;
            }}
            className="w-full sm:w-80 px-6 py-2 border-1 rounded-full bg-white text-[#011d51] focus:outline-none focus:ring-1 focus:ring-[#011d51]"
            placeholder="Enter City Name..."
          />
          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              {suggestions.map((suggestion) => (
                <div
                  key={`${suggestion.name}-${suggestion.country}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {suggestion.name}, {suggestion.country}
                </div>
              ))}
            </div>
          )}
          {isLoading && (
            <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
              <div className="px-4 py-2 text-gray-500">Loading...</div>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="cursor-pointer inline-flex mx-4 pl-3 pr-3 bg-[#011d51] rounded-full p-2 m-1 text-white gap-2 hover:scale-105"
        >
          <FaSearch size={16} className="mt-1" />
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;