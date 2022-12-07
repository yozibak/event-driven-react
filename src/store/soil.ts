import { useCallback, useState } from "react"

export type SoilStore = ReturnType<typeof useSoil>

export const useSoil = () => {

  const [moisture, setMoisture] = useState<number>(0)
  const isMoisted = moisture > 0

  const dry = useCallback(() => {
    setMoisture(moisture => moisture > 0 ? moisture -1 : 0)
  }, [])

  const water = useCallback(() => {
    setMoisture(moisture => moisture <= 10 ? moisture +1 : 10)
  }, [])
  
  return {
    moisture,
    isMoisted,
    dry,
    water,
  }
}