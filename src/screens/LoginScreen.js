import React, { memo, useState } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import { passwordValidator } from "../core/utils";
import { connect } from "react-redux";

const LoginScreen = (props) => {
  const { navigation, SocketConfig } = props;
  const [password, setPassword] = useState({ value: "", error: "" });
  const [SocketPassword, setSocketPassword] = useState("");

  React.useEffect(() => {
    if (SocketConfig.isCon) {
      SocketConfig.socket.emit("USER");
      SocketConfig.socket.on("USER_RESULT", (callback) => {
        if (callback.user)
          setSocketPassword(callback.user[0].Password);
      });
    }
  }, [props]);

  const _onLoginPressed = () => {
    const passwordError = passwordValidator(password.value);

    if (passwordError) {
      setPassword({ ...password, error: passwordError });
      return;
    }

    if (password.value === SocketPassword) {
      navigation.navigate("Dashboard");
    } else {
      alert("Wrong Password,Please try again!");
    }
  };

  return (
    <Background>
      {/* <BackButton goBack={() => navigation.navigate("HomeScreen")} /> */}

      <Logo />

      <Header>Welcome back.</Header>

      <TextInput
        label="ENTER PIN"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />

      <Button
        mode="contained"
        style={{ backgroundColor: "#187271" }}
        onPress={_onLoginPressed}
      >
        Login
      </Button>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

function mapStateToProps(state) {
  return {
    SocketConfig: state.SocketConfig,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchEvent: (data) => dispatch(data),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
