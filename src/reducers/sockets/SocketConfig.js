const SocketConfigReducer = (state = { socket: {}, isCon: false }, action) => {
  switch (action.type) {
    case "SocketConnected":
      state = { ...state, socket: action.payload, isCon: true };
      break;
    case "SocketDisconnceted":
      state = { ...state, socket: null, isCon: false };
      break;
  }
  return state;
};

export default SocketConfigReducer;
