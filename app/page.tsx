"use client";
import { SearchForm } from "@/components/searchForm/SearchForm";
import styles from "./Home.module.scss";
import { UserLocation } from "@/components/userLocation/UserLocation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWeatherByLocationName,
  setLoadingState,
} from "@/redux/features/weather";
import { AppDispatch, RootState } from "@/redux/store";
import { Forecast } from "@/components/forecast/Forecast";
import useWeatherBackground from "@/hooks/useWeatherBackground";
import { useAppSelector } from "@/redux/hooks";
import { Status } from "@/components/status";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUnit = useAppSelector((state) => state.weatherReducer.units);
  const weatherData = useSelector((state: RootState) => state.weatherReducer);
  const weatherType = weatherData?.weather[0]?.main.toLowerCase();
  const backgroundImage = useWeatherBackground(weatherType);

  const isLoading = useSelector(
    (state: RootState) => state.weatherReducer.isLoading
  );

  const isError = useSelector(
    (state: RootState) => state.weatherReducer.isError
  );

  function fetchWeatherData(city: string) {
    dispatch(fetchWeatherByLocationName({ city: city, units: selectedUnit }));
  }

  function handleFormSubmit(location: string) {
    if (location.length) {
      dispatch(setLoadingState(true));
      fetchWeatherData(location);
    }
  }

  return (
    <main
      className={styles.main}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className={styles["weather-card"]}>
        <h1 className={styles["weather-card__title"]}> World Weather </h1>

        <UserLocation
          isWeatherDataVisible={weatherData?.name?.length > 0}
          isLoading={isLoading}
        />

        <SearchForm onFormSubmit={handleFormSubmit} />

        {(isLoading || isError) && (
          <Status isLoading={isLoading} isError={isError} />
        )}

        {weatherData?.name && !isLoading && !isError ? (
          <Forecast weatherData={weatherData} />
        ) : null}
      </div>
    </main>
  );
}
