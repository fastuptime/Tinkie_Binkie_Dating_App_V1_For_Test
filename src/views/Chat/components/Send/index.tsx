import React, { useState, useCallback } from "react";
import { Container, Input } from "./styles";
import useSendMessage from "./useSendMessage";
import Ionicons from '@expo/vector-icons/Ionicons';

function Component() {
  const [message, setMessage] = useState("");
  const sendMessage = useSendMessage();

  const Submit = useCallback(() => {
    if (!message?.trim()) return;

    sendMessage(message);
    setMessage("");
  }, [message, sendMessage]);

  return (
    <Container style={{ flexDirection: "row", alignItems: "center" }}>
      <Input
        value={message}
        style={{ flex: 1, marginRight: 8 }}
        onChangeText={setMessage}
        onSubmitEditing={Submit}
        returnKeyType="send"
        autoCapitalize="none"
        enablesReturnKeyAutomatically
        blurOnSubmit={false}
        placeholder="Mesajınızı yazın"
      />

      <Ionicons
        name="gift"
        size={24}
        color="#000"
        onPress={() => console.log("Gift")}
      />

     <Ionicons
        name="camera"
        size={24}
        color="#000"
        style={{ marginLeft: 8 }}
        onPress={() => console.log("camera")}
      />

    </Container>
  );
}

export default Component;
