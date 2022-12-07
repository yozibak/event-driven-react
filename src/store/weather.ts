import { useCallback, useState } from "react"

export type WeatherStore = ReturnType<typeof useWeather>

export enum Weather {
  sunny,
  rainy,
  cloudy
}

export const useWeather = () => {
  
  const [weather, setWeather] = useState<Weather>(Weather.cloudy)

  const changeWeather = useCallback(() => {
    const r = Math.ceil(Math.random() * 3)
    switch (r) {
      case 1:
        setWeather(Weather.rainy)
        break
      case 2:
        setWeather(Weather.cloudy)
        break
      case 3:
      default:
        setWeather(Weather.sunny)
        break
    }
  }, [])

  return {
    currentWeather: weather,
    changeWeather
  }
}