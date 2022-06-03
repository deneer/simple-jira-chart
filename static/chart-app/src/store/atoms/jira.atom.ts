import { atom } from "jotai";
import { getIssues, getJiraContext } from "../../util/jira-util";

export const jiraConfigAtom = atom<any>(async (get) => getJiraContext());

export const jiraIssuesAtom = atom<any>(async (get) => getIssues());

export const filteredJiraIssuesAtom = atom((get) =>
  get(jiraIssuesAtom).payload.filter((issue: any) => issue.x && issue.y)
);

export const excludedJiraIssuesAtom = atom((get) =>
  get(jiraIssuesAtom).payload.filter((issue: any) => !(issue.x && issue.y))
);
