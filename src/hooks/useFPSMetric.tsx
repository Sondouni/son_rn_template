import { useEffect, useState } from "react";

type FrameData = {
  fps: number;
  lastStamp: number;
  framesCount: number;
  average: number;
  totalCount: number;
};
export type FPS = { average: FrameData["average"]; fps: FrameData["fps"] };

export function useFPSMetric(): FPS {
  const [frameState, setFrameState] = useState<FrameData>({
    fps: 0,
    lastStamp: Date.now(),
    framesCount: 0,
    average: 0,
    totalCount: 0,
  });

  useEffect(() => {
    // NOTE: timeout is here
    // because requestAnimationFrame is deferred
    // and to prevent setStates when unmounted
    let timeout: NodeJS.Timeout | null = null;

    requestAnimationFrame((): void => {
      timeout = setTimeout((): void => {
        const currentStamp = Date.now();
        const shouldSetState = currentStamp - frameState.lastStamp > 1000;

        const newFramesCount = frameState.framesCount + 1;
        // updates fps at most once per second
        if (shouldSetState) {
          const newValue = frameState.framesCount;
          const totalCount = frameState.totalCount + 1;
          // I use math.min here because values over 60 aren't really important
          // I calculate the mean fps incrementatally here instead of storing all the values
          const newMean = Math.min(frameState.average + (newValue - frameState.average) / totalCount, 60);
          setFrameState({
            fps: frameState.framesCount,
            lastStamp: currentStamp,
            framesCount: 0,
            average: newMean,
            totalCount,
          });
        } else {
          setFrameState({
            ...frameState,
            framesCount: newFramesCount,
          });
        }
      }, 0);
    });
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [frameState]);

  return { average: frameState.average, fps: frameState.fps };
}

// I then put this in a simple component at the root of the project and make it toggle-able.

  // Here is an example of that
// import React, { FunctionComponent } from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { useFPSMetric } from "./useFPSMetrics";
//
// const styles = StyleSheet.create({
//   text: { color: "white" },
//   container: { position: "absolute", top: 100, left: 8 },
// });
//
// export const FpsCounter: FunctionComponent<{ visible: boolean }> = ({ visible }) => {
//   const { fps, average } = useFPSMetric();
//   if (!visible) return null;
//   return (
//     <View pointerEvents={"none"} style={styles.container}>
//       <Text style={styles.text}>{fps} FPS</Text>
//       <Text style={styles.text}>{average.toFixed(2)} average FPS</Text>
//     </View>
//   );
// };
