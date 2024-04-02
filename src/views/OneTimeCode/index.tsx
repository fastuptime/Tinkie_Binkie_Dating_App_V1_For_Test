import React, { useContext, useState } from "react";
import {
  Container,
  Content,
  Description,
  ResendCode,
  Timer,
  TopColumn,
} from "./styles";
import { StatusBar } from "expo-status-bar";
import Text from "~components/Text";
import { Underline } from "./../Authentication/components/HeroText";
import { useNavigation } from "@react-navigation/native";
import { useDidMountEffect } from "~services/utils";
import CustomKeyboard from "./components/CustomKeyboard";
import useTimer from "./hooks/useTimer";
import GoBack from "./components/GoBack";
import CodeInput from "./components/CodeInput";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SceneName } from "~src/@types/SceneName";
import moment from "moment";
import { ThemeContext } from "styled-components";
import { Alert } from "react-native";

const CODE_LENGTH = 4;
const INITIAL_TIMEOUT_IN_SECONDS = 70;
const RESEND_TIMEOUT_IN_SECONDS = 70;

const Authentication = () => {
  const [timer, setTimer] = useTimer(INITIAL_TIMEOUT_IN_SECONDS);
  const themeContext = useContext(ThemeContext);
  const insets = useSafeAreaInsets();
  const [keyboardInput, setKeyboardInput] = useState("");
  const maxRetry = 3;
  let [retry, setRetry] = useState(0);

  const formattedTime = moment().minutes(0).seconds(timer).format("mm:ss");

  const navigation = useNavigation();

  const insetTop = Math.max(15 + insets.top, 50);

  useDidMountEffect(() => {
    if (keyboardInput.length === CODE_LENGTH) {
      console.log(`Girilen kod: ${keyboardInput}`);
      if(keyboardInput !== "1234") {
        setRetry(retry + 1);
        console.log(`Retry: ${retry}`);
        if(retry === maxRetry) {
          Alert.alert("", "Bir süre sonra tekrar deneyiniz.", [{ text: "Tamam" }]);
          setRetry(0);
          setKeyboardInput("");
        } else {
          Alert.alert("", "Kodunuz yanlış. Lütfen tekrar deneyin.", [{ text: "Tamam" }]);
          setKeyboardInput("");
        }
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: SceneName.EditProfile }],
        });
      }
    }
  }, [keyboardInput]);

  return (
    <Container>
      <Content
        style={{
          paddingTop: insetTop,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left + 5,
          paddingRight: insets.right + 5,
        }}
      >
        <StatusBar style={themeContext.dark ? "light" : "dark"} />
        <TopColumn>
          <Timer>{formattedTime}</Timer>
          <Description>
            Gönderdiğimiz 4 haneli kodu buraya girerek devam edebilirsin.
          </Description>
          <CodeInput value={keyboardInput} length={CODE_LENGTH} />
        </TopColumn>
        <CustomKeyboard
          onInsert={(num) => {
            if (keyboardInput.length >= CODE_LENGTH) return;
            setKeyboardInput(keyboardInput + num);
          }}
          onDelete={() => setKeyboardInput(keyboardInput.slice(0, -1))}
        />
      </Content>
      <GoBack
        style={{ top: insetTop, left: insets.left + 25 }}
        onPress={navigation.goBack}
      />
      <ResendCode
        style={{ bottom: insets.bottom + 15 }}
        disabled={!!timer}
        onPress={() => {
          console.log(`Kod tekrar gönderiliyor.`);
          Alert.alert("", "Kod tekrar gönderildi.", [{ text: "Tamam" }]);
          setTimer(RESEND_TIMEOUT_IN_SECONDS);
          setKeyboardInput("");
        }}
      >
        <Text fontSize="large" fontWeight="bold" opacity={timer ? 0.5 : 1}>
          Tekrar Kod Gönder 📬 ({formattedTime})
        </Text>
      </ResendCode>
    </Container>
  );
};

export default Authentication;
