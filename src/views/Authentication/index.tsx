import React, { useState, useContext } from "react";
import { BottomCard, Container, Description, TopCard } from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Button } from "~components";
import { Title, Highlight } from "./styles";
import Logo from "~images/Logo.svg";
import HeroText from "./components/HeroText";
import PhoneInput from "./components/PhoneInput";
import { KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";
import { SceneName } from "~src/@types/SceneName";

export const useCustomBottomInset = () => {
  const insets = useSafeAreaInsets();
  return Math.max(20, insets.bottom + 5);
};

const Authentication = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = useCustomBottomInset();
  const themeContext = useContext(ThemeContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(""); 

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      if (!phoneNumber || phoneNumber.length < 10) {
        Alert.alert("", "Lütfen geçerli bir telefon numarası girin.", [{ text: "Tamam" }]);
        setLoading(false);
        return;
      }
      
      console.log(`Telefon numarası ${phoneNumber} ile giriş yapılıyor.`);
      navigation.navigate(SceneName.OneTimeCode);
      setLoading(false);
    }, 1000);
  };

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={{ flexGrow: 1 }}
      >
        <StatusBar style={themeContext.dark ? "light" : "dark"} />
        <TopCard
          source={
            themeContext.dark
              ? require("~images/background-dark.png")
              : require("~images/background-light.png")
          }
          style={{ paddingTop: 60 + insets.top }}
        >
          <Logo
            style={{ marginBottom: 25 }}
            width={70}
            height={70}
            fill={themeContext.colors.text}
          />
          <HeroText />
        </TopCard>
        <BottomCard style={{ paddingBottom: bottomInset }}>
          <Title>
            Merhaba 👋
          </Title>
          <Description>
            Hesap oluşturmak veya giriş yapmak için telefon numaranızı girin.
          </Description>
          <PhoneInput
            enablesReturnKeyAutomatically
            returnKeyType="send"
            onSubmitEditing={handleLogin}
            onPhoneNumberChange={setPhoneNumber}
            blurOnSubmit={false}
            placeholder="(500) 000-0000"
          />
          <Button loading={loading} onPress={handleLogin}>
            Devam Et
          </Button>
        </BottomCard>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Authentication;
