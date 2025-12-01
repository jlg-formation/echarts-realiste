import { useCallback } from "react";

interface ActionBarProps {
  onDownload: () => void;
  onScreenshot: () => void;
  onShare: () => void;
  generatedAt: string;
  generationTime: number;
}

export default function ActionBar({
  onDownload,
  onScreenshot,
  onShare,
  generatedAt,
  generationTime,
}: ActionBarProps) {
  const handleDownload = useCallback(() => {
    onDownload();
  }, [onDownload]);

  const handleScreenshot = useCallback(() => {
    onScreenshot();
  }, [onScreenshot]);

  const handleShare = useCallback(() => {
    onShare();
  }, [onShare]);

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-2">
      {/* Boutons d'action */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Download
        </button>
        <button
          onClick={handleScreenshot}
          className="flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <rect
              x="3"
              y="3"
              width="18"
              height="18"
              rx="2"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
            <path
              d="M21 15l-5-5L5 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Screenshot
        </button>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 rounded border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-50"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle
              cx="18"
              cy="5"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="6"
              cy="12"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="18"
              cy="19"
              r="3"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          Share
        </button>
      </div>

      {/* Timestamp et temps de génération */}
      <div className="text-xs text-gray-500">
        <span>{generatedAt}</span>
        <span className="ml-4">
          Chart has been generated in {generationTime.toFixed(2)}ms
        </span>
      </div>
    </div>
  );
}
