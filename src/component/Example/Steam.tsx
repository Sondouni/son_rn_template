import { AppState, Dimensions } from "react-native";
import {
  Canvas, Oval,
  useClockValue,
  useCanvas, BlurMask, useValue
} from "@shopify/react-native-skia";
import { useDerivedValue, useSharedValue, withDelay, withRepeat, withTiming } from "react-native-reanimated";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

/**
 * 1. 각 steam의 크기와 x좌표를 랜덤하게 잡아준다
 * 2. translate_y를 sharedValue로 선언해 index마다 delay를 줘 순서대로 떨어지게끔 만든다
 * 3. repeat로 반복적으로 보여주게 한다
 * 4. timing으로 y값을 조절해준다
 *
 *
 **/


const Steam = ({ index, total, speed, appStateVisible }) => {

  const steam_width = Math.round(Math.random() * 100) + 100;
  const steam_height = Math.round(Math.random() * 100) + 50;
  var position_x = Math.round(Math.random() * width);

  const clock = useClockValue();
  const translate_y = useSharedValue(0);


  const move_y = useDerivedValue(
    () => {
      return (
        (height / 5) + translate_y.value
      );
    },
    [clock]
  );

  useEffect(
    () => {
      position_x = Math.round(Math.random() * 350);
      translate_y.value = 0;
      translate_y.value =
        withDelay(index * 100,
          withRepeat(
            withTiming(height - (height / 3)
              , { duration: speed == 3 ? 700 : speed == 2 ? 1200 : 1700 })
            , -1, false)
        );
    }, [speed,appStateVisible]);


  return (

    <Oval x={position_x} y={move_y} width={steam_width} height={steam_height}
          opacity={0.4}
          color="#ffffff">
      <BlurMask blur={60} style="normal" />
    </Oval>


  );

};

export default Steam;
