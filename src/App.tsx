import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/layout/Header";
import BasicLineChart from "./pages/line/BasicLineChart";
import SmoothedLineChart from "./pages/line/SmoothedLineChart";
import BasicAreaChart from "./pages/line/BasicAreaChart";
import StackedLineChart from "./pages/line/StackedLineChart";
import StackedAreaChart from "./pages/line/StackedAreaChart";
import GradientStackedAreaChart from "./pages/line/GradientStackedAreaChart";
import BumpChart from "./pages/line/BumpChart";
import TemperatureChange from "./pages/line/TemperatureChange";
import AreaPieces from "./pages/line/AreaPieces";
import DataTransformFilter from "./pages/line/DataTransformFilter";
import LineGradient from "./pages/line/LineGradient";
import LineWithSections from "./pages/line/LineWithSections";
import BasicBar from "./pages/bar/BasicBar";
import AxisAlignWithTick from "./pages/bar/AxisAlignWithTick";

function App() {
  return (
    <BrowserRouter basename="/echarts-realiste/">
      <div className="h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/line/basic-line-chart" element={<BasicLineChart />} />
            <Route
              path="/line/smoothed-line-chart"
              element={<SmoothedLineChart />}
            />
            <Route path="/line/basic-area-chart" element={<BasicAreaChart />} />
            <Route
              path="/line/stacked-line-chart"
              element={<StackedLineChart />}
            />
            <Route
              path="/line/stacked-area-chart"
              element={<StackedAreaChart />}
            />
            <Route
              path="/line/gradient-stacked-area-chart"
              element={<GradientStackedAreaChart />}
            />
            <Route path="/line/bump-chart" element={<BumpChart />} />
            <Route
              path="/line/temperature-change"
              element={<TemperatureChange />}
            />
            <Route path="/line/area-pieces" element={<AreaPieces />} />
            <Route
              path="/line/data-transform-filter"
              element={<DataTransformFilter />}
            />
            <Route path="/line/line-gradient" element={<LineGradient />} />
            <Route
              path="/line/line-with-sections"
              element={<LineWithSections />}
            />
            <Route path="/bar/basic-bar" element={<BasicBar />} />
            <Route
              path="/bar/axis-align-with-tick"
              element={<AxisAlignWithTick />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
