import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"

const WEATHER_API_BASE = "https://api.weather.gov";
const USER_AGENT = "weather-app/1.0"

async function makeWeatherServiceRequest<T>(url: string): Promise<T | null> {
    const headers = {
        "User-Agent": USER_AGENT,
        "Accept": "application/geo+json",
    };

    try {
        const response = await fetch(url, { headers });

        if (response.ok) {
            return (await response.json()) as T;
        }

        throw new Error(`HTTP error! status ${response.status}`);
    } catch(error) {
        console.log("Error making weather service request", error);
        return null;
    }
}

interface AlertFeature {
    properties: {
        event?: string;
        areaDesc?: string;
        severity ?: string;
        status?: string;
        headline?: string;
    }
}

interface ForecastPeriod {
    name?: string;
    temperature?: number;
    temperatureUnit?: string;
    windSpeed?: string;
    windDirection ?: string;
    shortForecast?: string;
}

interface AlertsResponse {
    features: AlertFeature[];
}

interface PointsResponse {
    properties: {
        forecast?: string;
    };
}

interface ForecastResponse {
    properties: {
        periods: ForecastPeriod[];
    };
}

function formatAlert(feature: AlertFeature): string {
    const { properties } = feature;

    return [
        `Event: ${properties.event || "Unknown"}`,
        `Area: ${properties.areaDesc || "Unknown"}`,
        `Severity: ${properties.severity || "Unknown"}`,
        `Status: ${properties.status || "Unknown"}`,
        `Headline: ${properties.headline || "No headline"}`,
        "---"
    ].join("\n");
}

const server = new McpServer({
    "name": "weather",
    "version": "1.0.0"
});

