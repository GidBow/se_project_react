import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherAPI";
import { coordinates, APIkey } from "../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import { getItems, addItems, deleteItem } from "../utils/api";

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
  const [clothingItems, setClothingItems] = useState([]);

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

  const handleDeleteClick = (card) => {
    setActiveModal("delete");
    setSelectedCard(card);
  };

  const onDeleteItemHandler = (itemID) => {
    deleteItem(itemID)
      .then(() => {
        const filteredArray = clothingItems.filter((item) => {
          return item.id !== itemID;
        });
        setClothingItems(filteredArray);
        closeModal();
      })
      .catch(console.error);
  };

  const onAddItems = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };
    addItems(newCardData)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        closeModal();
      })
      .catch(console.error);
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

    getItems()
      .then((data) => {
        setClothingItems(data);
        clothingItems.reverse();
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
              element={
                <Profile
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  clothingItems={clothingItems}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          activeModal={activeModal}
          isOpen={activeModal === "add-garment"}
          onClose={closeModal}
          onAddItem={onAddItems}
        />
        <ItemModal
          isOpen={activeModal === "preview"}
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeModal}
          onDeleteItemHandler={onDeleteItemHandler}
          handleDeleteClick={handleDeleteClick}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
