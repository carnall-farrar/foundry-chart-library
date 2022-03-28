import { tabulate } from "./table";
import { createExecTable } from "./execTable";
import { timeseriesChart } from "./timeseries";
import { barChart } from "./barChart";
import {
  buildSentenceComponent,
  lightDocumentation,
  addAccordion,
} from "./sentenceTable";
import { LikeButton } from "./likebutton";
import { BarChart } from "./components/BarChart"
import { TrendLineChart } from "./components/TrendLineChart"
import { BenchmarkComponent } from "./components/BenchmarkComponent"
import { ScorecardComponent } from "./components/ScorecardComponent"


global.tabulate = tabulate;
global.createExecTable = createExecTable;
global.timeseriesChart = timeseriesChart;
global.barChart = barChart;
global.buildSentenceComponent = buildSentenceComponent;
global.lightDocumentation = lightDocumentation;
global.addAccordion = addAccordion;
global.LikeButton = LikeButton;
global.BarChart = BarChart;
global.BenchmarkComponent = BenchmarkComponent;
global.ScorecardComponent = ScorecardComponent;