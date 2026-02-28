// app/quiz.tsx
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const questions = [
  {
    question:
      "Do you enjoy solving logical problems and working with computers?",
    facultyId: "f1",
  },
  {
    question: "Are you interested in business and management?",
    facultyId: "f2",
  },
  {
    question: "Do you have a creative side and enjoy visual arts?",
    facultyId: "f3",
  },
  {
    question: "Are you fascinated by how things work and building structures?",
    facultyId: "f4",
  },
  {
    question: "Do you enjoy writing, storytelling, or public speaking?",
    facultyId: "f5",
  },
];

// Faculty mapping for better display
const facultyNames: Record<string, string> = {
  f1: "FICT (Faculty of Information and Communication Technology)",
  f2: "FABE (Faculty of Accounting, Business and Economics)",
  f3: "Faculty of Broadcasting",
  f4: "FCTH (Faculty of Creative Technology and Heritage)",
};

export default function QuizScreen() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const resetQuiz = () => {
    setIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (answer: "yes" | "no") => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (index + 1 < questions.length) {
      // Move to next question
      setIndex(index + 1);
    } else {
      // Calculate which faculty got the most 'yes' answers
      const facultyScores: Record<string, number> = {};

      questions.forEach((q, i) => {
        if (newAnswers[i] === "yes") {
          facultyScores[q.facultyId] = (facultyScores[q.facultyId] || 0) + 1;
        }
      });

      // Find the faculty with the highest score
      let recommendedFaculty: string | null = null;
      let maxScore = 0;

      Object.entries(facultyScores).forEach(([facultyId, score]) => {
        if (score > maxScore) {
          maxScore = score;
          recommendedFaculty = facultyId;
        }
      });

      // Show recommendation
      if (recommendedFaculty && maxScore > 0) {
        Alert.alert(
          "🎓 Faculty Recommendation!",
          `Based on your answers, you might be interested in the ${facultyNames[recommendedFaculty]}. Would you like to view available courses?`,
          [
            {
              text: "Retake Quiz",
              style: "cancel",
              onPress: resetQuiz,
            },
            {
              text: " View Courses",
              onPress: () => {
                resetQuiz();
                router.push(`/faculty/${recommendedFaculty}`);
              },
            },
          ],
        );
      } else {
        Alert.alert(
          " No Clear Match",
          'Try answering "Yes" to some questions to get a better recommendation.',
          [
            {
              text: "Try Again",
              onPress: resetQuiz,
            },
          ],
        );
      }
    }
  };

  // If no questions (shouldn't happen, but just in case)
  if (!questions.length) {
    return (
      <View style={styles.container}>
        <Text>No questions available</Text>
      </View>
    );
  }

  const current = questions[index];
  const progress = ((index + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Career Quiz</Text>
        <Text style={styles.progressText}>
          Question {index + 1} of {questions.length}
        </Text>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.question}>{current.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[styles.option, styles.yesOption]}
          onPress={() => handleAnswer("yes")}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>Yes ✓</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, styles.noOption]}
          onPress={() => handleAnswer("no")}
          activeOpacity={0.7}
        >
          <Text style={styles.optionText}>No ✗</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={resetQuiz}>
        <Text style={styles.resetButtonText}>Reset Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: "#666",
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 2,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  questionContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  question: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
    lineHeight: 32,
  },
  optionsContainer: {
    padding: 20,
    paddingBottom: 20,
  },
  option: {
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  yesOption: {
    backgroundColor: "#4CAF50",
  },
  noOption: {
    backgroundColor: "#f44336",
  },
  optionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  resetButton: {
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
  },
  resetButtonText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});
