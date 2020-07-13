import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import { Transition } from "react-native-reanimated";

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  SalesReports,
  TrxSalesReports,
  TicketsReports
} from "./screens";

const Router = createStackNavigator(
  {
    Dashboard,
    HomeScreen,
    SalesReports,
    TrxSalesReports,
    TicketsReports
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "none",
  }
);

////SCREEN SWICHER NAVIGATION//////
const App = createAnimatedSwitchNavigator(
  {
    LoginScreen,
    Router,
  },
  {
    // initialRouteName: "Main",
    transition: (
      <Transition.Together>
        <Transition.Out
          type="slide-bottom"
          durationMs={400}
          interpolation="easeIn"
        />
        <Transition.In type="fade" durationMs={500} />
      </Transition.Together>
    ),
  }
);

// export default createAppContainer(Router);

export default AppContainer = createAppContainer(App);
