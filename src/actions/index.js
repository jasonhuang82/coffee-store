import {
  CHANGE_SIZE_TYPE,
  CHANGE_PROPORTION,
  GET_COFFEE_DATA,
  WATCH_COFFEE_DATA_SAGA
} from "./actionType";

export const changeSizeTypeAction = (index, value) => ({
  type: CHANGE_SIZE_TYPE,
  index,
  value
})

export const changeProportionAction = (proportion,index, value) => ({
  type: CHANGE_PROPORTION,
  index, 
  value, 
  proportion
})

export const getCoffeeDataAction = () => ({
  type: GET_COFFEE_DATA
})

// saga
export const watchCoffeDataSagaAction = (coffees=[], history,location) => ({
  type: WATCH_COFFEE_DATA_SAGA,
  payload: {
    coffees,
    history,
    location
  }
})