// context/RatingsContext.tsx
import React, { createContext, useContext, useState } from "react";

type RatingsType = {
  rateCourse: (courseId: string) => void;
  getRating: (courseId: string) => number;
};

const RatingsContext = createContext<RatingsType | undefined>(undefined);

export const RatingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  const rateCourse = (courseId: string) => {
    setRatings((prev) => {
      const current = prev[courseId] || 0;
      const next = current < 6 ? current + 1 : 0; // max 6, reset to 0
      return { ...prev, [courseId]: next };
    });
  };

  const getRating = (courseId: string) => {
    return ratings[courseId] || 0;
  };

  return (
    <RatingsContext.Provider value={{ rateCourse, getRating }}>
      {children}
    </RatingsContext.Provider>
  );
};

export const useRatings = () => {
  const context = useContext(RatingsContext);
  if (!context) {
    throw new Error("useRatings must be used inside RatingsProvider");
  }
  return context;
};
