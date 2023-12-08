import { createNativeStackNavigator } from "@react-navigation/native-stack";

//stack screen
import { TabNavigator } from "./BottomTabNavitator";
import SSOLoginScreen from "../screens/ETC/SSOLoginScreen/SSOLoginScreen";
import NestedScrollviewScreen from "../screens/Scrollview/NestedScrollviewScreen/NestedScrollviewScreen";
import InterpolateScreen from "../screens/Scrollview/InterpolateScreen/InterpolateScreen";
import { InterpolateJoinComponent } from "../component/InterpolateComponent/InterpolateJoinComponent";
import InterpolateJoinScreen from "../screens/Scrollview/InterpolateJoinScreen/InterpolateJoinScreen";
import SkiaScreen from "../screens/Animation/SkiaScreen/SkiaScreen";
import SkiaTutorialScreen from "../screens/Animation/SkiaTutorialScreen/SkiaTutorialScreen";
import SkiaTutorial2Screen from "../screens/Animation/SkiaTutorial2Screen/SkiaTutorial2Screen";
import SkiaTutorial3Screen from "../screens/Animation/SkiaTutorial3Screen/SkiaTutorial3Screen";
import SkiaTutorial4Screen from "../screens/Animation/SkiaTutorial4Screen/SkiaTutorial4Screen";
import SmartACScreen from "../screens/Example/SmartACScreen/SmartACScreen";
import DailyWidgetScreen from "../screens/Example/DailyWidgetScreen/DailyWidgetScreen";
import InfinityLoopScreen from "../screens/Scrollview/InfinityLoopScreen/InfinityLoopScreen";


const Stack = createNativeStackNavigator();


export const StackNavigator = () => {

  return (
    <Stack.Navigator
      initialRouteName={"BottomTab"}
    >

      <Stack.Screen
        name={"BottomTab"}
        component={TabNavigator}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"SSOLogin"}
        component={SSOLoginScreen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"NestedScrollview"}
        component={NestedScrollviewScreen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"Interpolate"}
        component={InterpolateScreen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"InterpolateJoin"}
        component={InterpolateJoinScreen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"Skia"}
        component={SkiaScreen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"SkiaTutorial"}
        component={SkiaTutorialScreen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"SkiaTutorial2"}
        component={SkiaTutorial2Screen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"SkiaTutorial3"}
        component={SkiaTutorial3Screen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"SkiaTutorial4"}
        component={SkiaTutorial4Screen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"SmartAC"}
        component={SmartACScreen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"DailyWidget"}
        component={DailyWidgetScreen}
        options={{
          headerShown:false
        }}
      />

      <Stack.Screen
        name={"InfinityLoop"}
        component={InfinityLoopScreen}
        options={{
          headerShown:false
        }}
      />

      {/*<Stack.Screen*/}
      {/*  name={"SharedStackScreen"}*/}
      {/*  component={SharedStackScreen}*/}
      {/*  options={{*/}
      {/*    animation:'fade',*/}
      {/*    headerShown:false*/}
      {/*  }}*/}
      {/*/>*/}

    </Stack.Navigator>
  );
};
