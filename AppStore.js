import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import IsUserLogedInReducer from "./src/reducers/authReducer/isUserLoggedIn";
import SocketConfigReducer from "./src/reducers/sockets/SocketConfig";
import DateTrack from "./src/reducers/TicketDateTrack";

const AllReducers = combineReducers({
  User: IsUserLogedInReducer,
  SocketConfig: SocketConfigReducer,
  DateTrack: DateTrack,
});

const store = createStore(AllReducers, applyMiddleware(thunk));

export default store;
