import React from "react";
import { Dimensions, View, StyleSheet, Text } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle
} from "react-native-reanimated";
import BasicText from "../React-component/BasicText";
import BasicTextInput from "../React-component/BasicTextInput";

const { height, width } = Dimensions.get("window");

const SIZE = width * 0.7;

interface PageProps {
  index: number;
  translateX: Animated.SharedValue<number>;
  title: string;
}

const InterpolateJoinComponent: React.FC<PageProps> = ({ index, translateX, data }) => {
  /**
   * 전체 스크롤뷰의 width중 현재 페이지가 차지하는 width ( ex 전체 1200중 스크롤 4개기준 첫번째 : 0-300width )를 계산해
   * 현재 페이지에 포커스되거나 사라진다면 애니메이션 효과를 준다
   * */
  const inputRange = [(-index - 1) * width, index * width, (index + 1) * width];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP
    );

    return {
      borderRadius,
      transform: [{ scale }]
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [height / 2, 0, -height / 2],
      Extrapolate.CLAMP
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY: translateY }]
    };
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `rgb(160, 160, 255)` }
        // { backgroundColor: `rgba(0,0,256, 0.${index + 2})` }
      ]}
    >
      <View
        style={[
          styles.dataBox,
        ]}
      >
        {/*<Animated.View style={[styles.square, rStyle]} />*/}
        <Animated.View style={
          [
            styles.textContainer,
            rTextStyle
          ]}>
          <BasicText style={styles.text}>{data.title}</BasicText>
          <BasicTextInput
            returnKeyType={'next'}
          />
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height,
  },
  dataBox: {
    width: SIZE,
    height: SIZE,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 256, 0.4)"
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: "rgba(0, 0, 256, 0.4)"
  },
  text: {
    fontSize: 60,
    color: "white",
    // textTransform: "uppercase",
    fontWeight: "700"
  },
  textContainer: { position: "absolute" }
});

export { InterpolateJoinComponent };
