import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherAPI";
import { coordinates, APIkey } from "../utils/constants";
import { defaultClothingItems } from "../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    //for API call fetch func
    //.then(data=>{})...  all this stuff below

    const newCardData = {
      name: inputValues.name,
      link: inputValues.link,
      weather: inputValues.weather,
    };
    //dont use newCardData with API
    //the ID will be included in res data
    setClothingItems([...clothingItems, newCardData]);
    closeModal();
  };

  const closeModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={<Profile onCardClick={handleCardClick} />}
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          activeModal={activeModal}
          isOpen={activeModal === "add-garment"}
          onClose={closeModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          activeModal={activeModal}
          card={selectedCard}
          handleCloseClick={closeModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
