import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import PedagogyGrid from "../components/pedagogy/PedagogyGrid";

// Catégories spécifiques à la pédagogie
interface Category {
  id: string;
  name: string;
}

const pedagogyCategories: Category[] = [
  { id: "general", name: "Bonnes pratiques" },
  { id: "colors", name: "Couleurs" },
  { id: "labels", name: "Étiquettes" },
  { id: "axes", name: "Axes" },
  { id: "legend", name: "Légendes" },
  { id: "line", name: "Lignes" },
  { id: "bar", name: "Barres" },
  { id: "pie", name: "Circulaires" },
  { id: "scatter", name: "Nuages de points" },
];

// Icône pour la pédagogie
function PedagogyIcon({ isActive }: { isActive?: boolean }) {
  const strokeColor = isActive ? "#3b82f6" : "#9ca3af";
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Sidebar spécifique à la pédagogie
function PedagogySidebar({
  selectedCategory,
  onCategoryChange,
}: {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  return (
    <aside className="flex h-full w-[200px] min-w-[200px] flex-col overflow-hidden border-r border-gray-200 bg-white">
      {/* Liste des catégories */}
      <nav className="sidebar-scroll flex-1 overflow-y-auto py-4">
        {pedagogyCategories.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex w-full cursor-pointer items-center gap-3 px-4 py-2.5 text-left text-[13px] transition-colors ${
                isActive
                  ? "border-r-2 border-blue-500 bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
            >
              <PedagogyIcon isActive={isActive} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default function Pedagogy() {
  const location = useLocation();
  const navigate = useNavigate();

  // Lire le hash initial de l'URL (ex: #general -> general)
  const getInitialCategory = () => {
    const hash = location.hash.replace("#", "");
    return hash || "general";
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
        navigate(`/pedagogie#${categoryId}`, { replace: true });

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
    [navigate],
  );

  const handleCategoryClick = useCallback(
    (categoryId: string) => {
      scrollToSectionAnimated(categoryId);
    },
    [scrollToSectionAnimated],
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
      let currentSection = "general";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const mainRect = mainElement.getBoundingClientRect();
        if (rect.top <= mainRect.top + 100) {
          currentSection = section.getAttribute("data-section") || "general";
        }
      });

      if (currentSection !== activeCategory) {
        setActiveCategory(currentSection);
        // Mettre à jour l'URL silencieusement lors du scroll
        navigate(`/pedagogie#${currentSection}`, { replace: true });
      }
    };

    mainElement.addEventListener("scroll", handleScroll);
    return () => mainElement.removeEventListener("scroll", handleScroll);
  }, [activeCategory, navigate]);

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <PedagogySidebar
        selectedCategory={activeCategory}
        onCategoryChange={handleCategoryClick}
      />

      {/* Contenu principal */}
      <main ref={mainRef} className="flex-1 overflow-y-auto bg-[#f7f8fa]">
        <PedagogyGrid />
      </main>
    </div>
  );
}
