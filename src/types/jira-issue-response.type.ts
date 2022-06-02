export type JiraIssueResponse = {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    summary: string;
    statuscategorychangedate: string;
    issuetype: {
      self: string;
      id: string;
      description: string;
      iconUrl: string;
      name: string;
      subtask: boolean;
      avatarId: number;
      entityId: string;
      hierarchyLevel: number;
    };
    project: {
      self: string;
      id: string;
      key: string;
      name: string;
      projectTypeKey: string;
      simplefied: boolean;
      avatarUrls: {};
    };
    watches: {
      self: string;
      watchCount: number;
      isWatching: boolean;
    };
    created: string;
    priority: {
      self: string;
      iconUrl: string;
      name: string;
      id: number;
    };
    status: {
      self: string;
      description: string;
      iconUrl: string;
      name: "To Do" | "In Progress" | "Done" | string;
      id: string;
      statusCategory: {
        self: string;
        id: number;
        key: "new" | "indeterminate" | "done" | string;
        colorName: "blue-gray" | "green" | "yellow" | string;
        name: "To Do" | "In Progress" | "Done" | string;
      };
    };
    creator: JiraIssueAccount;
    reporter: JiraIssueAccount;
  } & { [k: string]: any };
} & { [k: string]: any };

type JiraIssueAccount = {
  self: string;
  accountId: string;
  avatarUrls: any;
  displayName: string;
  active: boolean;
  timeZone: string;
  accountType: "atlassian" | string;
};
