# WTWR — What To Wear Recommendation App

WTWR (What To Wear Recommendation) is a responsive React-based frontend application that helps users decide what to wear based on the current weather conditions. The app fetches real-time weather data from the OpenWeather API and filters a curated set of clothing recommendations accordingly.

## Features Implemented

- Weather data fetched on initial page load via OpenWeather API
- Current temperature and city displayed in the header
- Hardcoded array of clothing items rendered as cards
- Clothing cards filtered based on current weather
- Modal popup to view clothing image in detail
- Modal for adding a new clothing item (open/close functionality)
- Responsive UI styled using a Figma-based design
- Like icon added to each card (functionality not yet implemented)

## Technologies and Techniques Used

- **React** — Component-based architecture and state management
- **Vite** — Development tooling for fast refresh and build
- **OpenWeather API** — Real-time weather information (temperature and location)
- **CSS (Responsive Design)** — Adaptive layout using media queries
- **Figma Design Reference** — UI Kit and visual consistency
- **React Hooks** — useState and useEffect for managing state and lifecycle
- **Modular File Structure** — For scalable and maintainable code