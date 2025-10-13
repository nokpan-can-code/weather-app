import React, { useState, useEffect } from 'react';
import { MainWrapper } from './styles.module';
import { AiOutlineSearch } from "react-icons/ai";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { BsFillSunFill, BsCloudyFill, BsFillCloudRainFill, BsCloudFog2Fill, BsCloudFill } from "react-icons/bs";
import { BiLoaderCircle } from "react-icons/bi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from 'axios';

interface WeatherDataProps {
    name: string;
    main: {
        temp: number;
        humidity: number;
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

const DisplayWeather = () => {
    const api_key = process.env.REACT_APP_WEATHER_API_KEY;
    const api_Endpoint = process.env.REACT_APP_WEATHER_API_URL;

const [weatherData, setWeatherData] = React.useState<WeatherDataProps | null >(null);
const [isLoading, setIsLoading] = React.useState<boolean>(false);
const [searchCity, setSearchCity] = React.useState<string>("");


    const fetchCurrentWeather = async (lat: number, lon: number) => {
        const url = `${api_Endpoint}weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        const response = await axios.get(url);
        return response.data;
    };

    const fetchWeatherData = async (city: string) => {
        try {
            const url = `${api_Endpoint}weather?q=${city}&appid=${api_key}&units=metric`;
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error("Error fetching weather data");
            throw error;
        }
    };

    const handleSearch = async () => {
        if (searchCity.trim() === "") return;
        setIsLoading(true);
        try {
            const currentSearchResults = await fetchWeatherData(searchCity);
            setWeatherData(currentSearchResults);
        } catch (error) {
            console.error("No weather data found");
        } finally {
            setIsLoading(false);
        }
    };

    const iconChanger = (weather: string) => {
        let iconElement: React.ReactNode;
        let iconColor: string;

        switch (weather) {
            case "Rain":
                iconElement = <BsFillCloudRainFill />;
                iconColor = "#3498db";
                break;
            case "Clear":
                iconElement = <BsFillSunFill />;
                iconColor = "#f1c40f";
                break;
            case "Clouds":
                iconElement = <BsCloudFill />;
                iconColor = "#95a5a6";
                break;
            case "Mist":
            case "Fog":
                iconElement = <BsCloudFog2Fill />;
                iconColor = "#7f8c8d";
                break;
            default:
                iconElement = <TiWeatherPartlySunny />;
                iconColor = "#e67e22";
        }

        return (
            <span className="icon" style={{ color: iconColor }}>
                {iconElement}
            </span>
        );
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const currentWeather = await fetchCurrentWeather(latitude, longitude);
                setWeatherData(currentWeather);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        });
    }, []);

    return (
        <MainWrapper>
            <div className="container">
                <div className="searchArea">
                    <input
                        type='text'
                        placeholder='enter city name'
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                    />
                    <div className="searchCircle">
                        <AiOutlineSearch className='searchIcon' onClick={handleSearch} size={24} />
                    </div>
                </div>

                {isLoading ? (
                    <div className="loading">
                        <BiLoaderCircle className='loader' size={48} />
                        <h2>Fetching Weather...</h2>
                    </div>
                ) : weatherData ? (
                    <>
                        <div className="weatherArea">
                            <h1>{weatherData.name}</h1>
                            <span>{weatherData.sys.country}</span>
                            <div className="icon">
                                {iconChanger(weatherData.weather[0].main)}
                            </div>
                            <h1>{weatherData.main.temp}°C</h1>
                            <h2>{weatherData.weather[0].main}</h2>
                        </div>

                        <div className="bottomInfoArea">
                            <div className="humidityLevel">
                                <WiHumidity className='windIcon' />
                                <div className="humidInfo">
                                    <h1>{weatherData.main.humidity}%</h1>
                                    <p>Humidity</p>
                                </div>
                            </div>

                            <div className="wind">
                                <FaWind className='windIcon' />
                                <div className="humidInfo">
                                    <h1>{weatherData.wind.speed} km/hr</h1>
                                    <p>Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <h2>No Weather Data Available</h2>
                )}
            </div>
        </MainWrapper>
    );
};

export default DisplayWeather;
