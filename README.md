# Weather App

## Overview
This project is a weather application that displays the current, daily, and hourly weather forecasts for a user's location. The application uses geolocation to fetch the user's coordinates and retrieves weather data from the Open-Meteo API. The data is then rendered in a user-friendly interface.

## Project Structure
The repository contains the following files:

- `index.html`: The main HTML file that structures the web page.
- `main.js`: The main JavaScript file that handles the application's logic and user interface interactions.
- `weather.js`: A JavaScript module that handles fetching weather data from the Open-Meteo API.
- `style.css`: The CSS file for styling the web page.

## Files and Their Roles

### `index.html`
This file contains the structure of the web page, including the header, daily weather section, and hourly weather table. It uses HTML5 and includes placeholders for dynamic data that will be filled by the JavaScript code.

### `main.js`
This file is responsible for:
- Importing necessary modules and styles.
- Getting the user's current location using the Geolocation API.
- Fetching weather data based on the user's location and timezone.
- Rendering the current, daily, and hourly weather data on the web page.
- Handling errors related to fetching location and weather data.

### `weather.js`
This file contains functions to:
- Fetch weather data from the Open-Meteo API.
- Parse and structure the fetched weather data into a usable format for rendering.
- Export the `getWeather` function to be used in `main.js`.
