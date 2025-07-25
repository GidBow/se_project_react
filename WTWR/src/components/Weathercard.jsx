import sunny from "../assets/sunny.svg";
import "../blocks/weathercard.css";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__info">75&deg; F</p>
      <img src={sunny} alt="sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
