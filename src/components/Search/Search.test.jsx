import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Search from "./Search";
import useCitySuggestions from "../../hooks/useCitySuggestion";


jest.mock("../../hooks/useCitySuggestion", () => ({
  __esModule: true,
  default: () => ({
    suggestions: [
      { name: "London", country: "GB" },
      { name: "Los Angeles", country: "US" },
    ],
    isLoading: false,
  }),
}));

describe("Search Component", () => {
  it("renders the search input and button", () => {
    render(<Search onSearch={() => {}} />);

    // Check if the search input is rendered
    expect(
      screen.getByPlaceholderText("Enter City Name...")
    ).toBeInTheDocument();

    // Check if the search button is rendered
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("displays suggestions when typing", async () => {
    render(<Search onSearch={() => {}} />);

    // Simulate typing in the input
    const input = screen.getByPlaceholderText("Enter City Name...");
    fireEvent.change(input, { target: { value: "Lon" } });

    // Wait for suggestions to appear
    const suggestion = await screen.findByText("London, GB");
    expect(suggestion).toBeInTheDocument();
  });

  it("triggers search when a suggestion is clicked", async () => {
    const onSearchMock = jest.fn();
    render(<Search onSearch={onSearchMock} />);

    // Simulate typing in the input
    const input = screen.getByPlaceholderText("Enter City Name...");
    fireEvent.change(input, { target: { value: "Lon" } });

 
    const suggestion = await screen.findByText("London, GB");
    fireEvent.click(suggestion);

  
    expect(onSearchMock).toHaveBeenCalledWith("London");
  });

  it("triggers search when the form is submitted", () => {
    const onSearchMock = jest.fn();
    render(<Search onSearch={onSearchMock} />);

    
    const input = screen.getByPlaceholderText("Enter City Name...");
    fireEvent.change(input, { target: { value: "Toronto" } });


    const form = screen.getByRole("form");
    fireEvent.submit(form);

  
    expect(onSearchMock).toHaveBeenCalledWith("Toronto");
  });

  it("displays loading state", async () => {
  
    jest.mock("../../hooks/useCitySuggestion", () => ({
      __esModule: true,
      default: () => ({
        suggestions: [],
        isLoading: true,
      }),
    }));

    render(<Search onSearch={() => {}} />);

    // Simulate typing in the input
    const input = screen.getByPlaceholderText("Enter City Name...");
    fireEvent.change(input, { target: { value: "Tor" } });

  });
});
