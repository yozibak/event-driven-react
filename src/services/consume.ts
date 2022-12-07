import { useEffect } from "react";
import { PlantStore } from "../store/plant";
import { SoilStore } from "../store/soil";
import { AppEvent, PlantEvent } from "./event";

export const useConsumer = (
  event: AppEvent,
  {grow, die}: PlantStore,
  {dry, water}: SoilStore,
) => {
  useEffect(() => {
    switch (event.plantEvent) {
      case PlantEvent.Grow:
        dry()
        grow()
        break
      case PlantEvent.Water:
        water()
        break
      case PlantEvent.Dry:
        dry()
        break
      case PlantEvent.Die:
        die()
        break
    }
  }, [event, dry, water, grow, die])
}

