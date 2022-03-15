import ForgeUI, { render, useConfig } from "@forge/ui";
import ChartConfig from "./components/ChartConfig";
import Resolver from "@forge/resolver";
import { getJiraIssuesWithJql } from "./lib/api";

const resolver = new Resolver();

resolver.define("getIssues", async (req) => {
  console.log(req);
  //   console.log(req.context.extension.config);
  const {
    context: {
      extension: { config },
    },
  } = req;
  console.log(config);
  const jiraResponse = await getJiraIssuesWithJql(config.jql);
  console.log(jiraResponse.issues);

  return {
    payload: jiraResponse.issues.map((issue) => ({
      x: issue.fields[config.xAxis],
      y: issue.fields[config.yAxis],
      z: issue.fields[config.zAxis],
      label: issue.fields.summary,
    })),
  };
});

export const config = render(<ChartConfig />);
export const handler = resolver.getDefinitions();
