import { BrowserRouter, Routes, Route, Link } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-linear-to-r from-indigo-600 to-purple-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <span className="text-white font-bold text-xl">
                  echarts-realiste
                </span>
              </div>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="text-white hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Accueil
                </Link>
                <Link
                  to="/about"
                  className="text-white hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  À propos
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
