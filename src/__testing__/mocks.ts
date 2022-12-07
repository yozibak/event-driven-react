import { PlantStore } from "../store/plant"
import { SoilStore } from "../store/soil"
import { Weather, WeatherStore } from "../store/weather"

export const MockPlantStore: PlantStore = {
  height: 0,
  grow: jest.fn(),
  die: jest.fn(),
}

export const MockSoilStore: SoilStore = {
  moisture: 0,
  isMoisted: false,
  dry: jest.fn(),
  water: jest.fn()
}

export const MockWeatherStore: WeatherStore = {
  currentWeather: Weather.cloudy,
  changeWeather: jest.fn()
}