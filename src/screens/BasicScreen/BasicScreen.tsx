import * as React from "react";
import { View } from "react-native";
import { memo } from "react";
import Container from "../../component/React-component/Container";

export interface Props {
  navigation: any;
}

function BasicScreen({ navigation }: any) {


  return (
    <Container>
      <View
        ref={(c) => {
          console.log("BasicScreen 열림");
        }}
      >

      </View>
    </Container>
  );
}

export default memo(BasicScreen);
