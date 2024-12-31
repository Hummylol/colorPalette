"use client";

import React from "react";
import { useColorContext } from "../context/ColorContext";
import { colord } from "colord";

const Navbar = ({ bgColor, textColor }: { bgColor: string; textColor: string }) => (
  <nav
    className="w-full p-4 flex justify-between items-center"
    style={{ backgroundColor: bgColor, color: textColor }}
  >
    <h1 className="text-xl font-bold">Sample Website</h1>
    <button
      className="py-2 px-4 border rounded-lg"
      style={{ backgroundColor: textColor, color: bgColor }}
    >
      Get Started
    </button>
  </nav>
);

const Footer = ({ bgColor, textColor }: { bgColor: string; textColor: string }) => (
  <footer
    className="w-full p-4 flex justify-center items-center"
    style={{ backgroundColor: bgColor, color: textColor }}
  >
    <p className="text-sm">© 2024 Sample Website. All rights reserved.</p>
  </footer>
);

const SampleWebsiteSection = ({ color, index }: { color: string; index: number }) => {
  const textColor = colord(color).isDark() ? "white" : "black";
  return (
    <div
      className="h-64 w-full p-4 rounded-lg"
      style={{ backgroundColor: color, color: textColor }}
    >
      <h2 className="text-xl font-bold">Section {index + 1}</h2>
      <p className="mt-2 text-base">
        Explore how this color can be used as a background for a website section.
      </p>
      <button
        className="mt-4 py-2 px-4 border rounded-lg"
        style={{ backgroundColor: textColor, color: color }}
      >
        Learn More
      </button>
    </div>
  );
};

const VisualizePage = () => {
  const { colors } = useColorContext();

  const headerColor = colors[4] || "#ffffff";
  const footerColor = colors[3] || "#000000";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar bgColor={headerColor} textColor={colord(headerColor).isDark() ? "white" : "black"} />
      <main className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {colors.map((color, index) => (
          <SampleWebsiteSection key={index} color={color} index={index} />
        ))}
      </main>
      <Footer bgColor={footerColor} textColor={colord(footerColor).isDark() ? "white" : "black"} />
    </div>
  );
};

export default VisualizePage;
