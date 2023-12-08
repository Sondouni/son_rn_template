import { Animated } from "react-native";
import { createContext } from "react";


export const syncedScrollViewState = {
  activeScrollView : new Animated.Value(0),
  offsetPercent : new Animated.Value(0)
}

export const SyncedScrollViewContext = createContext(syncedScrollViewState);
