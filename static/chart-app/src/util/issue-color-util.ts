import { JiraStatusColor } from "../types/jira-status-color.enum";
import { JiraStatusKey } from "../types/jira-status-key.enum";

export function getTailwindColorWithJiraStatusKey(
  jiraStatusKey: JiraStatusKey | undefined
): JiraStatusColor {
  let issueColor: JiraStatusColor;
  switch (jiraStatusKey) {
    case JiraStatusKey.NEW:
      issueColor = JiraStatusColor.TODO_COLOR;
      break;
    case JiraStatusKey.INDETERMINATE:
      issueColor = JiraStatusColor.IN_PROGRESS_COLOR;
      break;
    case JiraStatusKey.DONE:
      issueColor = JiraStatusColor.DONE_COLOR;
      break;
    default:
      issueColor = JiraStatusColor.DEFAULT_COLOR;
      break;
  }
  return issueColor;
}
