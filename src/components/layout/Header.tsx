import { Link } from "react-router";

export default function Header() {
  return (
    <header className="h-14 bg-[#293042] flex items-center justify-between px-6 border-b border-gray-700">
      {/* Logo et navigation gauche */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://echarts.apache.org/en/images/logo.png"
            alt="Apache ECharts"
            className="h-8"
          />
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <div className="relative group">
            <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              Docs
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div className="relative group">
            <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              Download
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <Link
            to="/"
            className="text-white text-sm font-medium transition-colors border-b-2 border-red-500 pb-0.5"
          >
            Examples
          </Link>
          <div className="relative group">
            <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              Resources
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div className="relative group">
            <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              Community
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
          <div className="relative group">
            <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors flex items-center gap-1">
              ASF
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Navigation droite */}
      <div className="flex items-center gap-4">
        <button className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
          中文
        </button>
        <a
          href="https://github.com/apache/echarts"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-300 hover:text-white transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}
