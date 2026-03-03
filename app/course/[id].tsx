// app/course/[id].tsx
import { Video } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import RatingButton from "../../components/RatingButton";
import { faculties } from "../../constants/coursesData";
import { useRatings } from "../../context/RatingsContext";

export default function CoursePage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { rateCourse, getRating } = useRatings();

  // Find the course in all faculties
  const course = faculties.flatMap((f) => f.courses).find((c) => c.id === id);

  if (!course) return <Text style={styles.notFound}>Course not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{course.name}</Text>

      {/* Course Image */}
      <Image source={course.image} style={styles.image} />

      {/* Course Description */}
      <Text style={styles.description}>{course.description}</Text>

      {/* Course Video */}
      <Video
        source={course.video}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping
      />

      {/* Minimum Requirement */}
      {course.minimumRequirement && (
        <Text style={styles.requirement}>
          Minimum Requirement: {course.minimumRequirement}
        </Text>
      )}

      {/* Rating Button */}
      <RatingButton
        rating={getRating(course.id)}
        onRate={() => rateCourse(course.id)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F8F8F8" },
  notFound: { marginTop: 50, textAlign: "center", fontSize: 18 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  image: { width: "100%", height: 200, borderRadius: 16, marginBottom: 15 },
  description: { fontSize: 14, color: "#555", marginBottom: 20 },
  video: { width: "100%", height: 250, borderRadius: 16, marginBottom: 20 },
  requirement: { fontSize: 14, color: "#333", marginBottom: 20 },
});
