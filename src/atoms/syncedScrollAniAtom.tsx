import {atom} from "recoil";
import  { useSharedValue,Value } from "react-native-reanimated";
import { Animated } from "react-native";


export const syncedScrollAniAtom = atom({
    key: 'syncedScrollAniAtom',
    default: {
        scrollOffsetPercent:new Animated.Value(0),
        activeScrollView:new Animated.Value(0),
    }
})
