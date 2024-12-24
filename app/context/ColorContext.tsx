"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { generateRandomColor } from "../utils/colorUtils";

interface ColorContextProps {
  colors: string[];
  locked: boolean[];
  setColors: (colors: string[]) => void;
  setLocked: (locked: boolean[]) => void;
  regenerateColors: () => void;
  toggleLock: (index: number) => void;
}

const ColorContext = createContext<ColorContextProps | undefined>(undefined);

export const ColorContextProvider = ({ children }: { children: ReactNode }) => {
  const [colors, setColors] = useState<string[]>(
    Array.from({ length: 5 }, () => generateRandomColor())
  );
  const [locked, setLocked] = useState<boolean[]>(new Array(5).fill(false));

  const regenerateColors = () => {
    setColors((prevColors) =>
      prevColors.map((color, index) => (locked[index] ? color : generateRandomColor()))
    );
  };

  const toggleLock = (index: number) => {
    setLocked((prevLocked) => {
      const newLocked = [...prevLocked];
      newLocked[index] = !newLocked[index];
      return newLocked;
    });
  };

  return (
    <ColorContext.Provider value={{ colors, locked, setColors, setLocked, regenerateColors, toggleLock }}>
      {children}
    </ColorContext.Provider>
  );
};

export const useColorContext = () => {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColorContext must be used within a ColorContextProvider");
  }
  return context;
};
