import { JiraStatusColor } from "../types/jira-status-color.enum";
import { JiraStatusKey } from "../types/jira-status-key.enum";

export function getTailwindColorWithJiraStatusKey(
  jiraStatusKey: JiraStatusKey | undefined
): JiraStatusTailwindColor {
  let issueColor: JiraStatusTailwindColor;
  switch (jiraStatusKey) {
    case JiraStatusKey.NEW:
      issueColor = JiraStatusTailwindColor.TODO_COLOR;
      break;
    case JiraStatusKey.INDETERMINATE:
      issueColor = JiraStatusTailwindColor.IN_PROGRESS_COLOR;
      break;
    case JiraStatusKey.DONE:
      issueColor = JiraStatusTailwindColor.DONE_COLOR;
      break;
    default:
      issueColor = JiraStatusTailwindColor.DEFAULT_COLOR;
      break;
  }
  return issueColor;
}
