import React from "react";
import Search from "./Search";

// Mock implementation of useCitySuggestions
const mockUseCitySuggestions = (query) => {
  if (query === "Load") {
    return { suggestions: [], isLoading: true }; // Loading state
  }
  return {
    suggestions: [
      { name: "Toronto", country: "CA" },
      { name: "Los Angeles", country: "US" },
    ],
    isLoading: false,
  };
};

export default {
  title: "Search",
  component: Search,
  decorators: [
    (Story) => {
      // Mock the hook globally for all stories
      window.__USE_CITY_SUGGESTIONS_MOCK__ = mockUseCitySuggestions;
      return <Story />;
    },
  ],
};

const Template = (args) => <Search {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSearch: (city) => console.log(`Searching for: ${city}`),
};

export const WithSuggestions = Template.bind({});
WithSuggestions.args = {
  onSearch: (city) => console.log(`Searching for: ${city}`),
};
WithSuggestions.decorators = [
  (Story) => {
    // Override the mock for this specific story
    window.__USE_CITY_SUGGESTIONS_MOCK__ = () => ({
      suggestions: [
        { name: "London", country: "GB" },
        { name: "Los Angeles", country: "US" },
      ],
      isLoading: false,
    });
    return <Story />;
  },
];

export const Loading = Template.bind({});
Loading.args = {
  onSearch: (city) => console.log(`Searching for: ${city}`),
};
Loading.decorators = [
  (Story) => {
    // Override the mock for this specific story
    window.__USE_CITY_SUGGESTIONS_MOCK__ = () => ({
      suggestions: [],
      isLoading: true,
    });
    return <Story />;
  },
];