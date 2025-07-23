# The Weather Accurate

![The Weather Accurate Logo for logo; replace with actual image if available -->

## Overview

The Weather Accurate is a modern, single-page weather application built with HTML, CSS, and JavaScript. It leverages the Open Meteo API to provide real-time weather data, forecasts, and location-based services without requiring an API key. The app features a sleek glassmorphic design, smooth animations for various weather conditions, and an intuitive user interface that adapts to desktop and mobile devices.

This project demonstrates best practices in web development, including responsive design, API integration, geolocation handling, and performance-optimized animations. It's completely free to use and modify, making it ideal for learning or personal weather tracking.

## Features

- **Automatic Location Detection**: Uses HTML5 Geolocation API for instant weather based on your current position, with graceful fallback if permission is denied.
- **City Search**: Enter a city name and press Enter to fetch weather data directly; includes debounced input for efficient API calls.
- **Comprehensive Weather Display**:
  - Current conditions: Temperature, "feels like" temperature, humidity, wind speed/direction.
  - Hourly forecast for the next 24 hours (in 3-hour intervals).
  - 7-day daily forecast with high/low temperatures.
- **Temperature Unit Toggle**: Switch between Celsius and Fahrenheit, with preferences saved in local storage.
- **Weather-Specific Animations**:
  - Lens glare effects for sunny conditions.
  - Realistic snowflake falling for snowy weather.
  - Heavy rain overlay (CSS-based, no flashing lightning) for thunderstorms (triggered by WMO codes 95/96/99).
  - Smooth transitions and particle effects that update dynamically on location change.
- **Glassmorphic UI**: Premium design with backdrop filters, multi-layered cards, and subtle gradients for a classy, professional look.
- **Error Handling**: Robust management of API errors, geolocation issues, and network problems with user-friendly messages.
- **Responsive Design**: Fully adaptable to all screen sizes using CSS Grid and Flexbox.
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support.

## Technologies Used

- **Frontend**: HTML5, CSS3 (including animations from sources like Foolish Developer for rain effects), Vanilla JavaScript.
- **API**: Open Meteo (Forecast and Geocoding endpoints).
- **Fonts**: Professional stack including SF Pro Display, Helvetica Neue, and system fallbacks for a clean, app-like typography.
- **Animations**: CSS keyframe animations and JavaScript for dynamic weather effects (e.g., particles for snow/rain, lens glare for sun).
- **Other**: Local Storage for user preferences, Canvas for advanced particle systems.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/the-weather-accurate.git
   ```
2. Navigate to the project directory:
   ```
   cd the-weather-accurate
   ```
3. Open `index.html` in your preferred web browser. No server or dependencies required, as it's a static app.

   *Note*: For development, you can use a local server like Live Server in VS Code for hot reloading.

## Usage

1. **Launch the App**: Open `index.html` in a browser.
2. **Grant Location Access**: On first load, allow geolocation for automatic weather data.
3. **Search Locations**: Type a city name in the search bar and press Enter to view weather for that location.
4. **Toggle Units**: Click the unit button to switch between °C and °F.
5. **View Forecasts**: Scroll through hourly and daily sections; animations will adapt to the current weather.

The app is optimized for Chrome, Firefox, Safari, and Edge. Test on different devices for the full responsive experience.

## Screenshots


- **Main Interface**: Glassmorphic cards with current weather.
- **Sunny Animation**: Lens glare effects.
- **Thunderstorm**: Heavy rain overlay.
- **Snow**: Falling snowflakes.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Commit your changes: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a Pull Request.

For bug reports or feature requests, open an issue with detailed information.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Open Meteo API for free weather data.
- Inspiration from modern weather apps like Apple's iOS Weather.
- CSS animation resources, including Foolish Developer's rain effects tutorial.

For questions or support, contact the maintainer at [your.email@example.com].
