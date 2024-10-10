/**
 * @format
 */

import { AppRegistry, Platform } from "react-native";
import App from './src/App';
import {name as appName} from './app.json';
import { Federated, Script, ScriptManager } from "@callstack/repack/client";
import * as TrackPlayer from "react-native-track-player/lib/trackPlayer";

// const resolveURL = Federated.createURLResolver({
//   containers: {
//     app1: 'http://localhost:9001/[name][ext]',
//   },
// });
//
// ScriptManager.shared.addResolver(async (scriptId, caller) => {
//   let url;
//   if (caller === 'main') {
//     url = Script.getDevServerURL(scriptId);
//   } else {
//     url = resolveURL(scriptId, caller);
//   }
//
//   if (!url) {
//     return undefined;
//   }
//
//   return {
//     url,
//     cache: false, // For development
//     query: {
//       platform: Platform.OS,
//     },
//   };
// });

TrackPlayer.registerPlaybackService(() => require('./trackPlayer/service'));



AppRegistry.registerComponent(appName, () => App);
