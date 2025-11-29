import { useState, useCallback } from "react";
import type { EChartsOption } from "echarts";

interface CodePanelProps {
  option: EChartsOption;
  onRun: (newOption: EChartsOption) => void;
}

type Language = "js" | "ts";

function formatOption(option: EChartsOption): string {
  const formatValue = (value: unknown, indent: number = 0): string => {
    const spaces = "  ".repeat(indent);
    const nextSpaces = "  ".repeat(indent + 1);

    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (typeof value === "string") return `'${value}'`;
    if (typeof value === "number" || typeof value === "boolean")
      return String(value);

    if (Array.isArray(value)) {
      if (value.length === 0) return "[]";
      // Pour les tableaux de primitives simples, les afficher sur une seule ligne
      if (
        value.every(
          (v) =>
            typeof v === "string" ||
            typeof v === "number" ||
            typeof v === "boolean"
        )
      ) {
        const items = value.map((v) =>
          typeof v === "string" ? `'${v}'` : String(v)
        );
        const singleLine = `[${items.join(", ")}]`;
        if (singleLine.length < 60) return singleLine;
      }
      const items = value.map(
        (v) => `${nextSpaces}${formatValue(v, indent + 1)}`
      );
      return `[\n${items.join(",\n")}\n${spaces}]`;
    }

    if (typeof value === "object") {
      const entries = Object.entries(value as Record<string, unknown>);
      if (entries.length === 0) return "{}";
      const items = entries.map(
        ([k, v]) => `${nextSpaces}${k}: ${formatValue(v, indent + 1)}`
      );
      return `{\n${items.join(",\n")}\n${spaces}}`;
    }

    return String(value);
  };

  return `option = ${formatValue(option)};`;
}

export default function CodePanel({ option, onRun }: CodePanelProps) {
  const [language, setLanguage] = useState<Language>("js");
  const [code, setCode] = useState(() => formatOption(option));

  const handleRun = useCallback(() => {
    try {
      // Parse le code pour extraire l'option
      const fn = new Function(`
        let option;
        ${code}
        return option;
      `);
      const newOption = fn();
      onRun(newOption);
    } catch (error) {
      console.error("Error parsing option:", error);
    }
  }, [code, onRun]);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, []);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Tabs header */}
      <div className="flex items-center justify-between px-2 border-b border-gray-200">
        <div className="flex items-center">
          <button className="px-4 py-2 text-sm text-blue-600 border-b-2 border-blue-600">
            Edit Code
          </button>
          <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
            Full Code
          </button>
          <button className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700">
            Option Preview
          </button>
        </div>
      </div>

      {/* Language tabs + actions */}
      <div className="flex items-center justify-between px-2 py-1 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <button
            onClick={() => handleLanguageChange("js")}
            className={`px-3 py-1 text-xs font-medium rounded ${
              language === "js"
                ? "bg-yellow-400 text-yellow-900"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            JS
          </button>
          <button
            onClick={() => handleLanguageChange("ts")}
            className={`ml-1 px-3 py-1 text-xs font-medium rounded ${
              language === "ts"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            TS
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-500 hover:text-gray-700">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 3v18M3 12h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-700">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path
                d="M10 20l4-16M18 4l4 4-4 4M6 20l-4-4 4-4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={handleRun}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-green-500 rounded hover:bg-green-600 transition-colors"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Run
          </button>
        </div>
      </div>

      {/* Code editor area */}
      <div className="flex-1 overflow-auto">
        <div className="flex h-full">
          {/* Line numbers */}
          <div className="shrink-0 py-2 px-2 text-right text-xs text-gray-400 bg-gray-50 select-none font-mono">
            {code.split("\n").map((_, i) => (
              <div key={i} className="leading-5">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code content */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-2 font-mono text-xs leading-5 text-gray-800 resize-none outline-none bg-white"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
