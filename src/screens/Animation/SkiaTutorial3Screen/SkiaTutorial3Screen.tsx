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
  Group,
  LinearGradient,
  Paint,
  Path, runSpring,
  runTiming,
  Skia, SweepGradient, Text, useClock, useClockValue,
  useComputedValue,
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


/**
 *   기본적인 원 자석 애니메이션?
 *
 *  1. circle중 하나를 useValue 값으로 cx,cy를 준다
 *  2. Gesture Handler로 원 하나를 터치에 맞춰 움직이도록 설정한다.
 *  3. circle을 그룹으로 묶어 blur처리를 해준다
 *  4. colorMatrix로 블러부분을 겹치는것처럼 보여준다
 *
 * */

function SkiaTutorial3Screen({ navigation }: any) {

  const [openText,setOpenText] = useState(false);

  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const linDotNum = 3;

  const circleListfunc = () => {
    const circleList = [];
    for(let i = 1; i <= linDotNum; i++){
      for(let j = 1; j <= linDotNum; j++){
        if(i%2==1 && j%2==1 ){
          circleList.push({
            cx:windowWidth/(linDotNum+1) * i,
            cy:windowHeight/(linDotNum+1) * j,
            isSelected:false,
            count:0
          })
        }
        // else if(i%2==0 && j%2==0){
        //   circleList.push({
        //     cx:windowWidth/(linDotNum+1) * i,
        //     cy:windowHeight/(linDotNum+1) * j
        //   })
        // }
        // circleList.push({
        //   cx:windowWidth/(linDotNum+1) * i,
        //   cy:windowHeight/(linDotNum+1) * j
        // })
      }
    }
    return circleList;
  }

  // const circleList = circleListfunc();

  const RADIUS = windowWidth/8;

  const cx = useValue(windowWidth / 2);
  const cy = useValue(windowHeight / 2);

  const circleList = useValue(circleListfunc());

  const isInCircle = (aX,aY) => {
    let isIn = false;
    // console.log((Math.pow(RADIUS, 2)));
    // console.log( (Math.pow(cx.current - aX, 2) + Math.pow(cy.current - aY, 2)));
    if ((Math.pow(RADIUS, 2) > (Math.pow(cx.current - aX, 2) + Math.pow(cy.current - aY, 2)))) {
      isIn = true;
    }
    return isIn;
  }

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onChange((e) => {
      if(isInCircle(e.absoluteX,e.absoluteY)){
        cx.current = e.absoluteX;
        cy.current = e.absoluteY;
      }
    })
    .onEnd((e)=>{
      const minDist = RADIUS*2;
      let isFixed = true;
      const tempArr = circleList.current.map((item,index)=>{
        const dx = cx.current - item.cx;
        const dy = cy.current - item.cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist<minDist){
          console.log('AAAAA',index)
          item.isSelected = !item.isSelected;
          item.count += 1;
          isFixed = false;
          runSpring(cx,item.cx);
          runSpring(cy,item.cy);
        }
        return item;
      });

      // console.log(tempArr,'tempArr');

      circleList.current = tempArr;
      if(isFixed){
        runSpring(cx,windowWidth/2,
          {
            // mass:100,
            // stiffness:100,
            // damping:1000,
            // velocity:100
          }
        );
        runSpring(cy,windowHeight/2);
      }

    })

  const layer = useMemo(() => {
    return <Paint>
      <Blur blur={10} />
      <ColorMatrix
        matrix={[
          //R,G,B,A,Bias (Offset)

          1, 0, 0, 0, 0,
          0, 1, 0, 0, 0,
          0, 0, 1, 0, 0,
          0, 0, 0, 60, -30

          // -1,  0,  0,  0, 255,
          // 0,  -1,  0,  0, 255,
          // 0,   0, -1,  0, 255,
          // 0,   0,  0,  1,   0

          //https://jamssoft.tistory.com/159


          // -0.578, 0.99, 0.588, 0, 0, 0.469, 0.535, -0.003, 0, 0, 0.015, 1.69,
          // -0.703, 0, 0, 0, 0, 0, 1, 0,
        ]}
      />

    </Paint>;
  });

  // const test = useDerivedValue(()=>{
  //   console.log(circleList.current);
  //   return circleList.current;
  // },[circleList.current])

  return (
    <View
      style={{
        flex:1,
        // backgroundColor:'red'
      }}
    >
      <GestureDetector gesture={pan}>
        <Canvas
          mode={'continuous'}
          style={{
            flex: 1,
            backgroundColor: "#111"
          }}
        >

          <Group
            layer={layer}
          >
            <Drawing drawing={({canvas})=>{
              circleList.current?.map((item,index)=>{
                const paint = Skia.Paint();
                paint.setColor(Skia.Color(`rgba(${179-(item.count*2)},${249-(item.count*2)},255,1)`));
                canvas.drawCircle(item.cx,item.cy,RADIUS,paint);
              });
            }}>
              {/*{circleList.current?.map((item,index)=>{*/}
              {/*  console.log('ZXCZXCZXCZCX')*/}
              {/*  return(*/}
              {/*    <Circle r={RADIUS} cx={item.cx} cy={item.cy} >*/}
              {/*      {item.isSelected ?*/}
              {/*        (*/}
              {/*          <SweepGradient c={vec(50, 0)} colors={["blue", "magenta", "blue"]} />*/}
              {/*        )*/}
              {/*        :*/}
              {/*        (*/}
              {/*          <SweepGradient c={vec(50, 0)} colors={["cyan", "magenta", "cyan"]} />*/}
              {/*        )*/}
              {/*      }*/}
              {/*    </Circle>*/}
              {/*  )*/}
              {/*})}*/}
            </Drawing>
            {/*<Text*/}
            {/*  x={100}*/}
            {/*  y={500}*/}
            {/*  text="Hello World"*/}
            {/*  // Font is optional*/}
            {/*  // font={font}*/}
            {/*/>*/}

            <Circle r={RADIUS} cx={cx} cy={cy} color={'rgba(179,249,255,1)'}>
              {/*<SweepGradient c={vec(50, 0)} colors={["lightBlue", "lightBlue", "lightBlue"]} />*/}
            </Circle>
            {/*<Circle r={RADIUS} cx={200} cy={600} />*/}
            <SweepGradient c={vec(50, 0)} colors={["blue", "magenta", "cyan"]} />
          </Group>
          <Drawing drawing={({canvas})=>{
            circleList.current?.map((item,index)=>{
              const textPaint = Skia.Paint();
              textPaint.setColor(Skia.Color('#222222'));
              const font = Skia.Font();
              font.setSize(15);
              canvas.drawText(item.count+'',item.cx-5,item.cy+5,textPaint,font);
            });
          }}>
            {/*{circleList.current?.map((item,index)=>{*/}
            {/*  console.log('ZXCZXCZXCZCX')*/}
            {/*  return(*/}
            {/*    <Circle r={RADIUS} cx={item.cx} cy={item.cy} >*/}
            {/*      {item.isSelected ?*/}
            {/*        (*/}
            {/*          <SweepGradient c={vec(50, 0)} colors={["blue", "magenta", "blue"]} />*/}
            {/*        )*/}
            {/*        :*/}
            {/*        (*/}
            {/*          <SweepGradient c={vec(50, 0)} colors={["cyan", "magenta", "cyan"]} />*/}
            {/*        )*/}
            {/*      }*/}
            {/*    </Circle>*/}
            {/*  )*/}
            {/*})}*/}
          </Drawing>
        </Canvas>
      </GestureDetector>
      <View
        style={{
          position: "absolute",
          backgroundColor:'white',
          top:70,
          left:50,
          width:30,
          height:30,
          alignItems:'center',
          justifyContent:'center',
          borderRadius:20
        }}
      >
        <TouchableOpacity
          onPress={()=>{
            navigation.goBack();
          }}
          style={{
            width:'100%',
            height:'100%',
            alignItems:'center',
            justifyContent:'center',
          }}
        >
          <BasicText style={{fontSize:13,fontWeight:'700'}}>
            X
          </BasicText>
        </TouchableOpacity>
      </View>
    </View>


  );
}

export default memo(SkiaTutorial3Screen);

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
