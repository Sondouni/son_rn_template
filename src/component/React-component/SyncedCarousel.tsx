import React, { useContext, useEffect, useRef, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { DEFAULT_BACKGROUND_COLOR } from "../../Utils";
import { StyleProp } from "react-native/Libraries/StyleSheet/StyleSheet";
import { TextStyle } from "react-native/Libraries/StyleSheet/StyleSheetTypes";
import { SyncedScrollViewContext } from "../../context/SyncedScrollViewContext";
import { Animated as RA } from "react-native";
import Animated from "react-native-reanimated";
// import { ScrollViewProps } from "react-native";
import { ScrollViewProps } from 'deprecated-react-native-prop-types'
import { useRecoilValue } from "recoil";
import { syncedScrollAniAtom } from "../../atoms/syncedScrollAniAtom";
import Carousel, { TCarouselProps } from "react-native-reanimated-carousel";


interface SyncedScrollViewProps extends TCarouselProps<any>{
  id: number;
  syncedCarouselRef: any;
}

const SyncedCarousel = ({id,syncedCarouselRef, ...rest}: SyncedScrollViewProps) => {

  // const {activeScrollView,offsetPercent} = useContext(SyncedScrollViewContext);


  const [scrollViewLength,setScrollViewLength] = useState(0);
  const [contentLength,setContentLength] = useState(0);

  const [scrollableLength,setScrollableLength] = useState(0);

  const cRef = useRef(null);

  useEffect(()=>{
    //스크롤 가능한 길이
    setScrollableLength(contentLength-scrollViewLength);
  },[scrollViewLength,contentLength]);

  const handleLayout = ({nativeEvent:{layout:{width,height}}}) => {
    // 화면에 보이는 스크롤뷰 길이
    console.log(rest.vertical?height:width,'scroll',id);
    setScrollViewLength(rest.vertical?height:width);
  }

  const handleContentSizeChange = (width:number,height:number) => {
    // 전체 리스트 길이
    console.log(rest.vertical?height:width,'content',id);
    setContentLength(rest.vertical?height:width);
  }

  const scrollViewRef = useRef(null);

  // offsetPercent?.addListener(({value})=>{
  //   if(id!==activeScrollView._value && scrollableLength>0){
  //     // console.log(value,id)
  //     scrollViewRef.current?.scrollTo({[rest.horizontal?'x':'y']:value * scrollableLength,animated:false})
  //   }
  // })

  const offset = new RA.Value(0);

  // const handleScroll = RA.event(
  //   [
  //     {
  //       nativeEvent:
  //         {
  //           contentOffset:
  //             {
  //               [rest.horizontal?'x':'y']:offset
  //             }
  //         }
  //     }
  //     ],
  //   {useNativeDriver:true}
  // )

  // offset.addListener(({value})=>{
  //   // console.log(value,'value',id);
  //   if(id===activeScrollView._value && scrollableLength>0){
  //     offsetPercent.setValue(value/scrollableLength);
  //   }
  // })
  //
  // const handleTouchStart = () => {
  //   activeScrollView.setValue(id);
  // }

  // useCode(() => {
  //   return call([syncedScrollSv], (syncedScrollSv) => {
  //     console.log(syncedScrollSv,'syncedScrollSv')
  //   })
  // }, [syncedScrollSv])


  useEffect(()=>{

  },[]);

  return (
    <Carousel
      {...rest}
      ref={cRef}
      // onLayout={handleLayout}
      // onContentSizeChange={handleContentSizeChange}
      // onScroll={handleScroll}
      scrollEventThrottle={16}
    />
  );
};

export default SyncedCarousel;
