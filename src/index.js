import { tabulate } from './table';
import { createExecTable } from './execTable';
import { timeseriesChart } from './timeseries';
import { barChart } from './barChart';
import {
  buildSentenceComponent,
  lightDocumentation,
  addAccordion,
} from "./sentenceTable";

global.tabulate = tabulate;
global.createExecTable = createExecTable;
global.timeseriesChart = timeseriesChart;
global.barChart = barChart;
global.buildSentenceComponent = buildSentenceComponent;
global.lightDocumentation = lightDocumentation;
global.addAccordion = addAccordion;