import { atom } from "jotai";
import { BridgeResponse } from "../../types/bridge-response.type";
import { ChartPluginResponse } from "../../types/chart-plugin-response.type";
import { getIssues, getJiraContext } from "../../util/jira-util";

export const jiraConfigAtom = atom<any>(async (get) => getJiraContext());

export const jiraIssuesAtom = atom<Promise<BridgeResponse>>(async (get) =>
  getIssues()
);

export const filteredJiraIssuesAtom = atom<ChartPluginResponse[]>((get) =>
  get(jiraIssuesAtom).payload.filter((issue) => issue.x && issue.y)
);

export const excludedJiraIssuesAtom = atom((get) =>
  get(jiraIssuesAtom).payload.filter((issue: any) => !(issue.x && issue.y))
);
