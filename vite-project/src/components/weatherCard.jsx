import PropTypes from "prop-types";
import { Card, Icon, Image } from "semantic-ui-react";
import WeatherDateDisplay from "./DateDisplay";
import { useState } from "react";

const WeatherCard = ({ data }) => {
  const [ name, main, weather, sys, dt ] = data;
  const [isHovered, setIsHovered] = useState(false);

  const iconUrl = `http://openweathermap.org/img/w/${weather[0].icon}.png`;

  const cardStyle = {
    backgroundColor: "#1e90ff",
    borderRadius: "1.4em",
    boxShadow: "5px 5px 10px #1e90ff",
    transition: "all 0.5s ease-in-out",
  };

  const cardHoverStyle = {
    backgroundColor: "#f3f3f3",
  };

  const CardHeader = {
    color: "#f3f3f3",
  };

  const hoveredCardHeader = {
    color: "#1e90ff",
  };

  return (
    <Card style={{...cardStyle, ...(isHovered ? cardHoverStyle : {})}}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}>
      <Card.Content>
        <Card.Header style={{ ...CardHeader, ...(isHovered ? hoveredCardHeader : {}) }}>
          <Image src={iconUrl} wrapped ui={false} className="mega-city-img"/>  
          {name}, {sys.country}   
        </Card.Header>
        <Card.Meta>
          <WeatherDateDisplay timestamp={dt} />
        </Card.Meta>
        <Card.Description>
          {weather[0].main} - {weather[0].description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="thermometer" />
        {main.temp - 273.15} °C
      </Card.Content>
    </Card>
        
  );
}

WeatherCard.propTypes = {
  data: PropTypes.string.isRequired
}

export default WeatherCard
