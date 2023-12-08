import * as React from "react";
import { StyleSheet, View } from "react-native";
import { memo } from "react";
import Container from "../../../component/React-component/Container";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { InterpolateComponent } from "../../../component/InterpolateComponent/InterpolateComponent";

export interface Props {
  navigation: any;
}

function InterpolateScreen({ navigation }: any) {

  const tempArr = [
    {
      id:1,
      title:'First',
      content:'First Item',
      backgroundColor:'rgba(56,192,229,0.62)',
    }
  ]

  const WORDS = ["첫번째", 'Second', '세번째', 'Fourth'];


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
      {WORDS.map((title, index) => {
        return (
          <InterpolateComponent
            key={index.toString()}
            title={title}
            translateX={translateX}
            index={index}
          />
        );
      })}


    </Animated.ScrollView>
    // <Container>
    //   <View
    //     ref={(c) => {
    //       console.log("InterpolateScreen 열림");
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

export default memo(InterpolateScreen);
