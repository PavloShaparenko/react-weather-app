# Weather App

A modern React weather dashboard that lets users search for a city and view current weather conditions, a two-day hourly forecast, and useful highlights such as wind, air quality, and humidity.

## Features

- Search any city to get weather information
- View a detailed hourly forecast chart
- See weather highlights for wind, air quality, and humidity
- Switch between multiple languages
- Enjoy a dynamic weather-themed background experience

## Tech Stack

- React
- React Scripts
- Recharts
- WeatherAPI
- CSS for styling

## Project Structure

- src/App.js — main application layout
- src/widgets/ — weather UI components and data handling
- src/features/ — search and user-related features
- src/shared/ — shared styles and assets

## Getting Started

1. Clone the repository
2. Open the project folder
3. Install dependencies:

   ```bash
   cd Projekt
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

The app will open in your browser at http://localhost:3000.

## Available Scripts

In the project directory, you can run:

- npm start — runs the app in development mode
- npm run build — builds the app for production
- npm test — runs tests
- npm run deploy — deploys the build to GitHub Pages

## Deployment

This project is set up for deployment with GitHub Pages.

```bash
npm run build
npm run deploy
```

## Notes

The app uses the WeatherAPI service. If you plan to use it for your own deployment, consider replacing the included API key with your own key.

## License

This project is licensed under the GNU General Public License v3.0.
