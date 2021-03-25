const initialState = {
  user: {
    __v: 0,
    _id: "",
    charity: 0,
    createdAt: "",
    email: "",
    establishement: [],
    location: [],
    password: "",
    photos: [""],
    products: [],
    role: "",
    transactions: [],
  },
};
const MainReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOADING":
      return action.state;
    case "LOGIN":
      return action.state;
    case "LOGOUT":
      return action.state;
    case "Charity":
      return action.state;
    case "REGISTER":
      return action.state;
    case "UPDATE":
      return action.state;
    default:
      return state;
  }
};

export default MainReducer;
