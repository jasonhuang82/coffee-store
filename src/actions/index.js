import {
  ADD_PERSON,
  DEL_PERSON
} from "./actionType";

export const addPersonHandler = (name, age) => ({
  type: ADD_PERSON,
  name, 
  age
})

export const delPersonHandler = (personID) => ({
  type: DEL_PERSON,
  personID
})