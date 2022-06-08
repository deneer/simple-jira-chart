import { ChartPluginResponse } from "./chart-plugin-response.type";

export type JitteredIssue = ChartPluginResponse & {
  jitteredX: number;
  jitteredY: number;
};
