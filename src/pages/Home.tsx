import { useState, useRef, useEffect, useCallback } from "react";
import Sidebar from "../components/layout/Sidebar";
import ExamplesGrid from "../components/examples/ExamplesGrid";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("line");
  const mainRef = useRef<HTMLElement>(null);
  const isScrollingRef = useRef(false);

  const handleCategoryClick = useCallback((categoryId: string) => {
    const element = document.getElementById(`section-${categoryId}`);
    if (element && mainRef.current) {
      isScrollingRef.current = true;
      setActiveCategory(categoryId);

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      // Reset scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    }
  }, []);

  // Handle scroll to update active category
  useEffect(() => {
    const mainElement = mainRef.current;
    if (!mainElement) return;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const sections = mainElement.querySelectorAll("[data-section]");
      let currentSection = "line";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const mainRect = mainElement.getBoundingClientRect();
        if (rect.top <= mainRect.top + 100) {
          currentSection = section.getAttribute("data-section") || "line";
        }
      });

      setActiveCategory(currentSection);
    };

    mainElement.addEventListener("scroll", handleScroll);
    return () => mainElement.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar
        selectedCategory={activeCategory}
        onCategoryChange={handleCategoryClick}
      />

      {/* Contenu principal */}
      <main ref={mainRef} className="flex-1 bg-[#f9f9f9] overflow-y-auto">
        <ExamplesGrid />
      </main>
    </div>
  );
}
