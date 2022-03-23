import Resolver from "@forge/resolver";
import ForgeUI, { render } from "@forge/ui";
import ChartConfig from "./components/ChartConfig";
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
  // console.log("jira Response:", jiraResponse.issues);

  return config.xAxis && config.yAxis && config.zAxis
    ? jiraResponse.issues
      ? {
          payload: jiraResponse.issues.map((issue) => ({
            x: issue.fields[JSON.parse(config.xAxis).key],
            y: issue.fields[JSON.parse(config.yAxis).key],
            z: issue.fields[JSON.parse(config.zAxis).key],
            title: issue.fields.summary,
          })),
          done: true,
          error: false,
        }
      : { payload: [], done: true, error: true }
    : {
        payload: [],
        done: false,
      };
});

export const config = render(<ChartConfig />);
export const handler = resolver.getDefinitions();
