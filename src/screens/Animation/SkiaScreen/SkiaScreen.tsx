import * as React from "react";
import { Easing, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { memo, useState } from "react";
import Container from "../../../component/React-component/Container";
import BasicText from "../../../component/React-component/BasicText";
import { Canvas, Drawing, Paint, runTiming, Skia, useImage, useValue } from "@shopify/react-native-skia";
import { makeImageParticles } from "../../../Utils";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export interface Props {
  navigation: any;
}

const FRICTION = 0.88;
const MOVE_SPEED = 0.88;

function SkiaScreen({ navigation }: any) {
  const {width:stageWidth,height:stageHeight} = useWindowDimensions();

  const transition = useValue(0);

  const [changeP,setChangeP] = useState(true);
  const [size,setSize] = useState(30);
  const [density,setDensity] = useState(35);

  // const image = useImage('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ0bSbdfdVkBB9IygMCnB0OmCsLsiPUg2rYg&usqp=CAU')
  // const image = useImage('https://www.vincentvangogh.org/images/paintings/self-portrait-with-bandaged-ear-and-pipe.jpg')
  const image = useImage('https://mblogthumb-phinf.pstatic.net/20150805_91/sah011120_1438744829175XC76y_JPEG/IMG_20121028_224713.jpg?type=w2')
  if(!image){
    return <></>
  }

  const pan = Gesture.Pan()
    .runOnJS(true)
    .onChange((e) => {
      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];
        const dx = e.x - particle.x;
        const dy = e.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = 100;
        if (dist < minDist) {
          // console.log(i,'i');
          const angle = Math.atan2(dy, dx);
          const tx = particle.x + Math.cos(angle) * minDist;
          const ty = particle.y + Math.sin(angle) * minDist;
          const ax = tx - e.x;
          const ay = ty - e.y;
          particle.vx -= ax;
          particle.vy -= ay;
          particle.isShow = false;
        }
      }
    });
    // .on

  const particles = makeImageParticles(image, density, size, stageWidth, stageHeight,changeP);
  // const particles = makeImageParticles(image, 35, 25, stageWidth, stageHeight);
  // console.log('AAA')
  return (
    // <Container>
    //   <View
    //     ref={(c) => {
    //       console.log("SkiaScreen 열림");
    //     }}
    //   >
    //     <BasicText>
    //       TEST
    //     </BasicText>
    //   </View>
    // </Container>
    <View
      style={{
        width:'100%',
        height:'100%'
      }}
    >
      <GestureDetector gesture={pan}>
        <Canvas
          // mode={'default'}
          mode={'continuous'}
          style={{
            width:stageWidth,
            height:stageHeight
          }}
        >
          {/*<Drawing*/}
          {/*  drawing={({ canvas }) => {*/}
          {/*    canvas.clear(Skia.Color('black'));*/}

          {/*    for (let i = 0; i < particles.length; i++) {*/}
          {/*      const particle = particles[i];*/}

          {/*      particle.x += (particle.savedX - particle.x) * MOVE_SPEED;*/}
          {/*      particle.y += (particle.savedY - particle.y) * MOVE_SPEED;*/}

          {/*      particle.vx *= FRICTION;*/}
          {/*      particle.vy *= FRICTION;*/}

          {/*      particle.x += particle.vx;*/}
          {/*      particle.y += particle.vy;*/}

          {/*      canvas.save();*/}
          {/*      canvas.translate(particle.x, particle.y);*/}
          {/*      canvas.drawPicture(particle.picture);*/}
          {/*      canvas.restore();*/}
          {/*    }*/}
          {/*  }}*/}
          {/*/>*/}
          <Drawing
            drawing={({canvas})=>{
              canvas.clear(Skia.Color('Black'));
              // console.log('실행?');
              for(let i=0; i<particles.length; i++){
                const particle = particles[i];

                if(true){
                  particle.x += (particle.savedX - particle.x) * MOVE_SPEED;
                  particle.y += (particle.savedY - particle.y) * MOVE_SPEED;

                  particle.vx *= FRICTION;
                  particle.vy *= FRICTION;

                  particle.x += particle.vx;
                  particle.y += particle.vy;

                  canvas.save();
                  canvas.translate(particle.x, particle.y);
                  // canvas.
                  if(!particle.isShow){
                    // runTiming(transition,1,{
                    //   duration:1000,
                    //   easing: Easing.inOut(Easing.cubic),
                    // })
                    canvas.rotate(720,10,20)
                  }

                  canvas.drawPicture(particle.picture);
                  canvas.restore();
                }

              }
            }}
          >
            {/*<Paint color="lightblue" />*/}
          </Drawing>
        </Canvas>
      </GestureDetector>
      <View
        style={{
          position:'absolute',
          right:50,
          bottom:150,
          backgroundColor:'white',
          borderRadius:20
        }}
      >
        <TouchableOpacity
          onPress={()=>{
            navigation.goBack();
          }}
        >
          <View
            style={{
              width:20,
              height:20,
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <BasicText>
              X
            </BasicText>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          position:'absolute',
          left:50,
          bottom:150,
          backgroundColor:'white',
          borderRadius:20
        }}
      >
        <TouchableOpacity
          onPress={()=>{
            setChangeP(!changeP);
          }}
        >
          <View
            style={{
              width:100,
              height:20,
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <BasicText>
              change
            </BasicText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(SkiaScreen);
