

const initialState = [
  {
    pid: '001',
    name: "Expresso",
    coffee: 80,
    bubble: 0,
    water: 0,
    milk: 0,
    type: "small"
  },
  {
    pid: '002',
    name: "Americano",
    coffee: 40,
    bubble: 0,
    water: 40,
    milk: 0,
    type: "medium"
  },
  {
    pid: '003',
    name: "Cappuccino",
    coffee: 40,
    bubble: 0,
    water: 0,
    milk: 50,
    type: "big"
  },
  {
    pid: '004',
    name: "Latte",
    coffee: 30,
    bubble: 30,
    water: 0,
    milk: 30,
    type: "mock"
  }
];

export default (state = initialState, action) => {
  let coffeeState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case 'CHANGE_SIZE_TYPE': 
      coffeeState[action.index].type = action.value;
      return coffeeState;
    case 'CHANGE_PROPORTION':
      coffeeState[action.index][action.proportion] = action.value;
      return coffeeState;
    default:
      return coffeeState;
  }
}
