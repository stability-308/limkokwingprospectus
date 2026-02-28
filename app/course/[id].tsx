// app/course/[id].tsx

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import RatingButton from "../../components/RatingButton";
import VideoPlayer from "../../components/VideoPlayer";
import { Course, faculties } from "../../constants/coursesData";
import { useRatings } from "../../context/RatingsContext";

export default function CourseDetails() {
  const { id } = useLocalSearchParams();
  const { rateCourse, getRating } = useRatings();

  // Ensure id is a string
  const courseId = Array.isArray(id) ? id[0] : id;

  // Find course safely
  const course: Course | undefined = faculties
    .flatMap((faculty) => faculty.courses)
    .find((c) => c.id === courseId);

  if (!course) {
    return (
      <View style={styles.center}>
        <Text>Course not found</Text>
      </View>
    );
  }

  const currentRating = getRating(course.id);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Course Image */}
      <Image source={course.image} style={styles.image} />

      {/* Course Title */}
      <Text style={styles.title}>{course.name}</Text>

      {/* Course Description */}
      <Text style={styles.description}>{course.description}</Text>

      {/* Local Video Player */}
      {course.video ? <VideoPlayer videoUri={course.video} /> : null}

      {/* Minimum Requirements */}
      <View style={styles.requirementBox}>
        <Text style={styles.requirementTitle}>Minimum Requirements:</Text>
        <Text style={styles.requirementText}>{course.minimumRequirement}</Text>
      </View>

      {/* Rating Button */}
      <RatingButton
        rating={currentRating}
        onRate={() => rateCourse(course.id)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 18,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: "brown",
    lineHeight: 22,
  },
  requirementBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 12,
  },
  requirementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  requirementText: {
    fontSize: 15,
    color: "brown",
  },
});
