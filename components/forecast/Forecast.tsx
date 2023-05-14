import {
  WeatherState,
  fetchWeatherByLocationName,
} from "@/redux/features/weather";
import styles from "./Forecast.module.scss";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/hooks";
interface Props {
  weatherData: WeatherState;
}

export function Forecast({ weatherData }: Props) {
  const selectedUnit = useAppSelector((state) => state.weatherReducer.units);
  const dispatch = useDispatch<AppDispatch>();

  function fetchWeatherData() {
    const newUnit = selectedUnit === "metric" ? "imperial" : "metric";
    try {
      dispatch(
        fetchWeatherByLocationName({
          city: weatherData?.name,
          units: newUnit,
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.forecast}>
      <div className={styles["forecast__location-name"]}>
        {weatherData?.name}
        {weatherData?.isUserLocation && <div>Your Location</div>}
      </div>

      <div className={styles["forecast__info-holder"]}>
        <div className={styles["forecast__main-temp"]}>
          {Math.round(weatherData?.main?.temp)}
          <sup>{selectedUnit === "metric" ? "°C" : "°F"}</sup>
          <button
            className={styles["forecast__unit-switcher"]}
            onClick={fetchWeatherData}
          >
            <div>{selectedUnit !== "metric" ? "°C" : "°F"}</div>
            <p>switch</p>
          </button>
          <div className={styles["forecast__feels-like"]}>
            Feels Like: {Math.round(weatherData?.main?.feels_like)}
            {selectedUnit === "metric" ? "°C" : "°F"}
          </div>
        </div>
        <div className={styles["forecast__condition"]}>
          <Image
            src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
            alt="weather icon"
            width={80}
            height={80}
            priority
          />
          <div className={styles["forecast__condition__in"]}>
            <div> {weatherData?.weather[0]?.main} </div>
            {weatherData?.weather[0]?.description}
          </div>
        </div>
        <div className={styles["forecast__other-specs"]}>
          Humidity: {weatherData?.main.humidity} %
        </div>
        {weatherData?.main.sea_level && (
          <div className={styles["forecast__other-specs"]}>
            Sea Level: {weatherData?.main.sea_level} hPa
          </div>
        )}
        <div className={styles["forecast__other-specs"]}>
          Wind Speed: {weatherData?.wind.speed} m/s
        </div>

        {weatherData?.visibility && (
          <div className={styles["forecast__other-specs"]}>
            Visibility: {weatherData?.visibility} m
          </div>
        )}
      </div>
    </div>
  );
}
