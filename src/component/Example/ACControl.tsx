import * as React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    FlatList,
    useWindowDimensions,
    StatusBar,
    SafeAreaView, Platform,
    Animated, Linking, TextInput, Switch
} from "react-native";
import {Container, Header, Content} from '../../components';
import {Images} from '../../theme';
import {boardList} from '../../assets/data';
import styles from './Styles/BasicComponent';
import {useEffect, useRef, useState} from "react";
import instance from "../../helpers/axiosHelper";
import RenderHtml from 'react-native-render-html';
import {getCommaNum, getDate, getHeight, getWidth} from "../../libs/Utils";
import Carousel from "react-native-snap-carousel";
import Swiper from 'react-native-swiper'
import {ScrollView} from 'react-native-gesture-handler'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import Ionicons from "react-native-vector-icons/Ionicons";
import {Shadow} from 'react-native-shadow-2';
import YoutubePlayer from "react-native-youtube-iframe";
import WebView from "react-native-webview";
import {white} from "react-native-paper/lib/typescript/styles/colors";
import ProgressCircle from 'react-native-progress-circle'
import Slider from "@react-native-community/slider";
import BasicText from "../React-component/BasicText";

export interface Props {
    changeTemp: any;
    changeSpeed: any;
    speed: any;
}

const ACControl = ({changeTemp, changeSpeed, speed}: Props) => {


    return(
      <View style={{
          width:'100%',
          height:'30%',
          paddingHorizontal:20,
          justifyContent:'space-between'
      }}>
          <View style={{
              width:'100%',
              height:'48%' ,
              flexDirection:'row',
              justifyContent:'space-between'
          }}>
              <View style={{
                  width:'47%',
                  height:'100%',
                  backgroundColor:'#11111140',
                  paddingHorizontal:16,
                  borderRadius:14
              }}>
                  <BasicText
                    style={{
                        color:'#fff',
                        marginVertical:14,
                        fontSize:16
                    }}
                  >Speed</BasicText>
                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between'
                  }}>

                      {new Array(3).fill(0).map((_, index) => {
                          return   <TouchableOpacity style={{
                              height:36,
                              width:36,
                              borderRadius:18,
                              borderWidth:1,
                              borderColor:'#fff',
                              justifyContent:'center',
                              alignItems:'center',
                              backgroundColor:speed==index+1?'#fff':null
                          }}
                                                     onPress={
                                                         ()=>changeSpeed(index+1)
                                                     }
                          >
                              <BasicText style={{
                                  color:speed==index+1?"#000":'#fff',
                                  fontSize:16
                              }}>
                                  {index+1}
                              </BasicText>
                          </TouchableOpacity>

                      })}

                  </View>

              </View>
              <View style={{
                  width:'47%',
                  height:'100%',
                  backgroundColor:'#11111140',
                  paddingHorizontal:16,
                  borderRadius:14
              }}>
                  <BasicText
                    style={{
                        color:'#fff',
                        marginVertical:14,
                        fontSize:16
                    }}
                  >Power</BasicText>

                  <View style={{
                      flexDirection:'row',
                      justifyContent:'space-between',
                      height:36,
                      alignItems:'center'
                  }}>
                      <View style={{
                          flexDirection:'row',
                      }} >
                          <BasicText style={{
                              color:"#ddd",
                              fontWeight:'500'
                          }} >
                              OFF
                          </BasicText>
                          <BasicText style={{
                              color:"#ddd"
                          }} > / </BasicText>
                          <BasicText style={{
                              color:"#fff",
                              fontWeight:'500'
                          }} >
                              ON
                          </BasicText>
                      </View>
                      <Switch
                        value={false}
                        trackColor={{true:'red'}}
                        onValueChange={
                            (value)=>{


                            }
                        }
                        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                      />

                  </View>

              </View>

          </View>
          <View style={{
              width:'100%',
              height:'45%' ,

              backgroundColor:'#11111140',
              paddingHorizontal:16,
              borderRadius:14

          }}>
              <View style={{
                  paddingTop:16
              }}>
                  <BasicText style={{
                      color:'#fff',
                      fontSize:16
                  }}>
                      Temp
                  </BasicText>
              </View>
              <View style={{
                  flexDirection:'row',
                  alignItems:'center',
                  marginTop:5
              }}>
                  <BasicText style={{
                      color:'#fff',
                      fontSize:16,
                      width:'15%'
                  }}>
                      16℃
                  </BasicText>
                  <View style={{
                      width:'70%',
                      justifyContent:'center'
                  }}>
                      <Slider
                        style={{width: '100%', }}
                        minimumValue={0.5}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        value={0.5}
                        onValueChange={(value)=>{

                            changeTemp(value)
                        }}
                      />
                  </View>
                  <BasicText style={{
                      color:'#fff',
                      fontSize:16,
                      width:'15%',
                      textAlign:'right'
                  }}>
                      30℃
                  </BasicText>

              </View>



          </View>



      </View>

    )
}

export default ACControl;
