import { useAtomValue } from "jotai";
import ExcludedList from "../components/excluded-list";
import ListItem from "../components/list-item";
import {
  excludedJiraIssuesAtom,
  jiraConfigAtom,
} from "../store/atoms/jira.atom";

function ExcludedListContainer() {
  const excludedIssuesData = useAtomValue(excludedJiraIssuesAtom);
  const jiraConfig = useAtomValue(jiraConfigAtom);

  return (
    <ExcludedList
      data={excludedIssuesData}
      baseUrl={jiraConfig.siteUrl}
      xAxis={JSON.parse(jiraConfig.extension.config.xAxis).name}
      yAxis={JSON.parse(jiraConfig.extension.config.yAxis).name}
      sizeAxis={JSON.parse(jiraConfig.extension.config.zAxis).name}
    />
  );
}

export default ExcludedListContainer;
