"use client";

import React, { useEffect } from "react";
import { LockIcon, UnlockIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { colord } from "colord";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Ensure you have this import for toast
import { Button } from "@/components/ui/button";
import { useColorContext } from "./context/ColorContext"; // Import the custom hook

const ColorBlock = ({ color, index, isLocked, toggleLock, title }: { 
  color: string; 
  index: number; 
  isLocked: boolean; 
  toggleLock: (index: number) => void; 
  title?: string; // Optional title prop
}) => {
  // Determine if the background color is light or dark
  const getTextColor = (color: string) => (colord(color).isDark() ? "white" : "black");
  const textColor = getTextColor(color);

  // Handle lock/unlock click
  const handleLockClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent the color block click event
    toggleLock(index); // Toggle lock state
    toast(`Color ${isLocked ? "unlocked" : "locked"}`); // Show toast message
  };

  // Handle click to copy color hex code to clipboard
  const handleClick = () => {
    navigator.clipboard.writeText(color); // Copy hex color to clipboard
    toast(`Copied ${color}`); // Show toast message
  };

  return (
    <div
      className="h-full w-1/5 flex flex-col justify-center items-center group relative cursor-pointer"
      style={{ backgroundColor: color, color: textColor }}
      onClick={handleClick} // Trigger copy on click
    >
      {/* Title (Primary / Secondary) */}
      {title && (
        <div className="font-bold text-lg mb-2" style={{ color: textColor }}>
          {title}
        </div>
      )}
      
      {/* Color Hex Code */}
      <div className="group-hover:opacity-100 opacity-0 transition-opacity ease-in font-bold" style={{ color: textColor }}>
        {color}
      </div>

      {/* Lock/Unlock Icon */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="absolute bottom-6">
            <div onClick={handleLockClick}>
              {isLocked ? (
                <LockIcon style={{ color: textColor }} />
              ) : (
                <UnlockIcon
                  className="group-hover:opacity-100 opacity-0 transition-opacity ease-in"
                  style={{ color: textColor }}
                />
              )}
            </div>
          </TooltipTrigger>
          <TooltipContent>{isLocked ? "Locked" : "Unlocked"}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const Page = () => {
  const router = useRouter();
  const { colors, locked, regenerateColors, toggleLock } = useColorContext(); // Use context

  // Handle spacebar press to regenerate colors
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.code === "Space") {
      regenerateColors();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [locked, regenerateColors]);

  // Navigate to dashboard with locked colors
  const navigateToDashboard = () => {
    const lockedColors = colors.filter((_, index) => locked[index]);
    router.push(`/dashboard?colors=${encodeURIComponent(lockedColors.join(","))}`);
  };

  return (
    <div className="h-screen">
      <div className="top-section h-[35%] relative">
        <Button onClick={navigateToDashboard} className="mt-4 ml-1">Visualize Colours</Button>
        <div className="absolute bottom-2 text-3xl">Click Space to generate colors!</div>
      </div>
      <div className="h-[60%] w-full flex text-black">
        {colors.map((color, index) => (
          <ColorBlock
            key={index}
            color={color}
            index={index}
            isLocked={locked[index]}
            toggleLock={toggleLock}
            title={index === 0 ? "Primary" : index === 1 ? "Secondary" : undefined} // Set title for first and second blocks
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
