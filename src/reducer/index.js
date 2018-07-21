import { combineReducers } from 'redux';
import persons from "./personsState";
import coffees from "./coffeesState";
export default combineReducers({
  persons,
  coffees
})
