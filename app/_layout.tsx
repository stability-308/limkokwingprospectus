// app/_layout.tsx
import { RatingsProvider } from "@/context/RatingsContext";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <RatingsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </RatingsProvider>
  );
}
