/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  LogBox,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from "@react-navigation/native";
import { StackNavigator } from "./navigation/StackNavitator";
import { RecoilRoot } from "recoil";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FpsCounter } from "./screens/FpsCounter";



function App(): JSX.Element {
  LogBox.ignoreAllLogs(true);
  const linking = {
    prefixes: ['sonTemplate://', 'https://sonTemplate.com'],
    config: {
      screens: {
        Home: '*',
      },
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <RecoilRoot>
        {/*<FpsCounter visible={true} />*/}
        <NavigationContainer linking={linking}>
          <StackNavigator />
        </NavigationContainer>
      </RecoilRoot>
    </GestureHandlerRootView>
  );
}


export default App;
