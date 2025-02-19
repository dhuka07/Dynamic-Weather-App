import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UnitToggle from "./UnitToggle";

describe("UnitToggle Component", () => {
  it("renders the toggle button with metric unit selected", () => {
    render(<UnitToggle unit="metric" toggleUnit={() => {}} />);

    // Check if the toggle button is rendered
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();

    // Check if °C is highlighted
    const celsiusText = screen.getByText("°C");
    expect(celsiusText).toHaveClass("text-[#011d52]");

    // Check if °F is grayed out
    const fahrenheitText = screen.getByText("°F");
    expect(fahrenheitText).toHaveClass("text-gray-400");

    // Check if the toggle circle is on the right (metric)
    const toggleCircle = screen.getByTestId("toggle-circle");
    expect(toggleCircle).toHaveClass("translate-x-5");
  });

  it("renders the toggle button with imperial unit selected", () => {
    render(<UnitToggle unit="imperial" toggleUnit={() => {}} />);

    // Check if °F is highlighted
    const fahrenheitText = screen.getByText("°F");
    expect(fahrenheitText).toHaveClass("text-[#011d52]");

    // Check if °C is grayed out
    const celsiusText = screen.getByText("°C");
    expect(celsiusText).toHaveClass("text-gray-400");

    // Check if the toggle circle is on the left (imperial)
    const toggleCircle = screen.getByTestId("toggle-circle");
    expect(toggleCircle).toHaveClass("translate-x-0");
  });

  it("calls toggleUnit when clicked", () => {
    const toggleUnitMock = jest.fn();
    render(<UnitToggle unit="metric" toggleUnit={toggleUnitMock} />);

    // Simulate a click on the toggle button
    const toggleButton = screen.getByRole("button");
    fireEvent.click(toggleButton);

    // Verify that toggleUnit is called
    expect(toggleUnitMock).toHaveBeenCalled();
  });
});