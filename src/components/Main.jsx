import { useContext } from "react";
import Weathercard from "./Weathercard";
import ItemCard from "./ItemCard";
import "../vendor/fonts.css";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ weatherData, handleCardClick, onCardLike, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const { isLoggedIn } = useContext(CurrentUserContext);
  return (
    <main>
      <Weathercard weatherData={weatherData} />
      {isLoggedIn && (
        <section className="cards">
          <p className="cards__text">
            Today is {weatherData.temp[currentTemperatureUnit]}&deg;
            {currentTemperatureUnit} / You may want to wear:
          </p>
          <ul className="cards__list">
            {clothingItems
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                    onCardLike={onCardLike}
                  />
                );
              })}
          </ul>
        </section>
      )}
    </main>
  );
}

export default Main;
