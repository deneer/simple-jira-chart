import Resolver from "@forge/resolver";
import ForgeUI, { render } from "@forge/ui";
import ChartConfig from "./components/ChartConfig";
import { getJiraIssuesWithJql, getServerInfo } from "./lib/api";

const resolver = new Resolver();

resolver.define("getIssues", async (req) => {
  console.log(req);
  //   console.log(req.context.extension.config);
  const { baseUrl } = await getServerInfo();
  console.log("base URL:", baseUrl);

  const {
    context: {
      extension: { config },
    },
  } = req;
  if (!config || !config.jql) {
    return { payload: [], done: true, error: true };
  }
  const jiraResponse = await getJiraIssuesWithJql(config.jql);

  return config.xAxis && config.yAxis && config.zAxis
    ? jiraResponse
      ? {
          payload: jiraResponse.map((issue) => {
            return {
              x: issue.fields[JSON.parse(config.xAxis).key],
              y: issue.fields[JSON.parse(config.yAxis).key],
              z: issue.fields[JSON.parse(config.zAxis).key],
              title: issue.fields.summary,
              issueKey: issue.key,
            };
          }),
          base: baseUrl,
          done: true,
          error: false,
        }
      : { payload: [], base: baseUrl, done: true, error: true }
    : {
        payload: [],
        base: baseUrl,
        done: false,
      };
});

export const config = render(<ChartConfig />);
export const handler = resolver.getDefinitions();
