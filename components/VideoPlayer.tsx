// components/VideoPlayer.tsx
import { ResizeMode, Video } from "expo-av";
import React from "react";
import { StyleSheet, View } from "react-native";

type Props = {
  videoUri: any; // Accepts require() local videos
};

export default function VideoPlayer({ videoUri }: Props) {
  const videoRef = React.useRef<Video>(null);

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={videoUri} // Can be local require() or remote URI
        style={styles.video}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginVertical: 10,
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    backgroundColor: "black",
  },
});
