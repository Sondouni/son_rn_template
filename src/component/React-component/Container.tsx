import * as React from "react";
import {
  SafeAreaView,
  StatusBar,
  View
} from "react-native";
import { DEFAULT_BACKGROUND_COLOR } from "../../Utils";

export interface Props {
  children?: any;
  statusBarColor?: any;
  indicatorColor?: any;
  lightContent?: any;
  backgroundColor?: any;
  ignoreStatusBar?: any;
}

/**
 *
 * status bar color 가 android에서만 사용가능 -> ios status bar color는 safeAreaView로 처리 (indicator 또한)
 *
 * */

function Container({
                     children,
                     statusBarColor = DEFAULT_BACKGROUND_COLOR,
                     indicatorColor,
                     lightContent = false,
                     backgroundColor = DEFAULT_BACKGROUND_COLOR,
                     ignoreStatusBar = false
                   }: Props) {


  return (
    <>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={lightContent ? "light-content" : "dark-content"}
        translucent={ignoreStatusBar}
      />
      {!ignoreStatusBar ?
        (
          <>
            <SafeAreaView style={{backgroundColor:statusBarColor}}/>
            {indicatorColor ?
                (
                  <SafeAreaView style={{ flex: 1, backgroundColor: indicatorColor }}>
                    <View
                      style={{
                        backgroundColor:backgroundColor,
                        flex:1
                      }}
                    >
                      {children}
                    </View>
                  </SafeAreaView>
                )
              :
                (
                  <View
                    style={{
                      backgroundColor:backgroundColor,
                      flex:1
                    }}
                  >
                    {children}
                  </View>
                )
            }


          </>
        )
        :
        (
          <View
            style={{
              backgroundColor:backgroundColor,
              flex:1
            }}
          >
            {children}
          </View>
        )
      }

    </>
  );
}

export default Container;
