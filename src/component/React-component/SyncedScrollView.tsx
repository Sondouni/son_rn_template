import React, { useContext, useEffect, useRef, useState } from "react";
import { Animated as RA } from "react-native";
import Animated, { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { ScrollViewProps } from 'deprecated-react-native-prop-types'
import { SyncedScrollViewContext } from "../../context/SyncedScrollViewContext";

interface SyncedScrollViewProps extends ScrollViewProps{
  id: number;
}

const SyncedScrollView = ({id, ...rest}: SyncedScrollViewProps) => {

  const {activeScrollView,offsetPercent} = useContext(SyncedScrollViewContext);

  const thisScrollOffset = new RA.Value(0);
  const scrollViewRef = useRef(null);

  const [scrollViewLength,setScrollViewLength] = useState(0);
  const [contentLength,setContentLength] = useState(0);

  const [scrollableLength,setScrollableLength] = useState(0);

  useEffect(()=>{
    //스크롤 가능한 길이
    setScrollableLength(contentLength-scrollViewLength);
  },[scrollViewLength,contentLength]);

  const handleLayout = ({nativeEvent:{layout:{width,height}}}) => {
    // 화면에 보이는 스크롤뷰 길이
    // console.log(rest.horizontal?width:height,'scroll',id);
    setScrollViewLength(rest.horizontal?width:height);
  }

  const handleContentSizeChange = (width:number,height:number) => {
    // 전체 리스트 길이
    // console.log(rest.horizontal?width:height,'content',id);
    setContentLength(rest.horizontal?width:height);
  }

  offsetPercent?.addListener(({value})=>{
    if(id!==activeScrollView._value && scrollableLength>0){
      // console.log(value,id)
      scrollViewRef.current?.scrollTo({[rest.horizontal?'x':'y']:value * scrollableLength,animated:false})
    }
  })

  thisScrollOffset.addListener(({value})=>{
    // console.log(value,'value',id);
    if(id===activeScrollView._value && scrollableLength>0){
      offsetPercent.setValue(value/scrollableLength);
    }
  })

  const handleTouchStart = () => {
    activeScrollView.setValue(id);
  }

  const onScroll = (event) => {
    const cOffset = event.nativeEvent.contentOffset;
    thisScrollOffset.setValue(rest.horizontal?cOffset.x:cOffset.y);
  }

  return (
    <Animated.ScrollView
      {...rest}
      ref={scrollViewRef}
      onLayout={handleLayout}
      onContentSizeChange={handleContentSizeChange}
      onScroll={onScroll}
      onTouchStart={handleTouchStart}
      scrollEventThrottle={16}
    />
  );
};

export default SyncedScrollView;
