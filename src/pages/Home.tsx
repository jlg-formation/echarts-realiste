import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import Sidebar from "../components/layout/Sidebar";
import ExamplesGrid from "../components/examples/ExamplesGrid";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // Lire le hash initial de l'URL (ex: #bar -> bar)
  const getInitialCategory = () => {
    const hash = location.hash.replace("#", "");
    return hash || "line";
  };

  const [activeCategory, setActiveCategory] = useState(getInitialCategory);
  const mainRef = useRef<HTMLElement>(null);
  const isScrollingRef = useRef(false);
  const isInitialScrollDone = useRef(false);

  // Scroll instantané vers une section (sans animation)
  const scrollToSectionInstant = useCallback((categoryId: string) => {
    const element = document.getElementById(`section-${categoryId}`);
    if (element && mainRef.current) {
      setActiveCategory(categoryId);

      // Offset pour que le titre soit visible (pas masqué par le padding)
      const offset = 60;
      const targetPosition = element.offsetTop - offset;
      mainRef.current.scrollTop = targetPosition;
    }
  }, []);

  // Scroll vers une section avec animation
  const scrollToSectionAnimated = useCallback(
    (categoryId: string) => {
      const element = document.getElementById(`section-${categoryId}`);
      if (element && mainRef.current) {
        isScrollingRef.current = true;
        setActiveCategory(categoryId);

        // Mettre à jour l'URL avec le hash (sans recharger la page)
        navigate(`/#${categoryId}`, { replace: true });

        // Scroll rapide avec easing
        // Offset pour que le titre soit visible (pas masqué par le padding)
        const offset = 60;
        const targetPosition = element.offsetTop - offset;
        const startPosition = mainRef.current.scrollTop;
        const distance = targetPosition - startPosition;
        const duration = 200; // 200ms pour un scroll rapide
        let startTime: number | null = null;

        // Fonction easing (ease-in-out)
        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animateScroll = (currentTime: number) => {
          if (startTime === null) startTime = currentTime;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = easeInOutCubic(progress);

          mainRef.current!.scrollTop = startPosition + distance * easedProgress;

          if (progress < 1) {
            requestAnimationFrame(animateScroll);
          } else {
            isScrollingRef.current = false;
          }
        };

        requestAnimationFrame(animateScroll);
      }
    },
    [navigate]
  );

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      scrollToSectionAnimated(categoryId);
    },
    [scrollToSectionAnimated]
  );

  // Scroll initial vers le hash quand le composant est monté
  useEffect(() => {
    if (!isInitialScrollDone.current && mainRef.current) {
      const hash = location.hash.replace("#", "");
      if (hash) {
        // Petit délai pour s'assurer que le DOM est prêt
        setTimeout(() => {
          scrollToSectionInstant(hash);
        }, 100);
      }
      isInitialScrollDone.current = true;
    }
  }, [location.hash, scrollToSectionInstant]);

  // Écouter les changements de hash (bouton back/forward du navigateur)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && hash !== activeCategory) {
        scrollToSectionInstant(hash);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [activeCategory, scrollToSectionInstant]);

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

      if (currentSection !== activeCategory) {
        setActiveCategory(currentSection);
        // Mettre à jour l'URL silencieusement lors du scroll
        navigate(`/#${currentSection}`, { replace: true });
      }
    };

    mainElement.addEventListener("scroll", handleScroll);
    return () => mainElement.removeEventListener("scroll", handleScroll);
  }, [activeCategory, navigate]);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar
        selectedCategory={activeCategory}
        onCategoryChange={handleCategoryClick}
      />

      {/* Contenu principal */}
      <main ref={mainRef} className="flex-1 bg-[#f7f8fa] overflow-y-auto">
        <ExamplesGrid />
      </main>
    </div>
  );
}
