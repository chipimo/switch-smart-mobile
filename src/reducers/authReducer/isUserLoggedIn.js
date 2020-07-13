const IsUserLogedInReducer = (
  state = { logState: false, userInfo: {} },
  action
) => {
  switch (action.type) {
    case "LOGGEDIN":
      state = {
        logState: true,
        userInfo: action.payload
      };
      return state;
    case "LOGGEDOUT":
      state = { logState: false, userInfo: {} };
      return state;

    default:
      return state;
  }
};

export default IsUserLogedInReducer;
