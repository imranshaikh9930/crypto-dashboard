export default async function handler(req, res) {
    const API_KEY =process.env.NEXT_PUBLIC_WHEATHER_API; // Secure API key
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ error: "City is required" });
    }

    try {
      
        const geoResponse = await fetch(
            `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();

        console.log("Geo Data:", geoData);

        if (!geoData || geoData.length === 0) {
            return res.status(404).json({ error: "City not found" });
        }

        const { lat, lon } = geoData[0];

        // 🛑 OpenWeather's OneCall Timemachine API needs a paid plan. Instead, use Free API:
        const weatherResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        const weatherData = await weatherResponse.json();

        if (!weatherData || !weatherData.list) {
            return res.status(500).json({ error: "Failed to fetch weather data" });
        }


        const forecast = weatherData.list.map((entry) => ({
            date: new Date(entry.dt * 1000).toLocaleDateString(),
            temp: entry.main.temp,
            humidity: entry.main.humidity,
            condition: entry.weather[0]?.description || "N/A",
        }));

        // console.log("Processed Forecast Data:", forecast);
        res.status(200).json(forecast);
    } catch (error) {
        console.error("Error fetching weather history:", error);
        res.status(500).json({ error: "Failed to fetch weather history" });
    }
}
