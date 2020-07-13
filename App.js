import React from 'react';
import { Provider } from "react-redux";
import Theme from './Theme';
import store from "./AppStore";

const Main = () => (
  <Provider store={store}>
    <Theme />
  </Provider>

);

export default Main;
