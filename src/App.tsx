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
import BarWithBackground from "./pages/bar/BarWithBackground";
import SetStyleOfSingleBar from "./pages/bar/SetStyleOfSingleBar";
import WaterfallChart from "./pages/bar/WaterfallChart";
import BarChartWithNegativeValue from "./pages/bar/BarChartWithNegativeValue";
import RadialPolarBarLabelPosition from "./pages/bar/RadialPolarBarLabelPosition";
import TangentialPolarBarLabelPosition from "./pages/bar/TangentialPolarBarLabelPosition";
import WorldPopulation from "./pages/bar/WorldPopulation";
import BarLabelRotation from "./pages/bar/BarLabelRotation";
import RefererOfAWebsite from "./pages/pie/RefererOfAWebsite";
import DoughnutChartWithRoundedCorner from "./pages/pie/DoughnutChartWithRoundedCorner";
import DoughnutChart from "./pages/pie/DoughnutChart";
import HalfDoughnutChart from "./pages/pie/HalfDoughnutChart";
import PieWithPadAngle from "./pages/pie/PieWithPadAngle";
import CustomizedPie from "./pages/pie/CustomizedPie";
import TextureOnPieChart from "./pages/pie/TextureOnPieChart";
import NightingaleChart from "./pages/pie/NightingaleChart";
import NightingaleChartSimple from "./pages/pie/NightingaleChartSimple";
import NestedPies from "./pages/pie/NestedPies";
import BasicScatterChart from "./pages/scatter/BasicScatterChart";

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
            <Route
              path="/bar/bar-with-background"
              element={<BarWithBackground />}
            />
            <Route
              path="/bar/set-style-of-single-bar"
              element={<SetStyleOfSingleBar />}
            />
            <Route path="/bar/waterfall-chart" element={<WaterfallChart />} />
            <Route
              path="/bar/bar-chart-with-negative-value"
              element={<BarChartWithNegativeValue />}
            />
            <Route
              path="/bar/radial-polar-bar-label-position"
              element={<RadialPolarBarLabelPosition />}
            />
            <Route
              path="/bar/tangential-polar-bar-label-position"
              element={<TangentialPolarBarLabelPosition />}
            />
            <Route path="/bar/world-population" element={<WorldPopulation />} />
            <Route
              path="/bar/bar-label-rotation"
              element={<BarLabelRotation />}
            />
            <Route
              path="/pie/referer-of-a-website"
              element={<RefererOfAWebsite />}
            />
            <Route
              path="/pie/doughnut-chart-with-rounded-corner"
              element={<DoughnutChartWithRoundedCorner />}
            />
            <Route path="/pie/doughnut-chart" element={<DoughnutChart />} />
            <Route
              path="/pie/half-doughnut-chart"
              element={<HalfDoughnutChart />}
            />
            <Route
              path="/pie/pie-with-pad-angle"
              element={<PieWithPadAngle />}
            />
            <Route path="/pie/customized-pie" element={<CustomizedPie />} />
            <Route
              path="/pie/texture-on-pie-chart"
              element={<TextureOnPieChart />}
            />
            <Route
              path="/pie/nightingale-chart"
              element={<NightingaleChart />}
            />
            <Route
              path="/pie/nightingale-chart-simple"
              element={<NightingaleChartSimple />}
            />
            <Route path="/pie/nested-pies" element={<NestedPies />} />
            <Route
              path="/scatter/basic-scatter-chart"
              element={<BasicScatterChart />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
