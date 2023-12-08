import * as React from "react";
import { Easing, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { memo, useState } from "react";
import Container from "../../../component/React-component/Container";
import BasicText from "../../../component/React-component/BasicText";
import {
  Canvas,
  Drawing,
  LinearGradient,
  Paint,
  Path,
  runTiming,
  Skia, useClockValue,
  useComputedValue,
  useImage,
  useValue, vec
} from "@shopify/react-native-skia";
import { makeImageParticles } from "../../../Utils";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { spline } from "@georgedoescode/spline";
import { createNoise2D } from "simplex-noise";

export interface Props {
  navigation: any;
}



function SkiaTutorialScreen({ navigation }: any) {

  // 무작위 패턴을 만들어주는 알고리즘
  const noise = createNoise2D();
  const noiseStep = 0.005;
  const clock = useClockValue();
  const endGradientOffset = useValue(0);

  const createPoints = () => {
    const newPoints = [];
    // 몇개의 각을 사용할지
    const numPoints = 4;
    //important 한 원을 numPoints 만큼씩 동일하게 나누기 -> 각도가 되는건가?? 아닌거같은데.... ->
    // 호의 비율?? -> 호의 비율이라 하기에는 왜 *2를 하는거지???  호도법 기준 2파이 = 360도@@@@@@@@@
    const angleStep = (Math.PI * 2) / numPoints;
    // 반지름
    const rad = 100;
    // canvas 크기의 반 -> canvas를 좌표그래프라 생각해 0,0센터값을 가져가도록 더해주는값
    const canvasWidth = 130;

    for (let i = 0; i < numPoints; i++) {
      const theta = i * angleStep;
      const x = canvasWidth + Math.cos(theta) * rad;
      const y = canvasWidth + Math.sin(theta) * rad;
      //todo angleStep의 *2와 x,y의 130을 바꿔서 테스트해보기

      newPoints.push({
        x,
        y,
        originX: x,
        originY: y,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000
      });
    }
    return newPoints;
  };

  const points = useValue(createPoints());

  const mapNumber = (
    n: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ) => {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
  };

  const animate = () => {
    const newPoints = [];

    for(let i = 0; i < points.current.length; i++){
      const point = points.current[i];

      const nX = noise(point.noiseOffsetX,point.noiseOffsetX);
      const nY = noise(point.noiseOffsetY,point.noiseOffsetY);

      // console.log(point.noiseOffsetX,point.noiseOffsetX,nX, nY);

      const x = mapNumber(nX,-1,1,point.originX - 20, point.originX +20);
      const y = mapNumber(nY,-1,1,point.originY - 20, point.originY +20);

      point.x = x;
      point.y = y;

      point.noiseOffsetX += noiseStep;
      point.noiseOffsetY += noiseStep;

      newPoints.push(point)
    }

    points.current = newPoints;
  }

  // const animate = () => {
  //   const newPoints = [];
  //
  //   for (let i = 0; i < points.current.length; i++) {
  //     const point = points.current[i];
  //
  //     // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
  //     const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
  //     const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
  //     // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
  //     const x = mapNumber(nX, -1, 1, point.originX - 20, point.originX + 20);
  //     const y = mapNumber(nY, -1, 1, point.originY - 20, point.originY + 20);
  //
  //     // update the point's current coordinates
  //     point.x = x;
  //     point.y = y;
  //
  //     // progress the point's x, y values through "time"
  //     point.noiseOffsetX += noiseStep;
  //     point.noiseOffsetY += noiseStep;
  //
  //     newPoints.push(point);
  //   }
  //
  //   points.current = newPoints;
  // };

  const path = useComputedValue(() => {
    animate();
    const temp = spline(points.current, 1, true);
    // console.log(temp,'temp')
    return temp;
  }, [clock]);
  // }, []);

  const endGradientCoordinate = useComputedValue(()=>{
    endGradientOffset.current += noiseStep /2 ;
    const endNoise = noise(
      endGradientOffset.current,
      endGradientOffset.current
    )
    const newValue = mapNumber(endNoise,-1,1,0,360);
    return vec(256,newValue);
  },[clock]);



  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          // backgroundColor:'blue',
          // width:'100%',
          // height:'100%',
          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        <Canvas
          style={{
            // height: '100%',
            // width: '100%',
            height:260,
            width:260,
            // alignItems:'center',
            // justifyContent:'center'
          }}
        >
          <Path path={path}>
            <LinearGradient
              start={vec(0,0)}
              end={endGradientCoordinate}
              colors={['green', 'yellow']}
            />
          </Path>
        </Canvas>
      </View>

    </View>
  );
}

