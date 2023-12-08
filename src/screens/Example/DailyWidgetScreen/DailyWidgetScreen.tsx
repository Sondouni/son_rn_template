import * as React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { memo, useEffect, useRef, useState } from "react";
import Container from "../../../component/React-component/Container";
import Ionicons from "react-native-vector-icons/Ionicons";
import BasicText from "../../../component/React-component/BasicText";
import {
  Canvas,
  Circle,
  Drawing,
  Group,
  Line,
  Paint,
  Path,
  Skia, StrokeCap,
  useComputedValue,
  useValue,
  vec
} from "@shopify/react-native-skia";
import Carousel from "react-native-reanimated-carousel";
import { useDerivedValue, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export interface Props {
  navigation: any;
}

const { width, height } = Dimensions.get("window");

function DailyWidgetScreen({ navigation }: any) {

  const tempSV = useSharedValue(5);

  const topScrollRef = useRef(null);
  const bottomScrollRef = useRef(null);

  const MINUTE_HANDLE_SIZE = 0.09;
  const HOUR_HANDLE_SIZE = 0.5;
  const R = 75;
  const circleR = 50;

  const curScrollIdx = useSharedValue(0);
  const minHandleX = useSharedValue(75);
  const minHandleY = useSharedValue(75);
  const clockAngle = useSharedValue(210);
  const clockHourAngle = useSharedValue(210);



  const dailyRoutine = [
    {
      time:'8:35',
      title:'Wake up',
      ampm:'am',
      icon:<MaterialCommunityIcons name={'bell-sleep'} size={40} color={'#e25151'}/>,
      r: useSharedValue(3),
      min:35,
      hour:8,
    },
    {
      time:'12:00',
      title:'Lunch',
      ampm:'pm',
      icon:<MaterialIcons name={'lunch-dining'} size={40} color={'#e25151'}/>,
      r: useSharedValue(3),
      min:0,
      hour:12,
    },
    {
      time:'14:10',
      title:'Take a break',
      ampm:'pm',
      icon:<MaterialIcons name={'free-breakfast'} size={40} color={'#e25151'}/>,
      r: useSharedValue(3),
      min:10,
      hour:2,
    },
    {
      time:'18:50',
      title:'drink',
      ampm:'pm',
      icon:<MaterialIcons name={'local-drink'} size={40} color={'#e25151'}/>,
      r: useSharedValue(3),
      min:50,
      hour:6,
    },
    {
      time:'21:30',
      title:'sleep',
      ampm:'pm',
      icon:<MaterialCommunityIcons name={'power-sleep'} size={40} color={'#e25151'}/>,
      r: useSharedValue(3),
      min:30,
      hour:9,
    },
    {
      time:'08:35',
      title:'Wake up',
      ampm:'am',
      icon:<MaterialCommunityIcons name={'bell-sleep'} size={40} color={'#e25151'}/>,
      r: useSharedValue(3),
      min:35,
      hour:8,
    },
    {
      time:'12:00',
      title:'Lunch',
      ampm:'pm',
      icon:<MaterialIcons name={'lunch-dining'} size={40} color={'#e25151'}/>,
      r: useSharedValue(3),
      min:0,
      hour:12,
    },
    {
      time:'14:10',
      title:'Take a break',
      ampm:'pm',
      icon:<MaterialIcons name={'free-breakfast'} size={40} color={'#e25151'}/>,
      r: useSharedValue(3),
      min:10,
      hour:2,
    },
    {
      time:'18:50',
      title:'drink',
      ampm:'pm',
      icon:<MaterialIcons name={'local-drink'} size={40} color={'#e25151'}/>,
      r: useSharedValue(3),
      min:50,
      hour:6,
    },
    {
      time:'21:30',
      title:'sleep',
      ampm:'pm',
      icon:<MaterialCommunityIcons name={'power-sleep'} size={40} color={'#e25151'}/>,
      r: useSharedValue(3),
      min:30,
      hour:9,
    },
  ]

  const linePathFn = () => {

    const linePath = Skia.Path.Make();
    // linePath.
    // linePath.moveTo(100,10);
    // linePath.lineTo(100);
    // linePath.lineTo(100,10);
    linePath.moveTo(0,10);
    linePath.lineTo(100,10)

    return linePath;
  }

  const hourHandPath = () => {

    const linePath = Skia.Path.Make();
    linePath.moveTo(75,75);
    linePath.lineTo(75,40)

    return linePath;
  }

  const minHandPath = () => {

    const linePath = Skia.Path.Make();
    linePath.moveTo(75,75);
    linePath.lineTo(120,30);
    // linePath.lineTo(75,30);
    setTimeout(()=>{
      const m = Skia.Matrix();

      m.translate(120,50);
      linePath.transform(m);
    },2000);

    return linePath;
  }

  const testPath = useComputedValue(() => {
    const p = Skia.Path.Make();
    p.moveTo(75,75);
    p.lineTo(75,30);

    const m = Skia.Matrix();
    // m.translate();
  },[]);

  const [currentSeconds, setCurrentSeconds] = useState(new Date().getSeconds());

  const ONE_SECOND_IN_MS = 1000;

  useEffect(() => {
    // const increaseSeconds = setInterval(() => {
    //   setCurrentSeconds((val) => val + 1 / 10);
    // }, ONE_SECOND_IN_MS / 10);

    // const increaseMinutes = setInterval(() => {
    //   setCurrentMinutes((val) => val + 1);
    // }, ONE_MINUTE_IN_MS);
    //
    // const increaseHours = setInterval(() => {
    //   setCurrentHours((val) => val + 1);
    // }, ONE_HOUR_IN_MS);

    return () => {
      // clearInterval(increaseSeconds);
      // clearInterval(increaseMinutes);
      // clearInterval(increaseHours);
    };
  }, [setCurrentSeconds]);

  function degreesToRadians(degrees: number) {
    'worklet'
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  const dailyRoutineList = useValue(dailyRoutine.map((item)=>item.min));

  const tempPoints = [];

  // return [{ rotate: degreesToRadians(curScrollIdx.value * 6) }];
  const secondsRotation = useDerivedValue(() => {
    'worklet'
    // for(let i = 0; i <dailyRoutine.length; i++) {
    //   if(i === curScrollIdx.value){
    //     const minAngle = dailyRoutine[i].min * 0.5;
    //     const minSin = Math.sin(minAngle * Math.PI / 180);
    //     const minCos = Math.cos(minAngle * Math.PI / 180);
    //
    //     // minHandleX.value = minCos * 25
    //     // minHandleY.value = minSin * 25
    //
    //   }
    // }
    // dailyRoutine.forEach((item,index)=>{
    //   if(index === curScrollIdx.value){
    //     const minAngle = item.min * 0.5;
    //     const minSin = Math.sin(minAngle * Math.PI / 180);
    //     const minCos = Math.cos(minAngle * Math.PI / 180);
    //
    //     // minHandleX.value = minCos * 25
    //     // minHandleY.value = minSin * 25
    //
    //   }
    // })
    // console.log(dailyRoutineList,'dailyRoutine')
    // console.log(curScrollIdx.value,'dailyRoutine')
    const minAngle = dailyRoutineList.current[curScrollIdx.value] * 6 -90;
    // console.log()
    // console.log(minAngle,dailyRoutineList.current[curScrollIdx.value]);
    const minSin = Math.sin(minAngle * (Math.PI / 180));
    const minCos = Math.cos(minAngle * (Math.PI / 180));
    //
    // console.log(minCos * 35 + R,minSin * 35 + R)
    minHandleX.value = withTiming(minCos * 35 +R,{duration:100});
    minHandleY.value = withTiming(minSin * 35 +R,{duration:100});
  }, [curScrollIdx]);


  return (
    <View
      ref={(c) => {
        // console.log("DailyWidgetScreen 열림");
      }}
      style={{
        flex:1,
        alignItems:'center',
        justifyContent: 'center'
      }}
    >
      <View
        style={{
          width:300,
          height:250,
          // borderRadius:30
        }}
      >
        <View
          style={{
            flex:1.2,
            backgroundColor:'#e25151',
            borderTopLeftRadius:30,
            borderTopRightRadius:30,
            zIndex:100,
            // flexDirection:'row'
          }}
        >
          <View
            style={{
              flexDirection:'row',
              flex:1
            }}
          >
            <View
              style={{
                flex:1,
              }}
            >
              <Canvas
                style={{
                  width:'100%',
                  height:'100%',
                  // backgroundColor:'#FFFFFF'
                }}
              >
                <Circle r={circleR} cx={R} cy={R} color={'rgb(193,81,81)'} >
                </Circle>
                {/*<Group*/}
                {/*  origin={{ x: 75, y: 75 }}*/}
                {/*  transform={secondsRotation}*/}
                {/*>*/}
                  {/*R = 75 -> 원 센터 좌표*/}
                <Drawing
                  drawing={({canvas})=>{
                    const paint = Skia.Paint();
                    paint.setStrokeWidth(4);
                    paint.setStrokeCap(StrokeCap.Round);

                    paint.setColor(Skia.Color('white'));
                    // paint.setColor(Skia.Color('blue'));

                    canvas.rotate(clockAngle.value,R,R);

                    canvas.drawLine(
                      R,
                      R,
                      R,
                      R-35,
                      paint
                    );
                    // canvas.save();
                    // canvas.restore();

                    // const hPaint = Skia.Paint();
                    // hPaint.setStrokeWidth(6);
                    // hPaint.setStrokeCap(StrokeCap.Round);
                    //
                    // hPaint.setColor(Skia.Color('white'));
                    // // paint.setColor(Skia.Color('blue'));
                    //
                    // canvas.rotate(clockHourAngle.value,R,R);
                    //
                    // canvas.drawLine(
                    //   R,
                    //   R,
                    //   R,
                    //   R-20,
                    //   hPaint
                    // );
                    // canvas.save();
                    // canvas.restore();

                  }}
                >
                </Drawing>
                <Drawing
                  drawing={({canvas})=>{
                    const hPaint = Skia.Paint();
                    hPaint.setStrokeWidth(6);
                    hPaint.setStrokeCap(StrokeCap.Round);

                    hPaint.setColor(Skia.Color('white'));
                    // paint.setColor(Skia.Color('blue'));

                    canvas.rotate(clockHourAngle.value,R,R);

                    canvas.drawLine(
                      R,
                      R,
                      R,
                      R-20,
                      hPaint
                    );
                    canvas.save();
                  }}
                >
                </Drawing>
                {/*  <Line*/}
                {/*    p1={vec(R, R)}*/}
                {/*    p2={vec(R, R-20)}*/}
                {/*    color="blue"*/}
                {/*    style="stroke"*/}
                {/*    strokeWidth={4}*/}
                {/*    strokeCap={'round'}*/}
                {/*    transform={[{ rotate: clockHourAngle.value,}]}*/}
                {/*  />*/}
                {/*</Group>*/}
                {/*<Path path={hourHandPath()} color={'white'} style={'stroke'} strokeWidth={4} strokeCap={'round'}/>*/}
                {/*<Path path={minHandPath()} color={'white'} style={'stroke'} strokeWidth={3} strokeCap={'round'}/>*/}

              </Canvas>
            </View>
            <View
              style={{
                flex:1,
                alignItems:'center',
                justifyContent:'center'
              }}
            >
              <Carousel
                enabled={false}
                ref={c=>topScrollRef.current = c}
                vertical={true}
                width={150}
                height={100}
                data={dailyRoutine}
                renderItem={({item,index})=>{
                  return(
                    <View
                      style={{
                        flex:1,
                        alignItems:'center',
                        justifyContent:'center'
                      }}
                    >
                      <View>
                        <View
                          style={{
                            flexDirection:'row',
                            alignItems:'flex-end',
                            // backgroundColor:'yellow'
                          }}
                        >
                          <BasicText style={{color:'white',fontSize:30,includeFontPadding:false,fontWeight:'700'}}>
                            {`${item.time}`}
                          </BasicText>
                          <BasicText style={{color:'white',fontSize:15,bottom:5}}>
                            {`${item.ampm}`}
                          </BasicText>
                        </View>
                        <View
                          style={{
                            // alignItems:'flex-start'
                          }}
                        >
                          <BasicText style={{color:'white',fontSize:20,fontWeight:'700'}}>
                            {`${item.title}`}
                          </BasicText>
                        </View>
                      </View>

                    </View>
                  )
                }}
                onProgressChange={(offsetProgress,absoluteProgress)=>{
                  // console.log(absoluteProgress,'top absoluteProgress')
                  console.log(absoluteProgress);
                  const curIdx = Math.ceil(absoluteProgress)==10?0:Math.ceil(absoluteProgress);

                  if(curScrollIdx.value!==curIdx){
                    clockAngle.value = withTiming(dailyRoutine[curIdx].min * 6,{duration:500})
                    clockHourAngle.value = withTiming(dailyRoutine[curIdx].hour * 30,{duration:500})
                    // console.log('??');
                    // console.log(curScrollIdx.value)
                    console.log(dailyRoutine[curIdx].time,curIdx,dailyRoutineList.current[curIdx]);
                    curScrollIdx.value = curIdx;
                    // curScrollIdx.value = withTiming(curIdx*10,{duration:500});
                  }

                }}
              />
            </View>
          </View>

          <View
            style={{
              position:'absolute',
              bottom:-18,
              // height:10,
              alignSelf: 'center',
              // width:15,
              borderBottomLeftRadius:10,
              borderBottomRightRadius:10,
            }}
          >
            <Ionicons name={'caret-down'} color={'#e25151'} size={35} />
          </View>
        </View>
        <View
          style={{
            flex:1,
            backgroundColor:'#ffdbdb',
            borderBottomLeftRadius:30,
            borderBottomRightRadius:30,
          }}
        >
          <View
            style={{
              height:'100%',
              // paddingHorizontal:5
            }}
          >
            <Carousel
              ref={r=>bottomScrollRef.current = r}
              autoPlay={true}
              vertical={false}
              pagingEnabled={true}
              defaultIndex={4}
              style={{
                height:'100%',
                width:'100%',
                // width:270,
                // justifyContent: "center",
                // backgroundColor:'yellow'
              }}
              width={100}
              // height={50}
              height={'100%'}
              data={dailyRoutine}
              renderItem={({item,index}) =>{
                return(
                  <View
                    style={{
                      flex:1,
                      alignItems:'center',
                      justifyContent:'flex-end',
                      paddingVertical:10
                    }}
                  >
                    {item.icon}
                    <Canvas
                      style={{
                        width:'100%',
                        height:20
                      }}
                    >
                      <Path path={linePathFn()} color={'#e25151'} style={'stroke'} strokeWidth={2.5} />
                      <Circle cx={50} cy={10} r={item.r} color={'#e25151'}/>
                      {/*<Circle cx={50} cy={10} r={item.r.value} color={'#e25151'}/>*/}
                    </Canvas>
                    <BasicText style={{
                      color:'#e25151',
                      fontWeight:'700',
                      fontSize:10
                    }}>
                      {`${item.time}`}
                    </BasicText>
                  </View>

                )
              }}
              onProgressChange={(offsetProgress, absoluteProgress)=>{
                if(topScrollRef.current){
                  let diffProgress = absoluteProgress - 4;
                  if(diffProgress<0){
                    // console.log((diffProgress),'AAAA');
                    diffProgress = absoluteProgress+6;
                  }
                  topScrollRef.current.scrollTo({index: diffProgress})
                }
                for(let i=0; i<dailyRoutine.length;i++){
                  const dayItme = dailyRoutine[i==dailyRoutine.length-1?0:i+1];

                  if(absoluteProgress === i){
                    // topScrollRef.current.scrollTo({count: absoluteProgress,animated:true})
                    // topScrollRef.current.next();

                    dayItme.r.value = withSpring(
                      6,
                      {
                        duration:500,
                        stiffness:1000,
                        velocity:150
                      })
                  }else {
                    dayItme.r.value = withTiming(3,{duration:100})
                  }

                }
                // dailyRoutine.forEach((item,index)=>{
                //   if(index !== dailyRoutine.length-1){
                //
                //   }else {
                //
                //   }
                //   if(absoluteProgress === index){
                //     console.log('AAAXZCXZC');
                //
                //     item.r.value = withTiming(10,{duration:100})
                //   }else {
                //     item.r.value = withTiming(5,{duration:100})
                //   }
                // })
                // console.log(offsetProgress,absoluteProgress);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default memo(DailyWidgetScreen);
