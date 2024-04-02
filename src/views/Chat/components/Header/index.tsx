import React, { useContext } from "react";
import { Header, BackTouchArea, Picture } from "./styles";
import Text from "~components/Text";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ThemeContext } from "styled-components/native";
import { IChat } from "~views/Chat";
import BackArrow from "~images/BackArrow.svg";
import { TouchableOpacity } from "react-native";
import { SceneName } from "~src/@types/SceneName";


export default function Component() {
  const navigation = useNavigation();
  const { params } = useRoute<IChat>();
  const { colors } = useContext(ThemeContext);

  const getUserProfile = (user: IChat["user"]) => {
    console.log(`Navigating to ${user?.name}'s profile.`);
    //UserProfile
    
  };

  return (
    <Header>
      <BackTouchArea onPress={() => navigation.goBack()}>
        <BackArrow height={15} width={15} fill={colors.text} />
      </BackTouchArea>
      <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={() => getUserProfile(params.user)}>
        <Picture source={{ uri: params.user?.picture }} />
        <Text ontWeight="bold" numberOfLines={1}>
          {params.user?.name || "Undefined"}
        </Text>
        {/* <Text fontSize="small" color="gray" numberOfLines={1}>
          {params.user?.lastSeen || "Undefined"}
        </Text> */}
    </TouchableOpacity>
    </Header>
  );
}
