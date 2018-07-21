import {
  ADD_PERSON,
  DEL_PERSON
} from "~/actions/actionType";
const initialState = []

export default (state = initialState, action) => {
  let personsState = JSON.parse(JSON.stringify(state));
  switch (action.type) {

    case ADD_PERSON:
      const newPerson = {
        id: Math.random(), // not really unique but good enough here!
        name: action.name ? action.name : 'Max',
        age: action.age ? action.age : Math.floor(Math.random() * 40)
      }
      personsState.unshift(newPerson)
      return personsState;
    case DEL_PERSON:
      personsState = personsState
        .filter(person => person.id !== action.personID)
      return personsState;
    case 'INCREMENT':
      console.log('多按了一下~');
      return personsState
    case 'CLICK_BUTTON':
      console.log('剛剛click過了哦');
      return personsState
    default:
      return personsState
  }
}
