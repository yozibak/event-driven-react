import { useCallback, useState } from "react"

export type PlantStore = ReturnType<typeof usePlant>

export const usePlant = () => {

  const [height, setHeight] = useState(1)

  const grow = useCallback(() => {
    setHeight(height => height < 10 ? height + 1 : 10)
  }, [])

  const die = useCallback(() => {
    setHeight(height => height > 1 ? height - 1 : 1)
  }, [])

  return {
    height,
    grow,
    die,
  }
}
