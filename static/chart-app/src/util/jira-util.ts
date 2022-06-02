import { invoke, view } from "@forge/bridge";

export const getJiraContext = async () => {
  const jiraContext = await view.getContext();
  return jiraContext;
};

export const getIssues = async () => {
  const issuesFromJira = await invoke("getIssues", {});
  return issuesFromJira;
};
