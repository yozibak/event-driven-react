import { useContext } from "react"
import { AppContext } from "../App"
import { Weather } from "../store/weather"

export const Plant = () => {
  return (
    <div className="plant-app">
      <PlantWeather />
      <PlantBody />
      <PlantSoil />
    </div>
  )
}

const PlantWeather = () => {
  const { weather } = useContext(AppContext)
  const name = Weather[weather]
  return (
    <div>
      <span className="material-symbols-outlined" id={name}>{name}</span>
    </div>
  )
}

const PlantBody = () => {
  const { height } = useContext(AppContext)
  return (
    <div className="plant-body">
      {
        Array(10).fill('').map(
          (_, i) => (
            <div 
              key={`p-${i}`} 
              className={height >= 10 - i ? 'plant grown' : 'plant'} 
            />
          )
        )
      }
    </div>
  )
}

const PlantSoil = () => {
  const { moisture } = useContext(AppContext)
  return (
    <div>
      {
        Array(10).fill('').map(
          (_, i) => (
            <div 
              key={`s-${i}`} 
              className={moisture >= 10 - i ? 'soil moist' : 'soil'} 
            /> 
          )
        )
      }
    </div>
  )
}