import { useEffect, useState } from "react";
import styles from "./UserLocation.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchWeatherByGeolocation } from "@/redux/features/weather";
import { setLoadingState } from "@/redux/features/weather";
import { BsInfoCircle } from "react-icons/bs";

interface Props {
  isWeatherDataVisible: boolean;
  isLoading: boolean;
}

export function UserLocation({ isWeatherDataVisible, isLoading }: Props) {
  const [hasGeolocationAccess, setHasGeolocationAccess] =
    useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  function checkGeolocationPermission() {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      // check for google chrome & firefox permissions
      if (result.state === "denied" || result.state === "prompt") {
        setHasGeolocationAccess(false);
      } else {
        setHasGeolocationAccess(true);
      }

      result.onchange = () => {
        if (result.state === "denied" || result.state === "prompt") {
          setHasGeolocationAccess(false);
        } else {
          setHasGeolocationAccess(true);
        }
      };
    });
  }

  useEffect(() => {
    handleGetLocation();
  }, []);

  function handleGetLocation() {
    if (navigator.geolocation && !isWeatherDataVisible) {
      navigator.geolocation.getCurrentPosition(success, error);
      checkGeolocationPermission();
    }
  }

  const success = (position: GeolocationPosition) => {
    if (isWeatherDataVisible) return;
    try {
      const latitude = position?.coords.latitude.toString();
      const longitude = position?.coords.longitude.toString();
      dispatch(fetchWeatherByGeolocation({ latitude, longitude }));
      dispatch(setLoadingState(true));
      setHasGeolocationAccess(true);
    } catch (err) {
      console.error(err);
    }
  };

  function error() {
    dispatch(setLoadingState(false));
  }

  if (isLoading || isWeatherDataVisible) return null;

  return (
    <div className="text-center">
      {hasGeolocationAccess ? (
        <button className="btn" onClick={handleGetLocation}>
          Get my location forecast
        </button>
      ) : (
        <div className={styles["info-board"]}>
          <BsInfoCircle />
          Please allow us to access your browsers geo-location, to get forecast
          for you, or enter location name in the search field
        </div>
      )}
    </div>
  );
}
