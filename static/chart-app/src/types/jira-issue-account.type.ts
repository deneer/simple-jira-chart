export type JiraIssueAccount = {
  self: string;
  accountId: string;
  avatarUrls: {
    "48x48": string;
    "24x24": string;
    "16x16": string;
    "32x32": string;
  };
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: "atlassian" | string;
};
