import * as React from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    FlatList,
    useWindowDimensions,
    StatusBar,
    SafeAreaView, Platform,
    Animated, Linking, TextInput
} from 'react-native';
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
import NaverMapView, {Marker} from "react-native-nmap";
import {Switch} from "react-native-switch";
import BasicText from "../React-component/BasicText";

export interface Props {
    data: any;
}

function BasicComponent({
                     data
                 }: Props) {



    return (
        <View style={{}}>
            <BasicText style={}>

            </BasicText>
        </View>
    );
}

export default BasicComponent;
