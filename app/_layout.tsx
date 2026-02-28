// app/_layout.tsx
import { Stack } from "expo-router";
import { RatingsProvider } from "../context/RatingsContext";

export default function RootLayout() {
  return (
    <RatingsProvider>
      <Stack />
    </RatingsProvider>
  );
}
