import React, { useCallback, useState } from "react";
import {
  Container,
  TextInput,
  CountryCodeContainer,
  CountryCodeText,
  Separator,
} from "./styles";
import { MaskService } from "react-native-masked-text";
import { TextInputProps } from "react-native";

interface PhoneInputProps extends TextInputProps {
  onPhoneNumberChange: (phoneNumber: string) => void;
}


const PhoneInput: React.FC<PhoneInputProps> = ({ onPhoneNumberChange, ...props }) => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const formatPhone = useCallback((tel: string) => {
    const cleanedNumber = tel.replace(/[^0-9]/g, "");
    const formattedNumber = MaskService.toMask("cel-phone", cleanedNumber, {
      maskType: "BRL",
      withDDD: true,
      dddMask: "(999) 999-9999",
    });
  
    if (formattedNumber.length > 14) return;
    setPhoneNumber(formattedNumber);
    onPhoneNumberChange(cleanedNumber);
  }, [onPhoneNumberChange]);

  return (
    <Container>
      <CountryCodeContainer>
        <CountryCodeText>🇹🇷 +90</CountryCodeText>
      </CountryCodeContainer>
      <Separator />
      <TextInput
        keyboardType="number-pad"
        textContentType="telephoneNumber"
        value={phoneNumber}
        onChangeText={formatPhone}
        {...(props as any)}
      />
    </Container>
  );
};

export default PhoneInput;
