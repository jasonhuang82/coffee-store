import { coffees } from "../json/coffee.json";
import {
  CHANGE_SIZE_TYPE,
  CHANGE_PROPORTION,
  GET_COFFEE_DATA
} from "~/actions/actionType";
const initialState = [];

export default (state = initialState, action) => {
  let coffeeState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case CHANGE_SIZE_TYPE: 
      coffeeState[action.index].type = action.value;
      return coffeeState;
    case CHANGE_PROPORTION:
      coffeeState[action.index][action.proportion] = action.value;
      return coffeeState;
    case GET_COFFEE_DATA:
      coffeeState = JSON.parse(JSON.stringify(coffees));
      return coffeeState;
    default:
      // 若沒有要更改，這裡不可以用immutable 新的物件去做回傳，
      // 不然saga一發dispatch會造成無窮迴圈
      // 一發 saga action 到這裡回傳新的物件到store
      // react 判斷與上次拿到的props不一樣又 re-render
      // update 又發 saga dispatch ... loop
      return state;
  }
}
