import { useState, useEffect } from "react";

export const useContentListSliderSettings = () => {
  // Inner Width \\
  const [width, setWidth] = useState(window.innerWidth);

  // Window Resize Handler \\
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slider Fixed-Width & Gap \\
  let fixedWidth, gap;
  if (width > 800) fixedWidth = "12rem";
  if (width < 800) fixedWidth = "11rem";
  if (width < 600) fixedWidth = "10rem";
  if (width < 500) fixedWidth = "9rem";
  if (width < 400) fixedWidth = "8rem";
  if (width < 350) fixedWidth = "7.5rem";
  if (width > 900) gap = "0.7rem";
  if (width < 900) gap = "0.6rem";
  if (width < 600) gap = "0.5rem";
  if (width < 400) gap = "0.4rem";

  // Slider Settings \\
  const settings = {
    pagination: false,
    arrows: false,
    fixedWidth: fixedWidth,
    gap: gap,
  };

  return settings;
};
