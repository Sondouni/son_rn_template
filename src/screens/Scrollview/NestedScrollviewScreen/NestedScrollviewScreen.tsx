import * as React from "react";
import { View } from "react-native";
import { memo } from "react";
import Container from "../../../component/React-component/Container";
import SyncedScrollView from "../../../component/React-component/SyncedScrollView";
import BasicText from "../../../component/React-component/BasicText";

export interface Props {
  navigation: any;
}

function NestedScrollviewScreen({ navigation }: any) {


  return (
    <Container>
      <View
        style={{
          flex:1
        }}
        ref={(c) => {
          console.log("NestedScrollviewScreen 열림");
        }}
      >
        <View
          style={{
            flex:1
          }}
        >
          <SyncedScrollView
            id={1}
            horizontal={true}
            showsVerticalScrollIndicator={false}
            bounces={false}
          >
            <TempContent width={100} height={'100%'} backgroundColor={'blue'}/>
          </SyncedScrollView>
        </View>

        <View
          style={{
            flex:6,
            flexDirection:'row'
          }}
        >
          <SyncedScrollView
            id={2}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <TempContent height={75} backgroundColor={'red'}/>
          </SyncedScrollView>
          <SyncedScrollView
            id={3}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            <TempContent height={150} backgroundColor={'yellow'}/>
          </SyncedScrollView>
        </View>
      </View>
    </Container>
  );
}

export default memo(NestedScrollviewScreen);

const TempContent = ( {backgroundColor,height,width} : {backgroundColor:string,height?:number,width?:number} ) =>{
  return(
    <>
      {[...Array(20)].map((_,i)=>(
        <View
          key={i}
          style={{
            height,
            width,
            backgroundColor,
            justifyContent:'center',
            alignItems:'center',
            // borderWidth:1,
            // borderColor:'white',
          }}
        >
          <BasicText>
            {i}
          </BasicText>
        </View>
      ))}
    </>
  )
}
