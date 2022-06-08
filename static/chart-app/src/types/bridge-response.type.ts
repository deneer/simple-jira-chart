import { ChartPluginResponse } from "./chart-plugin-response.type";

export type BridgeResponse = {
  payload: ChartPluginResponse[];
  base: string;
  done: boolean;
  error: boolean;
};
