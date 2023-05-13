import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface WeatherState {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
  isLoading: boolean;
  isError: boolean;
  isUserLocation: boolean;
  units: string;
}

const initialState: WeatherState = {
  coord: {
    lon: 0,
    lat: 0,
  },
  weather: [],
  base: "",
  main: {
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    pressure: 0,
    humidity: 0,
    sea_level: 0,
    grnd_level: 0,
  },
  visibility: 0,
  wind: {
    speed: 0,
    deg: 0,
    gust: 0,
  },
  clouds: {
    all: 0,
  },
  dt: 0,
  sys: {
    type: 0,
    id: 0,
    country: "",
    sunrise: 0,
    sunset: 0,
  },
  timezone: 0,
  id: 0,
  name: "",
  cod: 0,
  isLoading: false,
  isError: false,
  isUserLocation: false,
  units: "metric",
};

export const fetchWeatherByLocationName = createAsyncThunk(
  "weather/fetchData",
  async ({ city, units = "metric" }: { city: string; units?: string }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
    );
    return { ...response.data, isUserLocation: false, units: units };
  }
);
export const fetchWeatherByGeolocation = createAsyncThunk(
  "weather/fetchGeolocationData",
  async ({ latitude, longitude }: { latitude: string; longitude: string }) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=metric`
    );
    return { ...response.data, isUserLocation: true, units: "metric" };
  }
);

const updateWeatherState = (
  state: WeatherState,
  action: PayloadAction<any>
) => {
  state.coord = action.payload.coord;
  state.weather = action.payload.weather;
  state.base = action.payload.base;
  state.main = action.payload.main;
  state.visibility = action.payload.visibility;
  state.wind = action.payload.wind;
  state.clouds = action.payload.clouds;
  state.dt = action.payload.dt;
  state.sys = action.payload.sys;
  state.timezone = action.payload.timezone;
  state.id = action.payload.id;
  state.name = action.payload.name;
  state.cod = action.payload.cod;
  state.isLoading = false;
  state.isError = false;
  state.isUserLocation = action.payload.isUserLocation;
  state.units = action.payload.units;
};

const watherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setLoadingState: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByLocationName.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchWeatherByLocationName.fulfilled, (state, action) => {
        updateWeatherState(state, action);
      })
      .addCase(fetchWeatherByLocationName.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(fetchWeatherByGeolocation.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchWeatherByGeolocation.fulfilled, (state, action) => {
        updateWeatherState(state, action);
      })
      .addCase(fetchWeatherByGeolocation.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { setLoadingState } = watherSlice.actions;

export default watherSlice.reducer;
