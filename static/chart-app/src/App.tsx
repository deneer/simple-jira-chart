import { atom, Provider, useAtom, useAtomValue } from "jotai";
import { Suspense, useEffect } from "react";
import ExcludedListContainer from "./containers/excluded-list.container";
import ScatterPlotContainer from "./containers/scatter-plot.container";
import { jiraConfigAtom, jiraIssuesAtom } from "./store/atoms/jira.atom";
import { getIssues, getJiraContext } from "./util/jira-util";

function App() {
  const config = useAtomValue(jiraConfigAtom);
  const issues = useAtomValue(jiraIssuesAtom);

  console.log(issues);
  console.log(config);

  return (
    <div className="flex flex-col w-max items-center mr-auto ml-auto">
      <h1 className="font-bold text-2xl text-blue-900">New Chart!</h1>
      <ScatterPlotContainer />
      <ExcludedListContainer />
    </div>
  );
}

export default App;
