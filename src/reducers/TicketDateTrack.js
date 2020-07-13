const DateTrack = (
  state = { list: [], },
  action
) => {
  switch (action.type) {
    case "setDateTrack":
      state = {
        ...state,
        list: action.list,
      };
      return state;

    default:
      return state;
  }
};

export default DateTrack;