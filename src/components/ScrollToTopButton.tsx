import React, { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import { animateScroll as scroll } from "react-scroll"; // Importing react-scroll for smooth scrolling

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle scroll visibility
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 300);
  };

  // Function to scroll smoothly to the top using react-scroll
  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800, // Time to complete the scroll (in milliseconds)
      smooth: "easeInOutQuad", // Smooth scrolling effect
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 p-3 rounded-full bg-primary text-white shadow-md transition-opacity duration-300 transform ${
        isVisible ? "opacity-100 animate-bounce" : "opacity-0"
      }`}
    >
      <FiArrowUp className="w-6 h-6 animate-pulse" />
    </button>
  );
};

export default ScrollToTopButton;
