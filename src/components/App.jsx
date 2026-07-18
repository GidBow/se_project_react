import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ItemModal from "./ItemModal";
import { getWeather, filterWeatherData } from "../utils/weatherAPI";
import { defaultCoordinates, apiKey } from "../utils/constants";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "./AddItemModal";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import { getItems, addItems, deleteItem } from "../utils/api";
import { signIn, checkToken } from "../utils/auth";

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
  const [isUsingFallbackLocation, setIsUsingFallbackLocation] = useState(false);

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

  const handleLogin = ({ email, password }) => {
    signIn({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
        }
      })
      .catch(console.error);
  };

  const onDeleteItemHandler = (item_id) => {
    const token = localStorage.getItem("jwt");

    deleteItem(item_id, token)
      .then(() => {
        const filteredArray = clothingItems.filter((item) => {
          return item._id !== item_id;
        });
        setClothingItems(filteredArray);
        closeModal();
      })
      .catch(console.error);
  };

  const onAddItems = (inputValues) => {
    const token = localStorage.getItem("jwt");
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weather,
    };
    addItems(newCardData, token)
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
    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then(() => {
          // Token is valid; keep the session active.
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        });
    }
  }, []);

  useEffect(() => {
    // Use Geolocation API to get user's location. On success use that, otherwise fall back to defaultCoordinates.
    const handleWeatherForCoords = (coords) => {
      getWeather(coords, apiKey)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    };

    if (navigator && navigator.geolocation) {
      const geoOptions = {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60 * 1000,
      };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setIsUsingFallbackLocation(false);
          handleWeatherForCoords(coords);
        },
        (err) => {
          // If user denies or error occurs, fall back to default coordinates
          console.warn("Geolocation error, using default coordinates:", err);
          setIsUsingFallbackLocation(true);
          handleWeatherForCoords(defaultCoordinates);
        },
        geoOptions,
      );
    } else {
      // Geolocation not supported, use default
      setIsUsingFallbackLocation(true);
      handleWeatherForCoords(defaultCoordinates);
    }

    getItems()
      .then((data) => {
        setClothingItems([...data].reverse());
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
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            isUsingFallbackLocation={isUsingFallbackLocation}
          />
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
                <ProtectedRoute>
                  <Profile
                    onCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    clothingItems={clothingItems}
                  />
                </ProtectedRoute>
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
