import * as React from "react";
import { Easing, StyleSheet, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { memo, useEffect, useState } from "react";
import Container from "../../../component/React-component/Container";
import BasicText from "../../../component/React-component/BasicText";
import {
  Canvas,
  Circle,
  Drawing,
  LinearGradient,
  Paint,
  Path,
  runTiming,
  Skia, useClock, useClockValue,
  useComputedValue,
  useImage,
  useValue, vec
} from "@shopify/react-native-skia";
import { makeImageParticles } from "../../../Utils";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { spline } from "@georgedoescode/spline";
import { createNoise2D } from "simplex-noise";
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export interface Props {
  navigation: any;
}



function SkiaTutorial2Screen({ navigation }: any) {

  const {width:stageWidth,height:stageHeight} = useWindowDimensions();

  const t = useClock();
  const skiaScale = useSharedValue(0);

  const transform = useDerivedValue(() => {
    // console.log(t.value,'t.value');
    // console.log(Math.cos(2 * t.value),'t.value');
    const scale = (2 / (3 - Math.cos(2 * t.value))) * 100;
    return [
      { translateX: skiaScale.value * Math.cos(skiaScale.value) },
      { translateY: skiaScale.value * (Math.sin(2 * skiaScale.value) / 2) },
    ];
  });

  useEffect(()=>{
    skiaScale.value = withRepeat(
      withTiming((2 / (3 - Math.cos(2 * t.value))) * 100, { duration: 3000 }),
      -1,
      true
    );
  },[]);

  // const transform2 = useDerivedValue(() => {
  //   console.log(t.value,'t.value????');
  //   // console.log(Math.cos(2 * t.value),'t.value');
  //   const scale = (2 / (3 - Math.cos(2 * t.value))) * 100;
  //   return [
  //     { translateX: scale * Math.cos(t.value) },
  //     { translateY: scale * (Math.sin(2 * t.value) / 2) },
  //   ];
  // });

  const scale = useSharedValue(1);

  const rotate = useDerivedValue(() => {
    console.log('aaa');
    return `${scale.value * 2}rad`;
  });

  const scaleStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const rotateStyles = useAnimatedStyle(() => ({
    transform: [{rotate: `${scale.value * 2}rad`}],
  }));

  useEffect(() => {
    scale.value = 1;
    scale.value = withRepeat(
      withTiming(scale.value * 2, { duration: 1000 }),
      -1,
      true
    );
    console.log(scale.value,'scale.value')
  }, []);

  return (
    <View
      style={{
        flex:1,
        // alignItems:'center',
        // justifyContent:'center'
      }}
    >
      <Canvas style={{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
      }}>
        {/*<Circle c={vec(stageWidth/2, stageHeight/4)} r={50} color="cyan" transform={transform} />*/}
        <Circle c={vec(stageWidth/2, stageHeight/4)} r={50} color="cyan" transform={transform} />
      </Canvas>
      <View style={styles.container}>
        <Animated.View style={[styles.ball, scaleStyles]} />
        <Animated.View style={[styles.box, rotateStyles]} />
      </View>
    </View>
  );
}

export default memo(SkiaTutorial2Screen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'row',
  },
  ball: {
    height: 50,
    width: 50,
    backgroundColor: '#b58df1',
    borderRadius: 50,
    marginRight: 80,
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: '#b58df1',
    borderRadius: 15,
  },
});
