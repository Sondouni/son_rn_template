import * as React from "react";
import { memo, useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import Container from "../../../component/React-component/Container";
import TrackPlayer, { Event, State, usePlaybackState, usePlayWhenReady, useProgress } from "react-native-track-player";
import { SetupService } from "../../../../trackPlayer/SetupService";
import BasicText from "../../../component/React-component/BasicText";
import AntDesign from "react-native-vector-icons/AntDesign";
import { parseServerTime } from "../../../Utils";
import RNFS from "react-native-fs";

export interface Props {
  navigation: any;
}

const tempTrack = {
  // url: require('./tempMusic.mp4'), // Load media from the app bundle
  // url: 'https://image.flydesk.co.kr/orange-play/festival/tempMusic.mp4', // Load media from the app bundle
  url: `${RNFS.DocumentDirectoryPath}/tempMusic.mp4`, // Load media from the app bundle
  title: 'BUSAN',
  artist: 'Codeguts',
  artwork: 'https://image.flydesk.co.kr/orange-play/festival/djeans.jpeg', // Load artwork from the app bundle
};

const LOCAL_PATH_TO_MUSIC = `${RNFS.DocumentDirectoryPath}/tempMusic.mp4`;
const REMOTE_URI_OF_MUSIC = `https://image.flydesk.co.kr/orange-play/festival/kHOmyyPFlS`;

const events = [
  Event.PlaybackState,
  Event.PlaybackError,
];

function SoundPlayScreen({ navigation }: any) {

  const progress = useProgress();
  const playWhenReady = usePlayWhenReady();
  const playerState = usePlaybackState();

  const playingRef = useRef(null);

  useEffect(() => {
    console.log(playerState.state);
    if(playerState.state === State.Playing && playingRef.current !== State.Playing){
      playingRef.current = State.Playing;
      // getServerTime();
      if(ws.current){
        ws.current.send(JSON.stringify({type: 'handshake'}));
      }
    }
  },[playerState]);

  // useEffect(()=>{
  //   console.log(State,'?');
  //   if(State){
  //     getServerTime();
  //   }
  // },[State]);
  // const [playerState, setPlayerState] = useState(null)
  //
  // useTrackPlayerEvents(events, (event) => {
  //   if (event.type === Event.PlaybackError) {
  //     console.warn('An error occured while playing the current track.');
  //   }
  //   if (event.type === Event.PlaybackState) {
  //     console.log(event,'eventtrackplayerlistener');
  //     setPlayerState(event.state);
  //   }
  // });

  // const isPlaying = playerState === State.Playing;


  const ws = useRef(null);
  const wsInterval = useRef(null);
  const serverTimeRef = useRef(null);
  const startTimeRef = useRef(null);
  const playingTimeRef = useRef(null);

  const [playTime,setPlayTime] = useState(null);
  const [playErr,setPlayErr] = useState({ errNm:'',err:'' });
  // const [serverTime,setServerTime] = useState(null);

  const downloadMusic = async () => {
    await SetupService();

    const temp = RNFS.downloadFile({
      fromUrl: REMOTE_URI_OF_MUSIC,
      toFile: LOCAL_PATH_TO_MUSIC,
    });
    // console.log(temp,'temp');
    // temp.promise.then((res)=>console.log(res,'??'))
    temp.promise
      .then(async (res) => {
        console.log('successful video download!');

        await TrackPlayer.add([tempTrack]);
        //todo case2. 행사 진행후 페이지 진입
        // await TrackPlayer.play();
        console.log('??????');
        if(ws.current){
          ws.current.send(JSON.stringify({type: 'get_schedule', festival_id: '000'}));
        }
        TrackPlayer.addEventListener(Event.PlaybackState,async (event)=>{
          // console.log(event);
          if(event.state == 'playing'){
            // await TrackPlayer.play();
            // getServerTime();
          }
        });
        // await TrackPlayer.play();
        // getServerTime();

        // get a list of files and directories in the main bundle
        // RNFS.readDir(`${RNFS.DocumentDirectoryPath}`) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
        //   .then((result) => {
        //     console.log('GOT RESULT', result);
        //
        //     // stat the first file
        //     return Promise.all([RNFS.stat(result[0].path), result[0].path]);
        //   })
        //   .then((statResult) => {
        //     if (statResult[0].isFile()) {
        //       // if we have a file, read it
        //       return RNFS.readFile(statResult[1], 'utf8');
        //     }
        //
        //     return 'no file';
        //   })
        //   .then((contents) => {
        //     // log the file contents
        //     console.log(contents);
        //   })
        //   .catch((err) => {
        //     console.log(err.message, err.code);
        //   });
      }).catch((err) => {
      console.error(err.message, err.code)
    })
  }
  useEffect(()=>{
    connectSocket();
    wsInterval.current = setInterval(()=>{
      // if(ws.current)
      if(ws.current!==null){
        const tempPing = JSON.stringify({type: 'ping'});
        ws.current.send(tempPing);
      }
    },15000);
    return ()=> {
      clearInterval(wsInterval.current);
      if(ws.current!==null){
        ws.current.close();
      }
    }
  },[]);



  const connectSocket = () => {
    ws.current = new WebSocket(`ws://app.orange-play.co.kr/looster`);
    ws.current.onopen = () => {
      // connection opened
      console.log('connected');
    };
    ws.current.onmessage = async (e) => {
      const serverObj = JSON.parse(e.data);
      console.log(e.data,'onmessage');
      if(serverObj.type === 'event_time_updated') {
        eventUpdate(serverObj);
      }
      if(serverObj.type === 'handshake') {
        handShake(serverObj);
      }
      if(serverObj.type === 'schedule') {
        getSchedule(serverObj);
      }
    }
    ws.current.onclose = (reason) => {
      console.log(reason,'reason')
      ws.current = null;
    }
  }

  const eventUpdate = async (data) => {
    const startTime = parseServerTime(data.start_time);
    const serverTime = new Date(data.server_time);

    startTimeRef.current = startTime;
    serverTimeRef.current = serverTime;

    await TrackPlayer.play();
  }

  const handShake = async (data) => {
    if(startTimeRef.current){
      const serverTime = new Date(data.server_time);
      // const serverTime = new Date();
      const diffTime = (serverTime.getTime() - startTimeRef.current.getTime()) / (1000);
      if(diffTime>0){
        if(diffTime<playingTimeRef.current){
          if(playingRef.current==='playing'){
            await TrackPlayer.seekTo(diffTime).catch(e=>setPlayErr({ errNm: 'seekToError',err: e }));
            setPlayTime(diffTime);
            serverTimeRef.current = serverTime;
          }else {
            await TrackPlayer.play();
          }
        }
      }else {

      }
      // await TrackPlayer.play();


    }
  }

  const getSchedule = (data) => {
    const startTime = parseServerTime(data.schedules[0].start_time);
    startTimeRef.current = startTime;
    playingTimeRef.current = Number(data.schedules[0].runtime_sec);
    ws.current.send(JSON.stringify({type: 'handshake'}));
  }

  const getServerTime = async () => {
    ws.current = new WebSocket(`ws://app.orange-play.co.kr/looster`);
    ws.current.onmessage = async (e) => {
      const serverObj = JSON.parse(e.data);
      if(serverObj.schedules){
        const startTime = parseServerTime(serverObj.schedules[0].start_time);
        startTimeRef.current = startTime;

        const handShake = JSON.stringify({type: 'handshake'});
        ws.current.send(handShake);
      }
      if(serverObj.server_time){
        if(startTimeRef.current){
          const serverTime = new Date(serverObj.server_time);
          // const serverTime = new Date();
          console.log(serverTime);
          const diffTime = (serverTime.getTime() - startTimeRef.current.getTime()) / (1000);
          await TrackPlayer.seekTo(diffTime).catch(e=>setPlayErr({ errNm: 'seekToError',err: e }));
          // await TrackPlayer.play();

          setPlayTime(diffTime);
          serverTimeRef.current = serverTime;

        }
      }
    }
    ws.current.onopen = () => {
      // connection opened
      console.log('connected')
      // send a message
      const getSchedule = JSON.stringify({type: 'get_schedule', festival_id: '000'});
      ws.current.send(getSchedule);
    };
    // ws.current
  }

  const seekToMusic = () => {
    if(startTimeRef.current && serverTimeRef.current){
      const timeDiff = serverTimeRef.current.getTime() - startTimeRef.current.getTime();
    }
  }

  useEffect(() => {
    downloadMusic();

  }, []);


  return (
    <Container>
      <View
        style={{
          flex:1,
          alignItems: 'center',
          justifyContent:'center'
        }}
      >
        <View
          ref={(c) => {
          }}
          style={{
            backgroundColor:'#222222',
            width:300,
            height:200,
            borderRadius:10,
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <View
          >
            {/*<BasicText style={{}}>*/}
            {/*  The TrackPlayer is {isPlaying ? 'playing' : 'not playing'}*/}
            {/*</BasicText>*/}
            {/*<TouchableOpacity*/}
            {/*  onPress={async ()=>{*/}
            {/*    getServerTime();*/}
            {/*  }}*/}
            {/*>*/}
            {/*  <BasicText style={{fontWeight:'700',fontSize:15,color:'white'}}>*/}
            {/*    싱크맞추기*/}
            {/*  </BasicText>*/}
            {/*</TouchableOpacity>*/}
            <BasicText style={{fontWeight:'700',fontSize:15,color:'white'}}>
              {playTime}
            </BasicText>
            <BasicText style={{fontWeight:'700',fontSize:15,color:'white'}}>
              {playErr.errNm}
              {playErr.err}
            </BasicText>
          </View>
          <View
            style={{
              flexDirection:'row',
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <BasicText style={{fontWeight:'700',fontSize:15,color:'white'}}>
              {progress.position}
            </BasicText>
            <View>
              <TouchableOpacity
                onPress={async () =>{
                  await TrackPlayer.play();
                }}
              >
                <AntDesign name="caretright" color={'white'} size={40} />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={async () =>{
                  // await SetupService();
                  // await TrackPlayer.add([tempTrack]);
                  await TrackPlayer.pause();
                  // Event.RemoteSeek({ position:20 });

                }}
              >
                <AntDesign name="stepforward" color={'white'} size={40} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </View>

    </Container>
  );
}

export default memo(SoundPlayScreen);
