import { atom } from "jotai";
import { BridgeResponse } from "../../types/bridge-response.type";
import { ChartPluginResponse } from "../../types/chart-plugin-response.type";
import { JitteredIssue } from "../../types/jittered-issue.type";
import { getIssues, getJiraContext } from "../../util/jira-util";
import { getRandomJitter } from "../../util/preprocess-util";

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

export const jiraIssuesXDomainAtom = atom<[number, number]>((get) => {
  const jiraIssues = get(filteredJiraIssuesAtom);
  return [
    Math.min(...jiraIssues.map((issue) => issue.x)),
    Math.max(...jiraIssues.map((issue) => issue.x)),
  ];
});

export const jiraIssuesYDomainAtom = atom<[number, number]>((get) => {
  const jiraIssues = get(filteredJiraIssuesAtom);
  return [
    Math.min(...jiraIssues.map((issue) => issue.y)),
    Math.max(...jiraIssues.map((issue) => issue.y)),
  ];
});

export const jiraIssuesSizeDomainAtom = atom<[number, number]>((get) => {
  const jiraIssues = get(filteredJiraIssuesAtom);
  return [
    Math.min(...jiraIssues.map((issue) => issue.size)),
    Math.max(...jiraIssues.map((issue) => issue.size)),
  ];
});

export const resetJitterAtom = atom<boolean>(false);

export const jitteredJiraIssuesAtom = atom<JitteredIssue[]>((get) => {
  const notExcludedIssues = get(filteredJiraIssuesAtom);
  const xDomain = get(jiraIssuesXDomainAtom);
  const yDomain = get(jiraIssuesYDomainAtom);

  // Rerender if reset button is clicked
  get(resetJitterAtom);

  const indicesByData = notExcludedIssues.reduce(
    (acc: { [key in string]: number[] }, curr, currIndex) => ({
      ...acc,
      [JSON.stringify({ x: curr.x, y: curr.y })]: [
        ...(acc[JSON.stringify({ x: curr.x, y: curr.y })] || []),
        currIndex,
      ],
    }),
    {}
  );
  const overlapIndices = Object.keys(indicesByData)
    .filter((key) => indicesByData[key].length > 1)
    .map((key) => indicesByData[key])
    .reduce((acc, curr) => [...acc, ...curr], []);

  const jitteredIssues = notExcludedIssues
    .map((issue, index) => {
      if (overlapIndices.find((el) => el === index)) {
        return {
          ...issue,
          jitteredX: issue.x + getRandomJitter(xDomain),
          jitteredY: issue.y + getRandomJitter(yDomain),
        };
      } else {
        return { ...issue, jitteredX: issue.x, jitteredY: issue.y };
      }
    })
    .sort((a, b) => b.size - a.size);

  return jitteredIssues;
});
