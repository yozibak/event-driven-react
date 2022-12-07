import { useEffect, useState } from "react"
import { ClockStore } from "../store/clock"
import { SoilStore } from "../store/soil"
import { Weather, WeatherStore } from "../store/weather"

export enum PlantEvent {
  Grow,
  Water,
  Dry,
  Die,
  Idle,
}

export interface AppEvent {
  timestamp: ClockStore['time']
  plantEvent: PlantEvent
}

export const useEvent = (
  time: ClockStore['time'],
  isMoisted: SoilStore['isMoisted'],
  weather: WeatherStore
) => {

  const [event, setEvent] = useState<AppEvent>({timestamp: time, plantEvent: PlantEvent.Idle})

  const { currentWeather, changeWeather } = weather

  useEffect(() => {
    changeWeather()
  }, [time, changeWeather])

  useEffect(() => {
    if (time === event.timestamp) return 
    const evt = eventEmit(isMoisted, currentWeather)
    setEvent(
      {timestamp: time, plantEvent: evt}
    )
  }, [isMoisted, currentWeather, event.timestamp, time])

  return event
}

export const eventEmit = (
  isMoisted: SoilStore['isMoisted'],
  currentWeather: WeatherStore['currentWeather']
):PlantEvent => {
  switch (currentWeather) {
    case Weather.sunny:
      return isMoisted 
        ? PlantEvent.Grow
        : PlantEvent.Die
    case Weather.rainy:
      return PlantEvent.Water
    case Weather.cloudy:
    default:
      return PlantEvent.Dry
  }
}