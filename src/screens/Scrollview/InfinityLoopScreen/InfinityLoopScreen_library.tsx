import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { memo } from "react";
import Container from "../../../component/React-component/Container";
import InfiniteScroll from "./InfiniteScrollComponent";

export interface Props {
  navigation: any;
}

function InfinityLoopScreen({ navigation }: any) {


  return (
    <View style={styles.container}>
      <InfiniteScroll
        data={[{ key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' }, { key: '6' }, { key: '7' }]}
        renderItem={({ item }) => <View style={styles.listItem}><Text style={styles.text}>{item.key}</Text></View>}
      />

    </View>
  );
}

export default memo(InfinityLoopScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 50,
    margin: 2,
    borderColor: '#0099A8',
    borderWidth: 10,
    backgroundColor: '#FEFEFE'
  },
  text: {
    color: '#0099A8',
    fontSize: 32,
    fontWeight: 'bold'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
