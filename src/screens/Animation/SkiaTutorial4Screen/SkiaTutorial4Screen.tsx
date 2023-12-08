import * as React from "react";
import { Easing, StyleSheet, Touchable, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { memo, useEffect, useMemo, useState } from "react";
import Container from "../../../component/React-component/Container";
import BasicText from "../../../component/React-component/BasicText";
import {
  Blur,
  Canvas,
  Circle,
  ColorMatrix,
  Drawing,
  Fill,
  Group,
  LinearGradient,
  Paint,
  Path, runSpring,
  runTiming,
  Skia, SweepGradient, Text, useClock, useClockValue,
  useComputedValue, useFont,
  useImage,
  useValue, vec
} from "@shopify/react-native-skia";
import { makeImageParticles } from "../../../Utils";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { spline } from "@georgedoescode/spline";
import { createNoise2D } from "simplex-noise";
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming
} from "react-native-reanimated";

export interface Props {
  navigation: any;
}

function SkiaTutorial4Screen({ navigation }: any) {

  const fontSize = 32;
  // const font = useFont(require("./my-font.ttf"), fontSize);
  return (
    <Canvas style={{ flex: 1 }}>
      <Fill color="white" />
      <Text
        x={100}
        y={300}
        text="Hello World"
        // Font is optional
        // font={font}
      />
    </Canvas>
  );
}

export default memo(SkiaTutorial4Screen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flexDirection: "row"
  },
  ball: {
    height: 50,
    width: 50,
    backgroundColor: "#b58df1",
    borderRadius: 50,
    marginRight: 80
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: "#b58df1",
    borderRadius: 15
  }
});
