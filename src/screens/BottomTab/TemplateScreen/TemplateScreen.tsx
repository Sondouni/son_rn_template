import * as React from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { memo, useContext, useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import BasicText from "../../../component/React-component/BasicText";
import Container from "../../../component/React-component/Container";
import { SyncedScrollViewContext } from "../../../context/SyncedScrollViewContext";
import { SetupService } from "../../../../trackPlayer/SetupService";
import TrackPlayer from "react-native-track-player";

export interface Props {
  navigation: any;
}

const tempTrack = {
  // url: require('./tempMusic.mp4'), // Load media from the app bundle
  url: 'https://image.flydesk.co.kr/orange-play/festival/tempMusic.mp4', // Load media from the app bundle
  title: 'BUSAN',
  artist: 'Codeguts',
  artwork: 'https://image.flydesk.co.kr/orange-play/festival/djeans.jpeg', // Load artwork from the app bundle
  duration: 166
};

function TemplateScreen({ navigation }: any) {

  useEffect(()=>{
    (async () => {

      // await TrackPlayer.play();
      // await TrackPlayer.pause();
      // await TrackPlayer.seekTo(playTime);
      // await TrackPlayer.play();
    })();
  },[]);

  return (
    <Container>
      <View
        style={{
          paddingVertical:10,
          // paddingHorizontal:20
        }}
        ref={(c) => {
          console.log("TemplateScreen 열림");
        }}
      >
        <View>
          <BasicText
            style={{
              paddingVertical:10,
              fontWeight:'700',
              fontSize:30,
              paddingHorizontal:20
            }}
          >
            Son's Template
          </BasicText>
        </View>
        <ScrollView
          contentContainerStyle={{
            paddingBottom:100
          }}
        >
          {/*스크롤뷰*/}
          <View>
            <View
              style={{
                paddingVertical:10,
                paddingHorizontal:20
              }}
            >
              <BasicText
                style={{
                  fontSize:15,
                  fontWeight:'700'
                }}
              >
                ScrollView
              </BasicText>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NestedScrollview');
                }}
              >
                <View
                  style={{
                    alignItems:'center',
                    paddingHorizontal:20,
                  }}
                >
                  <View
                    style={{
                      paddingVertical:20
                    }}
                  >
                    <MaterialCommunityIcons name="transit-connection-variant" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    NestedScrollView
                  </BasicText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Interpolate');
                }}
              >
                <View
                  style={{
                    alignItems:'center',
                    paddingHorizontal:20,
                  }}
                >
                  <View
                    style={{
                      paddingVertical:20
                    }}
                  >
                    <Fontisto name="slides" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    Interpolate
                  </BasicText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('InterpolateJoin');
                }}
              >
                <View
                  style={{
                    alignItems:'center',
                    paddingHorizontal:20,
                  }}
                >
                  <View
                    style={{
                      paddingVertical:20
                    }}
                  >
                    <Fontisto name="slides" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    Interpolate_Join
                  </BasicText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('InfinityLoop');
                }}
              >
                <View
                  style={{
                    alignItems:'center',
                    paddingHorizontal:20,
                  }}
                >
                  <View
                    style={{
                      paddingVertical:20
                    }}
                  >
                    <MaterialCommunityIcons name="infinity" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    Infinity Loop
                  </BasicText>
                </View>
              </TouchableOpacity>

            </ScrollView>
          </View>

          {/*애니메이션*/}
          <View
            style={{
              marginTop:30
            }}
          >
            <View
              style={{
                paddingVertical:10,
                paddingHorizontal:20
              }}
            >
              <BasicText
                style={{
                  fontSize:15,
                  fontWeight:'700'
                }}
              >
                Animation
              </BasicText>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SkiaTutorial');
                }}
              >
                <View
                  style={{
                    alignItems:'center',
                    paddingHorizontal:20,
                  }}
                >
                  <View
                    style={{
                      paddingVertical:20
                    }}
                  >
                    <MaterialCommunityIcons name="animation-play" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    Skia Animation - Tutorial
                  </BasicText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SkiaTutorial2');
                }}
              >
                <View
                  style={{
                    alignItems:'center',
                    paddingHorizontal:20,
                  }}
                >
                  <View
                    style={{
                      paddingVertical:20
                    }}
                  >
                    <MaterialCommunityIcons name="animation-play" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    Skia Animation - Tutorial2
                  </BasicText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SkiaTutorial3');
                }}
              >
                <View
                  style={{
                    alignItems:'center',
                    paddingHorizontal:20,
                  }}
                >
                  <View
                    style={{
                      paddingVertical:20
                    }}
                  >
                    <MaterialCommunityIcons name="animation-play" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    Skia Animation - Tutorial3
                  </BasicText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SkiaTutorial4');
                }}
              >
                <View
                  style={{
                    alignItems:'center',
                    paddingHorizontal:20,
                  }}
                >
                  <View
                    style={{
                      paddingVertical:20
                    }}
                  >
                    <MaterialCommunityIcons name="animation-play" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    Skia Animation - Tutorial4
                  </BasicText>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Skia');
                }}
              >
                <View
                  style={{
                    alignItems:'center',
                    paddingHorizontal:20,
                  }}
                >
                  <View
                    style={{
                      paddingVertical:20
                    }}
                  >
                    <MaterialCommunityIcons name="animation-play" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    Skia Animation
                  </BasicText>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  alignItems:'center',
                  paddingHorizontal:20,
                }}
              >
                <View
                  style={{
                    paddingVertical:20
                  }}
                >
                  <MaterialIcons name="folder-shared" color={'black'} size={40} />
                </View>
                <BasicText
                  style={{
                    fontSize:13,
                    fontWeight:'500'
                  }}
                >
                  sharedTransition
                </BasicText>
              </View>
              <View
                style={{
                  alignItems:'center',
                  paddingHorizontal:20,
                }}
              >
                <View
                  style={{
                    paddingVertical:20
                  }}
                >
                  <AntDesign name="layout" color={'black'} size={40} />
                </View>
                <BasicText
                  style={{
                    fontSize:13,
                    fontWeight:'500'
                  }}
                >
                  LayoutAnimation
                </BasicText>
              </View>
              <View
                style={{
                  alignItems:'center',
                  paddingHorizontal:20,
                }}
              >
                <View
                  style={{
                    paddingVertical:20
                  }}
                >
                  <MaterialCommunityIcons name="gesture-tap-box" color={'black'} size={40} />
                </View>
                <BasicText
                  style={{
                    fontSize:13,
                    fontWeight:'500'
                  }}
                >
                  Gesture
                </BasicText>
              </View>
            </ScrollView>
          </View>


          {/*etc*/}
          <View
            style={{
              marginTop:30
            }}
          >
            <View
              style={{
                paddingVertical:10,
                paddingHorizontal:20
              }}
            >
              <BasicText
                style={{
                  fontSize:15,
                  fontWeight:'700'
                }}
              >
                ETC
              </BasicText>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  alignItems:'center',
                  paddingHorizontal:20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SSOLogin');
                  }}
                >
                  <View
                    style={{
                      alignItems:'center',
                      paddingVertical:20
                    }}
                  >
                    <MaterialIcons name="login" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    SSO Login
                  </BasicText>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SoundPlay');
                }}
              >
                <View
                  style={{
                    alignItems:'center',
                    paddingHorizontal:20,
                  }}
                >

                  <View
                    style={{
                      alignItems:'center',
                      paddingVertical:20
                    }}
                  >
                    <MaterialIcons name="play-circle" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    Sound Play
                  </BasicText>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/*Example*/}
          <View
            style={{
              marginTop:30
            }}
          >
            <View
              style={{
                paddingVertical:10,
                paddingHorizontal:20
              }}
            >
              <BasicText
                style={{
                  fontSize:15,
                  fontWeight:'700'
                }}
              >
                Example
              </BasicText>
            </View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View
                style={{
                  alignItems:'center',
                  paddingHorizontal:20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SmartAC');
                  }}
                >
                  <View
                    style={{
                      alignItems:'center',
                      paddingVertical:20
                    }}
                  >
                    <MaterialCommunityIcons name="hydraulic-oil-temperature" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    smartAC
                  </BasicText>
                </TouchableOpacity>

              </View>

              <View
                style={{
                  alignItems:'center',
                  paddingHorizontal:20,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('DailyWidget');
                  }}
                >
                  <View
                    style={{
                      alignItems:'center',
                      paddingVertical:20
                    }}
                  >
                    <MaterialCommunityIcons name="widgets" color={'black'} size={40} />
                  </View>
                  <BasicText
                    style={{
                      fontSize:13,
                      fontWeight:'500'
                    }}
                  >
                    Daily Widget
                  </BasicText>
                </TouchableOpacity>

              </View>
            </ScrollView>
          </View>


        </ScrollView>
      </View>
    </Container>
  );
}

export default memo(TemplateScreen);
