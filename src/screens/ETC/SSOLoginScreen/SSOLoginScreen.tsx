import * as React from "react";
import { Button, Linking, View } from "react-native";
import { memo, useEffect } from "react";
import Container from "../../../component/React-component/Container";
import axios from "axios";
import BasicText from "../../../component/React-component/BasicText";

export interface Props {
  navigation: any;
}

const CLIENT_ID = '08ecbafaa2dd1fe09d05bb4abe5d641b';

function SSOLoginScreen({ navigation }: any) {

  const [data, setData] = React.useState();

  const loginUrl = `https://auth.furo.one/login/${CLIENT_ID}`;

  const loginWithRedirect = async () => {
    Linking.openURL(loginUrl);
  };

  const authenticateWithCode = async (code) => {
    const { data } = await axios.post(
      'https://api.furo.one/sessions/code/authenticate',
      { code },
      { headers: { origin: 'sonTemplate://' } }
    );
    return data;
  };

  useEffect(()=>{
    Linking.addEventListener('url', ({ url }) => {
      const query = url.split('?');
      console.log(query,'query');
      if (query.length < 2) return;
      const [, code] = query[1].split('=');
      if (code) {
        (async () => {
          try {
            const response = await authenticateWithCode(code);
            console.log(response,'response');
            const { access_token } = response;
            if(access_token){
              setData(access_token);
              const userInfo = await axios.get('https://api.furo.one/users/me',{
                headers:{Authorization: `Bearer ${access_token}`}
              });
              console.log(userInfo.data,'userInfo');

              const naverInfo = await axios.get('https://api.furo.one/oauth/naver',{
                headers:{Authorization: `Bearer ${code}`}
              });
              console.log(userInfo.data,'userInfo');
              console.log(naverInfo.data,'naverInfo');
            }
            console.log('AAXZCXZCZXC')
          } catch (e) {
            console.log('error: ', e.response.data);
          }
        })();
      }
    });
  },[]);

  const naverWithCode = async () => {
    return await axios.get('https://api.furo.one/oauth/naver',{
      headers:{Authorization: `Bearer f3db1ea992407447da8ac15f407b8fd091f8cabc`}
      // headers:{Authorization: `Bearer ${CLIENT_ID}`}
      // headers:{Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI0ODE1ODBmNS1kNDgzLTQwOWUtOTZmYy1lOTY4YmE3NzE4OTMiLCJwaWQiOiIwOGVjYmFmYWEyZGQxZmUwOWQwNWJiNGFiZTVkNjQxYiIsInVlbSI6ImV6aWNsYW5kQG5hdmVyLmNvbSIsImlhdCI6MTcwMTI0MDU1MywiZXhwIjoxNzAxMjQ0MTUzfQ.KGjKYRGDMpC5bp1eQIloKpuiWWBDEMpNPgMt1ipCbcs`}
    }).catch((e)=>{
      console.log('error: ', e.response.data);
    });
  };

  const naverLoginFuro = async () => {
    const result = await naverWithCode();
    console.log(result);
  }

  return (
    <Container>
      <View
        style={{
          flex:1,
          alignItems:'center',
          justifyContent:'center'
        }}
        ref={(c) => {
          // console.log("SSOLoginScreen 열림");
        }}
      >
        <BasicText style={{ fontSize: 16, fontWeight: '600' }}>
          [Furo] React Native Tutorial
        </BasicText>
        <View style={{ marginTop: 10, width: '80%' }}>
          <BasicText>{data}</BasicText>
        </View>
        {!data ? (
          <Button title={'Sign In'} onPress={loginWithRedirect} />
        ) : (
          <Button title={'Clear'} onPress={() => setData()} />
        )}
        {/*<Button title={'NAVERTEST'} onPress={async () => {*/}
        {/*  await naverLoginFuro();*/}
      </View>
    </Container>
  );
}

export default memo(SSOLoginScreen);
