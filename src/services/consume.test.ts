import {useConsumer} from './consume'
import { renderHook } from '@testing-library/react'
import { AppEvent } from './event'
import { MockPlantStore, MockSoilStore } from '../__testing__/mocks'
import { PlantEvent } from './event'

describe("consume events", () => {

  const EventBase:AppEvent = {
    timestamp: '10:30:30',
    plantEvent: PlantEvent.Grow
  }

  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("should consume moisture when the plant grows", () => {
    const mockEvent:AppEvent = {...EventBase}
    renderHook(() => useConsumer(mockEvent, MockPlantStore, MockSoilStore))
    expect(MockSoilStore.dry).toHaveBeenCalled()
    expect(MockPlantStore.grow).toHaveBeenCalled()
  })
  
  it("should execute the right manipulations according to each event", () => {
    const waterEvent:AppEvent = {...EventBase, plantEvent: PlantEvent.Water}
    renderHook(() => useConsumer(waterEvent, MockPlantStore, MockSoilStore))
    expect(MockSoilStore.water).toHaveBeenCalled()

    jest.resetAllMocks()
    const dryEvent:AppEvent = {...EventBase, plantEvent: PlantEvent.Dry}
    renderHook(() => useConsumer(dryEvent, MockPlantStore, MockSoilStore))
    expect(MockSoilStore.dry).toHaveBeenCalled()
  })

  it("should not consume the event again on the same event object", () => {
    const dryEvent:AppEvent = {...EventBase, plantEvent: PlantEvent.Dry}
    const { rerender } = renderHook(
      ({dryEvent}) => useConsumer(dryEvent, MockPlantStore, MockSoilStore),
      {
        initialProps: { dryEvent: dryEvent }
      }
    )
    expect(MockSoilStore.dry).toHaveBeenCalledTimes(1)

    rerender({dryEvent})
    expect(MockSoilStore.dry).toHaveBeenCalledTimes(1)
  })

  it("should consume events if the event object renews", () => {
    const dryEvent:AppEvent = {...EventBase, plantEvent: PlantEvent.Dry}
    const { rerender } = renderHook(
      ({dryEvent}) => useConsumer(dryEvent, MockPlantStore, MockSoilStore),
      {
        initialProps: { dryEvent: dryEvent }
      }
    )
    expect(MockSoilStore.dry).toHaveBeenCalledTimes(1)

    rerender({dryEvent: {...dryEvent, timestamp: '10:30:31'}}) // timestamp changes every second
    expect(MockSoilStore.dry).toHaveBeenCalledTimes(2)
  })
})
