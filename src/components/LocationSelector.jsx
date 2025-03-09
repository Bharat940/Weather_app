import React, { useState } from "react";
import Select from "react-select";
import { Country, State, City } from "country-state-city";

const LocationSelector = ({ onCitySelect }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      {/* Country Selection */}
      <div className="mb-3">
        <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
          Country
        </label>
        <Select
          options={Country.getAllCountries().map((country) => ({
            value: country.isoCode,
            label: country.name,
          }))}
          value={selectedCountry}
          onChange={(country) => {
            setSelectedCountry(country);
            setSelectedState(null);
            setSelectedCity(null);
          }}
          placeholder="Select Country"
          className="w-full"
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "white",
              borderColor: "gray",
              "&:hover": {
                borderColor: "gray",
              },
              "&:focus": {
                borderColor: "blue",
              },
            }),
          }}
        />
      </div>

      {/* State Selection */}
      {selectedCountry && (
        <div className="mb-3">
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            State
          </label>
          <Select
            options={State.getStatesOfCountry(selectedCountry.value).map(
              (state) => ({
                value: state.isoCode,
                label: state.name,
              })
            )}
            value={selectedState}
            onChange={(state) => {
              setSelectedState(state);
              setSelectedCity(null);
            }}
            placeholder="Select State"
            className="w-full"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "white",
                borderColor: "gray",
                "&:hover": {
                  borderColor: "gray",
                },
                "&:focus": {
                  borderColor: "blue",
                },
              }),
            }}
          />
        </div>
      )}

      {/* City Selection */}
      {selectedState && (
        <div className="mb-3">
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            City
          </label>
          <Select
            options={City.getCitiesOfState(
              selectedCountry.value,
              selectedState.value
            ).map((city) => ({
              value: city.name,
              label: city.name,
            }))}
            value={selectedCity}
            onChange={setSelectedCity}
            placeholder="Select City"
            className="w-full"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "white",
                borderColor: "gray",
                "&:hover": {
                  borderColor: "gray",
                },
                "&:focus": {
                  borderColor: "blue",
                },
              }),
            }}
          />
        </div>
      )}

      {/* Get Weather Button */}
      <button
        className={`w-full py-2 mt-3 text-white font-semibold rounded-lg ${
          selectedCity
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-300 cursor-not-allowed"
        }`}
        disabled={!selectedCity}
        onClick={() => onCitySelect(selectedCity)}
      >
        Get Weather
      </button>
    </div>
  );
};

export default LocationSelector;
