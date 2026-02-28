// app/faculty/[id].tsx
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CourseCard from "../../components/CourseCard";
import { faculties } from "../../constants/coursesData";

export default function FacultyScreen() {
  const { id } = useLocalSearchParams();
  const faculty = faculties.find((f) => f.id === id);

  if (!faculty) {
    return (
      <View style={styles.container}>
        <Text>Faculty not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={faculty.courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },
  list: { padding: 16 },
});
