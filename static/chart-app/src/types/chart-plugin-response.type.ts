import { JiraIssueAccount } from "./jira-issue-account.type";

export type ChartPluginResponse = {
  x: number;
  y: number;
  size: number;
  summary: string;
  issueKey: string;
  status: {
    name: "To Do" | "In Progress" | "Done" | string;
    statusCategory: {
      key: "new" | "indeterminate" | "done" | string;
      colorName: "blue-gray" | "green" | "yellow" | string;
      name: "To Do" | "In Progress" | "Done" | string;
    };
  } | null;
  assignee: JiraIssueAccount | null;
};
