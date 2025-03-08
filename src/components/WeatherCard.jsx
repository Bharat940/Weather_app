import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div className="flex justify-center p-4">
      <div className="card w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl text-black dark:text-white rounded-md p-4">
        {/* City & Time */}
        <div className="flex justify-between items-center text-md px-2 pb-4">
          <span className="font-semibold text-lg sm:text-xl">
            {weather?.location?.name}
          </span>
          <span className="text-sm sm:text-md">
            {weather?.location?.localtime}
          </span>
        </div>

        {/* Icon */}
        <div className="flex justify-center items-center">
          <img
            src={weather?.current?.condition?.icon}
            alt="Weather Icon"
            className="max-w-[120px] sm:max-w-[140px] md:max-w-[160px]"
          />
        </div>

        {/* Weather Info */}
        <div className="text-md pt-4 pb-2">
          <div className="flex flex-wrap justify-between items-center">
            {/* Wind & Humidity */}
            <div className="space-y-2 text-sm sm:text-md md:w-1/2 lg:w-1/2 xl:w-1/2">
              <span className="flex space-x-2 items-center">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 32 32"
                  className="fill-current text-black dark:text-white"
                >
                  <path d="M13,30a5.0057,5.0057,0,0,1-5-5h2a3,3,0,1,0,3-3H4V20h9a5,5,0,0,1,0,10Z"></path>
                  <path d="M25 25a5.0057 5.0057 0 01-5-5h2a3 3 0 103-3H2V15H25a5 5 0 010 10zM21 12H6V10H21a3 3 0 10-3-3H16a5 5 0 115 5z"></path>
                </svg>
                <span>{weather?.current?.wind_kph} km/h</span>
              </span>
              <span className="flex space-x-2 items-center">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 32 32"
                  className="fill-current text-black dark:text-white"
                >
                  <path d="M16,24V22a3.2965,3.2965,0,0,0,3-3h2A5.2668,5.2668,0,0,1,16,24Z"></path>
                  <path d="M16,28a9.0114,9.0114,0,0,1-9-9,9.9843,9.9843,0,0,1,1.4941-4.9554L15.1528,3.4367a1.04,1.04,0,0,1,1.6944,0l6.6289,10.5564A10.0633,10.0633,0,0,1,25,19,a9.0114,a9.0114,a9.0114,a9.0114,a9.0114,a9.0114,a9.a0114,a9.a0114,a9.a0114,a9.a0114,a9.a0114,a9.a0114,a9.a0114,a9.a0114,a9.a0114,a9.a0114,a9.a0114,Z"></path>
                </svg>
                <span>{weather?.current?.humidity}%</span>
              </span>
            </div>

            {/* Temperature */}
            <div className="text-center md:w-1/2 lg:w-1/2 xl:w-1/2">
              <h1 className="text-[40px] sm:text-[48px] md:text-[56px] font-bold">
                {weather?.current?.temp_c}°C
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
