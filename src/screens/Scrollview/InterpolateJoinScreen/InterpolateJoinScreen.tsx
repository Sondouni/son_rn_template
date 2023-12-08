import * as React from "react";
import { StyleSheet, View } from "react-native";
import { memo, useState } from "react";
import Container from "../../../component/React-component/Container";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { InterpolateComponent } from "../../../component/InterpolateComponent/InterpolateComponent";
import { InterpolateJoinComponent } from "../../../component/InterpolateComponent/InterpolateJoinComponent";

export interface Props {
  navigation: any;
}

function InterpolateJoinScreen({ navigation }: any) {

  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [contact,setContact] = useState('');

  const tempArr = [
    {
      id:1,
      title:'1',
      placeHolder:'이름을 입력해주세요',
      joinState:name,
      joinSetState:setName,
      backgroundColor:'rgba(56,192,229,0.62)',
    },
    {
      id:2,
      title:'2',
      placeHolder:'이메일을 입력해주세요',
      joinState:email,
      joinSetState:setEmail,
      backgroundColor:'rgba(56,192,229,0.62)',
    },
    {
      id:3,
      title:'3',
      placeHolder:'전화번호를 입력해주세요',
      joinState:contact,
      joinSetState:setContact,
      backgroundColor:'rgba(56,192,229,0.62)',
    },
  ]


  const translateX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });

  return (
    <Animated.ScrollView
      onScroll={scrollHandler}
      pagingEnabled
      scrollEventThrottle={16}
      horizontal
      style={styles.container}
    >
      {tempArr.map((item, index) => {
        return (
          <InterpolateJoinComponent
            key={index.toString()}
            data={item}
            translateX={translateX}
            index={index}
          />
        );
      })}


    </Animated.ScrollView>
    // <Container>
    //   <View
    //     ref={(c) => {
    //       console.log("InterpolateJoinScreen 열림");
    //     }}
    //   >
    //
    //
    //   </View>
    // </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default memo(InterpolateJoinScreen);
