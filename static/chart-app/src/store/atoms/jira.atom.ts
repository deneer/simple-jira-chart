import { atom } from "jotai";
import { getIssues, getJiraContext } from "../../util/jira-util";

export const jiraConfigAtom = atom<any>(async (get) => getJiraContext());

export const jiraIssuesAtom = atom<any>(async (get) => getIssues());
