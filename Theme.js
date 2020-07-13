import React from "react";
import { Provider } from "react-native-paper";
import { theme } from "./src/core/theme";
import App from "./src";
import { Notifications } from "expo";
import Constants from "expo-constants";
import Permissions from "expo-permissions";
window.navigator.userAgent = "react-native";

import io from "socket.io-client/dist/socket.io";
import { BASE_URL } from "./src/components/types";
import store from "./AppStore";
import { Text, View } from "react-native";
import { Button, StyleSheet, StatusBar } from "react-native";

const socket = io(BASE_URL, { jsonp: false });

const Theme = () => {
  const [isconn, setIsConn] = React.useState(false);

  React.useEffect(() => {
    var isServerConn = true;

    _notificationSubscription = Notifications.addListener(_handleNotification);

    socket.on("connect", () => {
      store.dispatch({
        type: "SocketConnected",
        payload: socket,
      });
      setIsConn(true);
    });

    socket.on("disconnect", () => {
      store.dispatch({
        type: "SocketDisconnceted",
        payload: socket,
      });
    });

    socket.on("SALESTICKETRESULT", callback => {
      // console.log(callback);
      store.dispatch({ type: "setDateTrack", list: callback })
    })
  }, []);

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      store.dispatch({
        type: "DeviceId",
        token: token,
        isSet: true,
      });
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  _handleNotification = (notification) => {
    setState({ notification: notification });
    // console.log(notification);
  };

  return (
    <Provider theme={theme}>
      <StatusBar backgroundColor="black" barStyle='light-content' />
      {isconn ? null : (
        <View style={{ backgroundColor: "red", height: 50, }}>
          <Text style={{ marginTop: 27, marginLeft: 10, color: "#fff" }}>Connection failed</Text>
        </View>
      )}

      <App />
    </Provider>
  );
};

export default Theme;
