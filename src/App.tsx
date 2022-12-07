import React, { createContext } from 'react';
import './App.css';
import { useEvent } from './services/event';
import { useClock } from './store/clock';
import { PlantStore, usePlant } from './store/plant';
import { SoilStore, useSoil } from './store/soil';
import { useWeather, Weather, WeatherStore } from './store/weather';
import { useConsumer } from './services/consume';
import { Plant } from './components/Plant';

interface AppData {
  weather: WeatherStore['currentWeather'],
  height: PlantStore['height'],
  moisture: SoilStore['moisture']
}

export const AppContext = createContext({} as AppData)

function App() {

  // store
  const clock = useClock()
  const weather = useWeather()
  const plant = usePlant()
  const soil = useSoil()

  // detect events
  const event = useEvent(clock.time, soil.isMoisted, weather)

  // handle events
  useConsumer(event, plant, soil)

  // pass data into context
  const ctxValue:AppData = {
    weather: weather.currentWeather,
    height: plant.height,
    moisture: soil.moisture
  }

  return (
    <div className="App">
      <AppContext.Provider value={ctxValue}>
        <div>Event Driven React</div>
        <div>{clock.time}</div>
        <div>weather: {Weather[weather.currentWeather]}</div>
        <div>plant's height: {plant.height}</div>
        <div>soil: {soil.moisture}</div>
        <Plant />
      </AppContext.Provider>
    </div>
  );
}

export default App;
