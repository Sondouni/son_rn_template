// import { useEffect, useState } from "react";
// import { Track, useTrackPlayerEvents } from "react-native-track-player";
// import { getActiveTrack } from "react-native-track-player/lib/trackPlayer";
//
// export const useActiveTrack = (): Track | undefined => {
//   const [track, setTrack] = useState<Track | undefined>();
//
//   // Sets the initial index (if still undefined)
//   useEffect(() => {
//     let unmounted = false;
//     getActiveTrack()
//       .then((initialTrack) => {
//         if (unmounted) return;
//         setTrack((track) => track ?? initialTrack ?? undefined);
//       })
//       .catch(() => {
//         // throws when you haven't yet setup, which is fine because it also
//         // means there's no active track
//       });
//     return () => {
//       unmounted = true;
//     };
//   }, []);
//
//   useTrackPlayerEvents(
//     [Event.PlaybackActiveTrackChanged],
//     async ({ track }) => {
//       setTrack(track ?? undefined);
//     }
//   );
//
//   return track;
// };
