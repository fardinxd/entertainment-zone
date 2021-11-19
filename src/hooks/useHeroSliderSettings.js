import { useState, useEffect } from "react";

export const useHeroSliderSettings = () => {
  // Inner Width \\
  const [width, setWidth] = useState(window.innerWidth);

  // Window Resize Handler \\
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slider Gap & Padding \\
  let sliderGap, sliderPadding;
  if (width > 600) sliderGap = "1rem";
  if (width < 600) sliderGap = "0.5rem";
  if (width > 900) sliderPadding = "22%";
  if (width < 900) sliderPadding = "15%";
  if (width < 800) sliderPadding = "10%";
  if (width < 500) sliderPadding = "5%";

  // Slider settings \\
  const settings = {
    pagination: false,
    arrows: width > 600 ? true : false,
    type: "loop",
    rewind: true,
    autoplay: true,
    interval: 2500,
    gap: sliderGap,
    padding: sliderPadding,
  };

  return settings;
};
