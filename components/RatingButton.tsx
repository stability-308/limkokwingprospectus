import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  rating: number;
  onRate: () => void;
};

export default function RatingButton({ rating, onRate }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onRate}>
      <Text style={styles.text}>⭐ Rate Course ({rating}/6)</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
