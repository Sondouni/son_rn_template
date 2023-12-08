import * as React from "react";
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { memo, useEffect } from "react";
import Container from "../../../component/React-component/Container";
import InfiniteScroll from "./InfiniteScrollComponent";
import { TAnimationStyle } from "react-native-reanimated-carousel/lib/typescript/layouts/BaseLayout";
import { interpolate } from "react-native-reanimated";
import { faker } from "@faker-js/faker";
import Carousel from "react-native-reanimated-carousel";
import BasicText from "../../../component/React-component/BasicText";

export interface Props {
  navigation: any;
}
const { width, height } = Dimensions.get("window");

function InfinityLoopScreen({ navigation }: any) {
  const headerHeight = 100;
  const scale = 0.9;

  const RIGHT_OFFSET = width * (1 - scale);

  const ITEM_WIDTH = width * scale;
  const ITEM_HEIGHT = 120;

  const PAGE_HEIGHT = height;
  // const PAGE_HEIGHT = height - headerHeight;
  const PAGE_WIDTH = width;

  const animationStyle: TAnimationStyle = React.useCallback(
    (value: number) => {
      "worklet";

      const translateY = interpolate(
        value,
        [-1, 0, 1],
        [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
      );
      const right = interpolate(
        value,
        [-1, -0.2, 1],
        [RIGHT_OFFSET / 2, RIGHT_OFFSET, RIGHT_OFFSET / 3],
      );
      return {
        transform: [{ translateY }],
        right,
      };
    },
    [RIGHT_OFFSET],
  );


  useEffect(()=>{
    // console.log(Platform.OS =='android'? `${faker.image.nature(PAGE_WIDTH, PAGE_HEIGHT)}?random=${Math.random()}`:'a');
  },[]);

  return (
    <View style={{ flex: 1 }}>

      {/*<Image*/}
      {/*  source={{*/}
      {/*    uri:*/}
      {/*      `${faker.image.nature(PAGE_WIDTH, PAGE_HEIGHT)*/}
      {/*      }?random=${*/}
      {/*        Math.random()}`,*/}
      {/*  }}*/}
      {/*  style={{*/}
      {/*    width: PAGE_WIDTH,*/}
      {/*    height: PAGE_HEIGHT,*/}
      {/*    position: "absolute",*/}
      {/*  }}*/}
      {/*/>*/}

      {/*<BlurView*/}
      {/*  intensity={80}*/}
      {/*  tint="dark"*/}
      {/*  style={{*/}
      {/*    width: PAGE_WIDTH,*/}
      {/*    height: PAGE_HEIGHT,*/}
      {/*    position: "absolute",*/}
      {/*  }}*/}
      {/*/>*/}
      <View
        style={{
          width:PAGE_WIDTH,
          height:PAGE_HEIGHT,
          position:'absolute',
          backgroundColor:'#8d8d8d'
        }}
      >

      </View>
      <Carousel
        loop
        vertical
        style={{
          justifyContent: "center",
          width: PAGE_WIDTH,
          height: PAGE_HEIGHT,
        }}
        width={ITEM_WIDTH}
        pagingEnabled={false}
        height={ITEM_HEIGHT}
        data={[...new Array(10).keys()]}
        renderItem={({ index }) => {
          return (
            <View key={index} style={{ flex: 1, padding: 10 }}>
              <View
                style={{
                  alignItems: "flex-start",
                  flex: 1,
                  justifyContent: "space-between",
                  flexDirection: "row",
                  borderRadius: 20,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                    source={{
                      uri:
                        `${faker.image.animals(20, 20)
                        }?random=${
                          Math.random()}`,
                    }}
                  />
                  <Text
                    numberOfLines={1}
                    style={{
                      maxWidth: ITEM_WIDTH * 0.3 - 40,
                      color: "white",
                    }}
                  >
                    {faker.animal.dog()}
                  </Text>
                </View>
                <View
                  style={{
                    width: ITEM_WIDTH * 0.6,
                    height: ITEM_HEIGHT - 20,
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    style={{
                      width: ITEM_WIDTH * 0.6,
                      height: ITEM_HEIGHT - 20,
                      borderRadius: 10,
                      marginRight: 5,
                    }}
                    source={{
                      uri:
                        `${faker.image.nature(
                          Math.round(
                            ITEM_WIDTH * 0.6,
                          ),
                          ITEM_HEIGHT - 20,
                        )
                        }?random=${
                          Math.random()}`,
                    }}
                  />
                </View>
              </View>
            </View>
            // <View
            //   style={{
            //     padding:10,
            //     flex:1,
            //     backgroundColor:'black'
            //   }}
            // >
            // </View>
          );
        }}
        customAnimation={animationStyle}
      />
      <View
        style={{
          position:'absolute',
          bottom:50,
          backgroundColor:'black',
          width:50,
          height:50,
          alignItems:'center',
          justifyContent:'center'
        }}
      >
        <TouchableOpacity
          onPress={()=>{
            navigation.goBack();
          }}
          style={{
            width:'100%',
            height:'100%',
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <BasicText style={{color:'white'}}>
            X
          </BasicText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default memo(InfinityLoopScreen);


