import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Switch Smart</Header>

    <Paragraph>Switch To A Smart World </Paragraph>
    <Button
      style={{ backgroundColor: "#187271" }}
      mode="contained"
      onPress={() => navigation.navigate("LoginScreen")}
    >
      Login
    </Button>
  </Background>
);

export default memo(HomeScreen);
