import { renderHook } from "@testing-library/react"
import { Weather } from "../store/weather"
import { MockWeatherStore } from "../__testing__/mocks"
import { AppEvent, PlantEvent, useEvent } from "./event"

describe("event emission", () => {

  it("should emit an event for every second", () => {
    const isMoisted = true
    MockWeatherStore.currentWeather = Weather.sunny
    const initialTime = '10:30:30'
    const { result, rerender } = renderHook(
      ({time}) => useEvent(time, isMoisted, MockWeatherStore),
      {
        initialProps: { time: initialTime }
      }
    )

    // initial
    const expResult:AppEvent = {
      timestamp: initialTime,
      plantEvent: PlantEvent.Idle
    }
    expect(MockWeatherStore.changeWeather).toHaveBeenCalledTimes(1)
    expect(result.current).toMatchObject(expResult)

    // rerender
    rerender({time: initialTime})
    expect(MockWeatherStore.changeWeather).toHaveBeenCalledTimes(1)
    expect(result.current).toMatchObject(expResult)

    // rerender (time changes)
    const after = '10:30:31'
    const expResult2: AppEvent = {
      timestamp: after,
      plantEvent: PlantEvent.Grow
    }
    rerender({time: after})
    expect(MockWeatherStore.changeWeather).toHaveBeenCalledTimes(2)
    expect(result.current).toMatchObject(expResult2)
  })
})