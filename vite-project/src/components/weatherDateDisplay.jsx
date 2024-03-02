import PropTypes from "prop-types";
import moment from "moment";

function WeatherDateDisplay({ timestamp }) {
  const date = moment(timestamp * 1000).format("MMMM Do YYYY, h:mm:ss a");

  return <span className="date">{date}</span>;
  
}

WeatherDateDisplay.propTypes = {
  timestamp: PropTypes.number.isRequired,
};

export default WeatherDateDisplay;
