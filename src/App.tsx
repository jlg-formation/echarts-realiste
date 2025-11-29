import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/layout/Header";

function App() {
  return (
    <BrowserRouter basename="/echarts-realiste">
      <div className="h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
