import { invoke, view } from "@forge/bridge";
import { BridgeResponse } from "../types/bridge-response.type";

export const getJiraContext = async () => {
  const jiraContext = await view.getContext();
  return jiraContext;
};

export const getIssues = async (): Promise<BridgeResponse> => {
  const issuesFromJira = (await invoke("getIssues", {})) as BridgeResponse;
  return issuesFromJira;
};
