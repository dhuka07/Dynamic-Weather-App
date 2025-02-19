import React from "react";

const UnitToggle = ({ unit, toggleUnit }) => {
  return (
    <button
      onClick={toggleUnit}
      className="border-1 border-[#011d52] mb-5 ml-2 flex items-center px-4 py-2 bg-white rounded-full transition-all duration-300 cursor-pointer"
    >
      <span className={`mr-2 text-sm ${unit === "metric" ? "text-gray-400" : "text-[#011d52]"}`}>
        °F
      </span>
      <div
        className={`w-10 h-5 flex items-center p-1 bg-[#011d52] rounded-full shadow-inner transition-all duration-300 ${
          unit === "metric" ? "bg-[#011d52]" : "bg-gray-400"
        }`}
      >
        <div
          data-testid="toggle-circle"
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ${
            unit === "metric" ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </div>
      <span className={`ml-2 text-sm ${unit === "metric" ? "text-[#011d52]" : "text-gray-400"}`}>
        °C
      </span>
    </button>
  );
};

export default UnitToggle;