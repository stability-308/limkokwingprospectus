import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Course } from "../constants/coursesData";

type Props = { course: Course };

export default function CourseCard({ course }: Props) {
  const imageSource =
    typeof course.image === "number" ? course.image : { uri: course.image };

  return (
    <Link
      href={{
        pathname: "/course/[id]",
        params: { id: String(course.id) },
      }}
      asChild
    >
      <TouchableOpacity style={styles.card}>
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
        <View style={styles.info}>
          <Text style={styles.name}>{course.name}</Text>
          <Text numberOfLines={2} style={styles.description}>
            {course.description}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 2,
  },
  image: { width: 100, height: 100 },
  info: { flex: 1, padding: 12 },
  name: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  description: { fontSize: 14, color: "#666" },
});
