import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import ExamplesGrid from "../components/examples/ExamplesGrid";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("line");

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <Sidebar
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Contenu principal */}
      <main className="flex-1 bg-gray-50 overflow-y-auto">
        <ExamplesGrid category={selectedCategory} />
      </main>
    </div>
  );
}
