import { useState, useEffect} from 'react'
import { Card, Icon } from "semantic-ui-react";
import axios from "axios";
import cloudy from "../Assets/cloudy.png";
import WeatherDateDisplay from './weatherDateDisplay';
import WeatherCard from './weatherCard';

function WeatherIndex (){
    const megaCities =[
        "London",
        "New Work",
        "Paris",
        "Tokiyo",
        "Dubai"
    ];
    const [megaCitiesWeather, setMegaCitiesWeather] = useState([]);
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const API_KEY = import.meta.env.REACT_APP_API_KEY;

    useEffect(() => {
        const FeatchingMegaCities = async () => {
            const promises = megaCities.map(async (city) => {
                const url = `https://http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`;

                const res = await fetch(url);
                return await res.json();
            });
            const results = await Promise.all(promises);
            setMegaCitiesWeather(results)
        };
        FeatchingMegaCities();
        
    }, []);

    const fetchWeather = async () => {
        try {
            const response = await axios.get(`https://http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);

            const iconCode = response.data.weather[0].icon;

            const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

            setWeather({ ...response.data, iconUrl });
            setError(null);
        
        } catch(err){
            setWeather(null);
            setError("City is not found");
        }
    };

    const handleClear = () => {
        setCity("");
        setWeather(null);
        setError("");
      };


    return(
        <div className="container">
            <div className="search-wrapper">
                <div className="top-seaction">
                    <img src={cloudy} alt="Weather image" />
                    <h1>WEATHER APP</h1>
                </div>
                <div className="input-section">
                    <input type="text" placeholder="Enter City Name" value={city} onChange={(e) => setCity(e.target.value)} />
                    <button onClick={fetchWeather}>Get Weather</button>  
                    <button onClick={handleClear}>Clear</button>                  
                </div>

            </div>

            {weather && (
                <Card>
                    <Card.Content>
                        <Card.Header>
                            <img src={weather.iconUrl} alt="" />
                            <p>
                                {weather.name},{weather.sys.country}
                            </p>
                        </Card.Header>
                        <Card.Meta>
                            <p>
                                <WeatherDateDisplay timestamp={weather.dt} />
                            </p>
                        </Card.Meta>
                        <Card.Description>
                            <p>
                            {weather.weather[0].main} - {weather.weather[0].description}
                            </p>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <p>
                            <Icon name="thermometer" />
                            {weather.main.temp - 273.15} &deg;C
                        </p>
                    </Card.Content>
                </Card>
            )}
            {error && <p>{error}</p>}

            <div className='mega-cities-container'>
                {megaCitiesWeather.map((data) =>(
                    <WeatherCard key={data.id} data={data}  />
                ))}

            </div>
            
        </div>

    )
}
  

export default WeatherIndex