# Weather API with Redis Caching and Rate-Limiting

This project is a weather API that fetches real-time weather data from a third-party weather service (Visual Crossing) and caches it using Redis to optimize performance and reduce the number of API calls. The API is built using **Node.js**, **Express**, and **TypeScript** with **Redis** integrated via Docker for caching.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Redis Caching](#redis-caching)
- [Error Handling](#error-handling)
- [Challenges Faced](#challenges-faced)

## Project Overview

The purpose of this project is to:
- Build a weather API that fetches data from a third-party API (Visual Crossing).
- Implement in-memory caching using **Redis** to store weather data and reduce redundant API calls.
- Use Docker for Redis containerization and easy environment setup.
- Also implemente rate-limiting feature for smooth api usage

### Why Caching?

Third-party APIs often come with rate limits, and making frequent requests can result in blocked access. To avoid excessive API calls and reduce response time, we cache weather data for a specified time (e.g., 1 hour) using Redis. If the requested data is already cached, it will be served from the cache, improving the API's efficiency.
![Caching concept](https://assets.roadmap.sh/guest/weather-api-f8i1q.png)

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building RESTful APIs.
- **TypeScript**: Strongly typed superset of JavaScript.
- **Redis**: In-memory key-value store for caching.
- **Docker**: For running Redis in a containerized environment.

## Setup and Installation

### Prerequisites

- **Node.js** installed (v14.x or above).
- **Docker** installed for running Redis.
- Visual Crossing API key for fetching weather data.

### Steps to Run the Project

##### Clone the Repository

   ```bash
   git clone https://github.com/your-username/weather-api.git
   cd weather-api
   ```
##### Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```
##### Set Up Environment Variables

Create a .env file in the root directory with the following values:

```bash
WEATHER_API_KEY=your-visual-crossing-api-key
REDIS_URL=redis://localhost:6379
```
##### Set Up Redis with Docker

Start a Redis container using Docker:

```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
docker exec -it <continer name> bash
redis-cli
```

##### Once everything is set up, you can start the server:

```bash
npx ts-node src/app.ts
```
The server will be running at http://localhost:8080

##### API Endpoints
GET api/weather/<city name>
Fetches the current weather data for the specified city. For example:

```bash
http://localhost:3000/weather/London
```
### Redis Caching
The weather data fetched from Visual Crossing is cached in Redis to improve performance and reduce the number of requests made to the external API. Redis stores the data for 1 hour, after which the cache expires, and fresh data is fetched from the API.

#### Redis Cache Flow:
- Check Cache: When a request is made, the app first checks if the data for that city is already in the cache.
- Serve from Cache: If cached data exists, it’s returned to the user.
- Fetch Fresh Data: If no cached data is found, a request is made to the external API, and the fresh data is cached for future use.

### Error Handling
- Invalid City Name: If the city name is invalid or misspelled, the API returns an appropriate error message.
- API Failure: If the external API fails (e.g., rate limits, downtime), an internal server error (500) is returned with a message.
- Redis Failure: If Redis is down or not reachable, the app continues to fetch data from the external API and logs the error.

### Challenges Faced
##### 1. Redis Integration:
Initially, I faced challenges with integrating Redis, as there were issues with connection and handling caching in an efficient manner. Switching to ioredis solved some of the problems, providing a more robust API for Redis integration.

##### 2. TypeScript Types:
TypeScript helped catch a lot of bugs early, but managing complex types, especially with third-party libraries (like axios and ioredis), was tricky. The key was to define the expected response types for better type safety.

##### 3. Handling ERR_HTTP_HEADERS_SENT Error:
During the implementation, I encountered the infamous "Cannot set headers after they are sent to the client" error. This was caused by multiple responses being sent due to missing return statements after sending cached or fresh data. I resolved this by ensuring that a response is sent only once in all cases using proper control flow.

##### 4. API Rate Limits:
To avoid hitting the rate limits of the weather API, I implemented caching with Redis to store the weather data for a specified period, reducing the number of redundant requests to the external API.

[View the project on roadmap.sh](https://roadmap.sh/projects/weather-api-wrapper-service)