export default memo(SkiaTutorialScreen);


// import React from "react";
// import { SafeAreaView, StyleSheet } from "react-native";
//
// // @ts-ignore
// import { spline } from "@georgedoescode/spline";
//
// import {
//   Canvas,
//   LinearGradient,
//   Path,
//   useClockValue,
//   useComputedValue,
//   useValue,
//   vec,
// } from "@shopify/react-native-skia";
// import { createNoise2D } from "simplex-noise";
//
// function createPoints() {
//   const points = [];
//   // how many points do we need
//   const numPoints = 6;
//   // used to equally space each point around the circle
//   const angleStep = (Math.PI * 2) / numPoints;
//   // the radius of the circle
//   const rad = 110;
//
//   for (let i = 1; i <= numPoints; i++) {
//     // x & y coordinates of the current point
//     const theta = i * angleStep;
//
//     const x = 130 + Math.cos(theta) * rad;
//     const y = 130 + Math.sin(theta) * rad;
//
//     // store the point
//     points.push({
//       x: x,
//       y: y,
//       /* we need to keep a reference to the point's original {x, y} coordinates
//        for when we modulate the values later */
//       originX: x,
//       originY: y,
//       // more on this in a moment!
//       noiseOffsetX: Math.random() * 1000,
//       noiseOffsetY: Math.random() * 1000,
//     });
//   }
//
//   return points;
// }
//
// function map(
//   n: number,
//   start1: number,
//   end1: number,
//   start2: number,
//   end2: number
// ) {
//   return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
// }
//
// const MorphingCircle = () => {
//   const clock = useClockValue();
//   const points = useValue(createPoints());
//   const hueNoiseOffset = useValue(0);
//   const noise = createNoise2D();
//   const noiseStep = 0.005;
//
//   const animate = () => {
//     const newPoints = [];
//
//     for (let i = 0; i < points.current.length; i++) {
//       const point = points.current[i];
//
//       // return a pseudo random value between -1 / 1 based on this point's current x, y positions in "time"
//       const nX = noise(point.noiseOffsetX, point.noiseOffsetX);
//       const nY = noise(point.noiseOffsetY, point.noiseOffsetY);
//       // map this noise value to a new value, somewhere between it's original location -20 and it's original location + 20
//       const x = map(nX, -1, 1, point.originX - 20, point.originX + 20);
//       const y = map(nY, -1, 1, point.originY - 20, point.originY + 20);
//
//       // update the point's current coordinates
//       point.x = x;
//       point.y = y;
//
//       // progress the point's x, y values through "time"
//       point.noiseOffsetX += noiseStep;
//       point.noiseOffsetY += noiseStep;
//
//       newPoints.push(point);
//     }
//
//     points.current = newPoints;
//   };
//
//   const path = useComputedValue(() => {
//     animate();
//     return spline(points.current, 1, true);
//   }, [clock]);
//
//   const colorNoise = useComputedValue(() => {
//     hueNoiseOffset.current += noiseStep / 2;
//     const hueNoise = noise(hueNoiseOffset.current, hueNoiseOffset.current);
//     const newValue = map(hueNoise, -1, 1, 0, 360);
//     return vec(256, newValue);
//   }, [clock]);
//
//   return (
//     <SafeAreaView style={styles.container}>
//       <Canvas style={styles.canvas}>
//         <Path path={path}>
//           {/*<LinearGradient*/}
//           {/*  start={vec(0, 0)}*/}
//           {/*  end={colorNoise}*/}
//           {/*  colors={["green", "yellow"]}*/}
//           {/*/>*/}
//         </Path>
//       </Canvas>
//     </SafeAreaView>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   canvas: {
//     height: 275,
//     width: 275,
//   },
// });
//
// export default MorphingCircle;
