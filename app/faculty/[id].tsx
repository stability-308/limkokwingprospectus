import Logo from "@/assets/logo.png";
import { faculties } from "@/constants/coursesData";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FacultyPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const faculty = faculties.find((f) => f.id === id);

  if (!faculty) return <Text>Faculty not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={{ color: "white" }}>←</Text>
        </TouchableOpacity>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.headerTitle}>{faculty.name}</Text>
      </View>

      <View style={styles.content}>
        <Image source={faculty.image} style={styles.image} />
        <Text style={styles.description}>{faculty.description}</Text>

        <Text style={styles.sectionTitle}>Courses Offered</Text>
        {faculty.courses?.map((course) => (
          <TouchableOpacity
            key={course.id}
            style={styles.courseCard}
            onPress={() => router.push(`/course/${course.id}`)}
          >
            <Text style={styles.courseName}>{course.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8" },
  header: {
    backgroundColor: "#000",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: { marginRight: 10 },
  logo: { width: 35, height: 35, marginRight: 10, resizeMode: "contain" },
  headerTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  content: { padding: 20 },
  image: { width: "100%", height: 200, borderRadius: 16, marginBottom: 15 },
  description: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    marginBottom: 20,
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  courseCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  courseName: { fontSize: 16, fontWeight: "bold", color: "#222" },
});
