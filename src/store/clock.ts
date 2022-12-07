import { useEffect, useMemo, useState } from "react"

export type ClockStore = ReturnType<typeof useClock>

export const useClock = () => {
  const [date, setDate] = useState(new Date())
  const time = useMemo(() => date.toTimeString().slice(0,8), [date])

  useEffect(() => {
    setTimeout(() => {
      setDate(new Date())
    }, 1000)
  }, [time])

  return {time}
}