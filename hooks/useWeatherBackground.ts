import { useEffect, useState } from "react";

type WeatherType =
  | "clear"
  | "clouds"
  | "rain"
  | "mist"
  | "thunderstorm"
  | "snow"
  | string;

const weatherBackgrounds: Record<WeatherType, string> = {
  clear: "/static/images/clear-sky.webp",
  clouds: "/static/images/clouds.webp",
  rain: "/static/images/rain.webp",
  mist: "/static/images/mist.webp",
  thunderstorm: "/static/images/thunderstorm.webp",
  snow: "/static/images/snow.webp",
};

function useWeatherBackground(weatherType: WeatherType): string | undefined {
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setBackgroundImage(weatherBackgrounds[weatherType]);
  }, [weatherType]);

  return backgroundImage?.length
    ? backgroundImage
    : "/static/images/night.webp";
}

export default useWeatherBackground;
