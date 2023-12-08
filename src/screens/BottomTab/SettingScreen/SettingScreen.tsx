import * as React from "react";
import { View } from "react-native";
import { memo } from "react";
import BasicText from "../../../component/React-component/BasicText";
import Container from "../../../component/React-component/Container";

export interface Props {
  navigation: any;
}

function SettingScreen({ navigation }: any) {


  return (
    <Container>
      <View
        ref={(c) => {
          console.log("SettingScreen 열림");
        }}
      >
        <BasicText >
          SettingScreen
        </BasicText>
      </View>
    </Container>
  );
}

export default memo(SettingScreen);
