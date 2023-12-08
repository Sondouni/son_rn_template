import * as React from "react";
import { AppState, Dimensions, View } from "react-native";
import { memo, useEffect, useState } from "react";
import Container from "../../../component/React-component/Container";
import {
  Canvas,
  Circle,
  Group,
  interpolateColors,
  LinearGradient,
  Path,
  Rect,
  Skia,
  useValue,
  Text as Texto,
  useFont, mix, polar2Canvas
} from "@shopify/react-native-skia";
import Steam from "../../../component/Example/Steam";
import { interpolate, useDerivedValue, useSharedValue } from "react-native-reanimated";
import ACControl from "../../../component/Example/ACControl";
import { useIsFocused } from "@react-navigation/native";
// import {  } from "react-native-reanimated";

export interface Props {
  navigation: any;
}

/**
 *
 * reanimated와 skia를 묶어줄때는 useSharedValue를 사용하자
 *
 * */

function SmartACScreen({ navigation }: any) {

  const [appStateVisible, setAppStateVisible] = useState(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      setAppStateVisible(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  /**
   * 1. 배경 그라데이션
   * */
  const { width, height } = Dimensions.get('window');
  const [speed, setSpeed] = useState(1)
  const progress = useSharedValue(0.5);


  const COLORS = ['#8772FB', '#FF7D7D'].map((item,index)=>{
    return Skia.Color(item);
  });


  const total_bubbles = 16;

  const colored = useDerivedValue(
    () =>{
      console.log('ZXCXZCXZC')
      return ['rgb(236,231,253)', 'rgb(220,231,252)', interpolateColors(
        progress.value,
        [0.5, 1],
        COLORS
        // ['#8772FB', '#FF7D7D']
      )]
    });

  /**
   * 2. 중앙 온도값 원
   * */
  const r1 = 85;
  const path = Skia.Path.Make();
  path.addCircle(width / 2, height/3, r1);

  const bar_color = useDerivedValue(

    () => interpolateColors(
      progress.value,
      [0.5, 1],
      COLORS
    )
    ,
    [progress]
  );

  const test = useDerivedValue(
    () => {
      console.log('AXZCXZC',progress.value);
    },
    [progress]
  );

  const text = useDerivedValue(
    () => `${Math.round(interpolate(progress.value,
      [0.5, 1],
      [16, 30]
    ))}°C`,
    [progress]
  );

  const font = useFont(require("../../../assets/fonts/NanumSquareRoundB.ttf"), 32);

  const circle_progress = useDerivedValue(
    () => polar2Canvas(
      {
        theta: mix(progress.value, 2 * Math.PI, 0),
        radius: r1 - 10
      },
      {
        x: width * 0.5,
        y: height/3
      }
    )
    ,
    [progress]
  )

  const changeTemp = (value) => {
    'worklet';
    progress.value = value
  }

  const changeSpeed = (value) => {
    setSpeed(value)
  }

  return (
    <>
      <View style={{
        width: '100%',
        height: '100%',
        position: 'absolute',

      }}>


        <Canvas style={{ flex: 1 }}>


          {/*
          LinearGradient 에 colors를 useDerivedValue훅을 써서
          progress를 subscribe 한 상태로
          progress.value의 값에따라 gradient를 바꿔주는 형태
          */}
          <Rect x={0} y={0} width={width} height={height} >
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: width / 1.9, y: height / 1.5 }}
              colors={colored}
            >
            </LinearGradient>
          </Rect>

          {new Array(total_bubbles).fill(0).map((_, index) => {

            return <Steam
                key={index}
                index={index}
                speed={speed}
                appStateVisible={appStateVisible}
              />
          })}


        </Canvas>
      </View>
      <View
        style={{
          flex:1
        }}
      >
        <View style={{
          // width: '100%',
          height: '100%',
          // alignItems:'center',
          // justifyContent:'center',
          // backgroundColor:'red'
        }}>
          <Canvas style={{
            // flex: 1,
            height:height/2,
            // backgroundColor:'blue'
          }}>
            <Group>
              <Path
                path={path}
                style="stroke"
                strokeWidth={30}
                end={1}
                strokeCap="round"
                color="#ffffff20"
              />
              <Path
                path={path}
                style="stroke"
                strokeWidth={30}
                end={progress}
                strokeCap='butt'
                start={0.49}
                color={bar_color}
              />
            </Group>
            <Circle cx={width / 2} cy={height/3} r={r1} color='#fff' >


            </Circle>
            <Texto
              x={width / 2 - 36}
              y={height/3 + 10}
              text={text}
              font={font}
              color={bar_color}
            />

            <Group>
              <Circle c={circle_progress} r={5}
                      color={bar_color} />
            </Group>
          </Canvas>
          {/*<View*/}
          {/*  style={{*/}
          {/*    backgroundColor:'black',*/}
          {/*    height:50,*/}
          {/*    width:10*/}
          {/*  }}*/}
          {/*>*/}

          {/*</View>*/}
          <ACControl
            changeTemp={changeTemp}
            changeSpeed={changeSpeed}
            speed={speed}
          />


        </View>
      </View>
    </>
  );
}

export default memo(SmartACScreen);
