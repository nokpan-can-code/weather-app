import React, { useState, useEffect } from 'react';
import { MainWrapper } from './styles.module';
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity, WiBarometer } from "react-icons/wi";
import { FiSun, FiMoon, FiAlertCircle, FiLock, FiMapPin, FiWifiOff } from "react-icons/fi";
import { FaWind, FaThermometerHalf } from "react-icons/fa";
import { 
    BsFillSunFill, 
    BsCloudyFill, 
    BsFillCloudRainFill, 
    BsCloudFog2Fill, 
    BsCloudFill, 
    BsSnow 
} from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from 'axios';

interface WeatherDataProps {
    name: string;
    main: {
        temp: number;
        humidity: number;
        feels_like: number;
        pressure: number;
    };
    sys: {
        country: string;
    };
    weather: {
        main: string;
    }[];
    wind: {
        speed: number;
    };
}

interface ErrorStateProps {
    status: number | null;
    title: string;
    description: string;
    troubleshooting: string[];
}

const CACHE_PREFIX = "skyline-weather-";
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes in milliseconds

const DisplayWeather = () => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const api_Endpoint = process.env.REACT_APP_WEATHER_API_URL;

    const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchCity, setSearchCity] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");
    
    // Structured error state for premium error panel
    const [errorDetails, setErrorDetails] = useState<ErrorStateProps | null>(null);

    // Modern feature additions: Unit toggling & Dark Mode
    const [isCelsius, setIsCelsius] = useState<boolean>(true);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem('skyline-theme');
        return savedTheme ? savedTheme === 'dark' : false;
    });

    // Sync theme selection to local storage
    useEffect(() => {
        localStorage.setItem('skyline-theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    // --- Caching Utilities ---
    const getCachedData = (key: string): any | null => {
        try {
            const cached = localStorage.getItem(CACHE_PREFIX + key);
            if (!cached) return null;
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_TTL) {
                return data; // Cache Hit
            }
            localStorage.removeItem(CACHE_PREFIX + key); // Stale cache cleanup
        } catch (err) {
            console.error("Cache read error", err);
        }
        return null;
    };

    const setCachedData = (key: string, data: any) => {
        try {
            const payload = { data, timestamp: Date.now() };
            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
        } catch (err) {
            console.error("Cache write error", err);
        }
    };

    const fetchCurrentWeather = async (lat: number, lon: number) => {
        const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    };

    const fetchWeatherData = async (city: string) => {
        const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    };

    // --- Error Parser ---
    const handleFetchError = (error: any, queriedCity?: string) => {
        const status = error.response ? error.response.status : null;
        
        if (status === 429) {
            setErrorDetails({
                status: 429,
                title: "Rate Limit Exceeded",
                description: "We've reached OpenWeatherMap's free-tier rate threshold (60 calls/min). Submissions are temporarily paused, but cached queries resolve instantly!",
                troubleshooting: [
                    "Wait 60 seconds before executing new location searches.",
                    "Click on previously queried cities (like the preset tags below) to immediately view their cached results.",
                    "Ensure no background loops are triggering duplicate re-renders."
                ]
            });
        } else if (status === 401) {
            setErrorDetails({
                status: 401,
                title: "Authentication Failed",
                description: "The remote database rejected the connection key. This points to an unauthorized or recently initialized API key.",
                troubleshooting: [
                    "Check your project's local .env file variables to ensure REACT_APP_WEATHER_API_KEY holds a valid key.",
                    "If the key is newly generated, OpenWeatherMap requires up to 2 hours for global key activation.",
                    "Verify there are no quotation marks or spaces around the key values inside .env."
                ]
            });
        } else if (status === 404) {
            setErrorDetails({
                status: 404,
                title: "Location Unrecognized",
                description: `We couldn't locate any meteorological readings for "${queriedCity || searchCity || 'Unknown'}".`,
                troubleshooting: [
                    "Double-check your spelling (e.g. use 'New York' instead of 'NewYork').",
                    "Add country or region codes separated by a comma (e.g. 'Paris, FR' or 'London, UK').",
                    "Avoid typing administrative numbers, spaces, or special characters."
                ]
            });
        } else {
            setErrorDetails({
                status: null,
                title: "Database Offline",
                description: "An unexpected network or gateway timeout occurred while establishing an API link.",
                troubleshooting: [
                    "Verify your device has a stable active internet connection.",
                    "Check if an active firewall or network security blocker is restricting HTTPS traffic.",
                    "Retry the search again after a brief moment."
                ]
            });
        }
    };

    const handleSearch = async () => {
        const query = searchCity.trim().toLowerCase();
        if (query === "") return;
        setIsLoading(true);
        setErrorMsg("");
        setErrorDetails(null);

        const cacheKey = `city-${query}`;
        const cached = getCachedData(cacheKey);
        if (cached) {
            setWeatherData(cached);
            setIsLoading(false);
            return;
        }

        try {
            const currentSearchResults = await fetchWeatherData(searchCity);
            setWeatherData(currentSearchResults);
            setCachedData(cacheKey, currentSearchResults);
        } catch (error: any) {
            console.error("No weather data found", error);
            handleFetchError(error, searchCity);
            setWeatherData(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Quick presets handler (incorporates cache checking)
    const handlePresetSearch = async (city: string) => {
        const query = city.trim().toLowerCase();
        setSearchCity(city);
        setIsLoading(true);
        setErrorMsg("");
        setErrorDetails(null);

        const cacheKey = `city-${query}`;
        const cached = getCachedData(cacheKey);
        if (cached) {
            setWeatherData(cached);
            setIsLoading(false);
            return;
        }

        try {
            const data = await fetchWeatherData(city);
            setWeatherData(data);
            setCachedData(cacheKey, data);
        } catch (error: any) {
            console.error("Preset search failed", error);
            handleFetchError(error, city);
            setWeatherData(null);
        } finally {
            setIsLoading(false);
        }
    };

    const formatTemp = (tempCelsius: number) => {
        if (isCelsius) {
            return Math.round(tempCelsius);
        }
        return Math.round((tempCelsius * 9) / 5 + 32);
    };

    const getWeatherClass = (weatherMain: string | undefined): string => {
        if (!weatherMain) return 'default';
        const main = weatherMain.toLowerCase();
        if (main === 'clear') return 'clear';
        if (main === 'clouds') return 'clouds';
        if (['rain', 'drizzle', 'thunderstorm'].includes(main)) return 'rain';
        if (main === 'snow') return 'snow';
        if (['mist', 'fog', 'haze', 'smoke', 'dust', 'sand', 'ash', 'squall', 'tornado'].includes(main)) return 'mist';
        return 'default';
    };

    const iconChanger = (weather: string) => {
        let iconElement: React.ReactNode;
        let iconColor: string;
        let iconClass: string = "weatherIconSpan";

        switch (weather) {
            case "Rain":
            case "Drizzle":
            case "Thunderstorm":
                iconElement = <BsFillCloudRainFill />;
                iconColor = "#3B82F6";
                iconClass += " rainy";
                break;
            case "Clear":
                iconElement = <BsFillSunFill />;
                iconColor = "#F59E0B";
                iconClass += " sunny";
                break;
            case "Clouds":
                iconElement = <BsCloudFill />;
                iconColor = isDarkMode ? "#94A3B8" : "#64748B";
                iconClass += " cloudy";
                break;
            case "Mist":
            case "Fog":
            case "Haze":
                iconElement = <BsCloudFog2Fill />;
                iconColor = isDarkMode ? "#A1A1AA" : "#6B7280";
                iconClass += " cloudy";
                break;
            case "Snow":
                iconElement = <BsSnow />;
                iconColor = "#06B6D4";
                iconClass += " rainy";
                break;
            default:
                iconElement = <TiWeatherPartlySunny />;
                iconColor = "#F97316";
                iconClass += " sunny";
        }

        return (
            <span className={iconClass} style={{ color: iconColor }}>
                {iconElement}
            </span>
        );
    };

    // Geolocation trigger on mount with double-fire protection
    useEffect(() => {
        let isMounted = true;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                if (!isMounted) return;
                const { latitude, longitude } = position.coords;
                setIsLoading(true);
                setErrorMsg("");
                setErrorDetails(null);

                // Rounding decimals slightly manages tiny GPS drift to hit cache
                const cacheKey = `coords-${latitude.toFixed(2)}-${longitude.toFixed(2)}`;
                const cached = getCachedData(cacheKey);
                if (cached) {
                    setWeatherData(cached);
                    setIsLoading(false);
                    return;
                }

                try {
                    const currentWeather = await fetchCurrentWeather(latitude, longitude);
                    if (isMounted) {
                        setWeatherData(currentWeather);
                        setCachedData(cacheKey, currentWeather);
                    }
                } catch (error: any) {
                    console.error("Geolocation weather fetch error", error);
                    if (isMounted) {
                        handleFetchError(error);
                    }
                } finally {
                    if (isMounted) {
                        setIsLoading(false);
                    }
                }
            },
            (error) => {
                console.error("Geolocation retrieval error:", error);
                if (isMounted) {
                    // Trigger London as default preset on initial geolocation reject
                    handlePresetSearch("London");
                }
            }
        );

        return () => {
            isMounted = false; // Lifecycle unmount flag
        };
    }, []);

    const weatherClass = getWeatherClass(weatherData?.weather[0].main);

    return (
        <MainWrapper className={`${isDarkMode ? 'dark-mode' : 'light-mode'} weather-${weatherClass}`}>
            <div className="container">
                {/* Header Controls (Theme and Unit Switching) */}
                <div className="headerControls">
                    <button 
                        className="themeToggleBtn" 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        aria-label="Toggle visual theme"
                    >
                        {isDarkMode ? <FiSun /> : <FiMoon />}
                    </button>
                    <div className="unitToggleContainer">
                        <button 
                            className={`unitBtn ${isCelsius ? 'active' : ''}`} 
                            onClick={() => setIsCelsius(true)}
                        >
                            °C
                        </button>
                        <button 
                            className={`unitBtn ${!isCelsius ? 'active' : ''}`} 
                            onClick={() => setIsCelsius(false)}
                        >
                            °F
                        </button>
                    </div>
                </div>

                {/* Input Search Field */}
                <div className="searchArea">
                    <div className="inputWrapper">
                        <AiOutlineSearch className='searchIcon' size={20} />
                        <input
                            type='text'
                            placeholder='Search city name...'
                            value={searchCity}
                            onChange={(e) => setSearchCity(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSearch();
                            }}
                        />
                    </div>
                    <button className="searchButton" onClick={handleSearch}>
                        Search
                    </button>
                </div>

                {/* Preset Fast Search Pills */}
                <div className="presetsArea">
                    {['Tokyo', 'London', 'New York', 'Paris'].map((city) => (
                        <button 
                            key={city} 
                            className="presetBtn" 
                            onClick={() => handlePresetSearch(city)}
                        >
                            {city}
                        </button>
                    ))}
                </div>

                {isLoading ? (
                    <div className="loading">
                        <BiLoaderCircle className='loader' size={42} />
                        <h2>Retrieving Forecast...</h2>
                    </div>
                ) : errorDetails ? (
                    /* Redesigned High-Fidelity Error Status Panel */
                    <div className={`errorArea error-${errorDetails.status || 'offline'}`}>
                        <div className="errorHeaderRow">
                            <div className="errorHeaderIcon">
                                {errorDetails.status === 429 ? (
                                    <FiAlertCircle size={24} />
                                ) : errorDetails.status === 401 ? (
                                    <FiLock size={24} />
                                ) : errorDetails.status === 404 ? (
                                    <FiMapPin size={24} />
                                ) : (
                                    <FiWifiOff size={24} />
                                )}
                            </div>
                            <h2>{errorDetails.title}</h2>
                        </div>
                        <p className="errorMsgText">{errorDetails.description}</p>
                        <div className="errorDivider" />
                        <span className="troubleLabel">Suggested Solutions:</span>
                        <ul className="troubleList">
                            {errorDetails.troubleshooting.map((item, idx) => (
                                <li key={idx} className="troubleItem">{item}</li>
                            ))}
                        </ul>
                        <button 
                            className="errorResetBtn" 
                            onClick={() => {
                                setErrorDetails(null);
                                handlePresetSearch("London");
                            }}
                        >
                            Reset & Load London
                        </button>
                    </div>
                ) : weatherData ? (
                    <>
                        {/* Primary Weather Information */}
                        <div className="weatherArea">
                            <div className="locationHeader">
                                <h1 className="cityName">{weatherData.name}</h1>
                                <span className="countryBadge">{weatherData.sys.country}</span>
                            </div>
                            <div className="iconContainer">
                                {iconChanger(weatherData.weather[0].main)}
                            </div>
                            <div className="tempContainer">
                                <h1 className="temperature">
                                    {formatTemp(weatherData.main.temp)}
                                    <span className="tempUnit">{isCelsius ? '°C' : '°F'}</span>
                                </h1>
                                <h2 className="weatherDesc">{weatherData.weather[0].main}</h2>
                            </div>
                        </div>

                        {/* Modern Grid of Expanded Weather Metrics */}
                        <div className="weatherGrid">
                            <div className="gridItem">
                                <WiHumidity className='gridIcon humidity' />
                                <div className="itemInfo">
                                    <span className="label">Humidity</span>
                                    <span className="value">{weatherData.main.humidity}%</span>
                                </div>
                            </div>

                            <div className="gridItem">
                                <FaWind className='gridIcon wind' />
                                <div className="itemInfo">
                                    <span className="label">Wind Speed</span>
                                    <span className="value">{weatherData.wind.speed} km/h</span>
                                </div>
                            </div>

                            <div className="gridItem">
                                <FaThermometerHalf className='gridIcon feelsLike' />
                                <div className="itemInfo">
                                    <span className="label">Feels Like</span>
                                    <span className="value">{formatTemp(weatherData.main.feels_like)}{isCelsius ? '°C' : '°F'}</span>
                                </div>
                            </div>

                            <div className="gridItem">
                                <WiBarometer className='gridIcon pressure' />
                                <div className="itemInfo">
                                    <span className="label">Air Pressure</span>
                                    <span className="value">{weatherData.main.pressure} hPa</span>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="noData">
                        <h2>No Weather Data Found</h2>
                    </div>
                )}
            </div>
        </MainWrapper>
    );
};

export default DisplayWeather;
