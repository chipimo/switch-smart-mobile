const DeciveIDReducer = (state = { token: "", isSet: false }, action) => {
  switch (action.type) {
    case "DeviceId":
      state = {
        token: action.token,
        isSet: action.isSet
      };
      break;
  }
  return state;
};

export default DeciveIDReducer;
