import ForgeUI, {
  render,
  Fragment,
  Macro,
  Text,
  useState,
  MacroConfig,
  TextField,
  Select,
  Option,
  useConfig,
  SectionMessage,
} from "@forge/ui";
import { getJiraIssuesWithJql } from "./lib/api";

const defaultConfig = {
  jql: "project = ",
};

const App = () => {
  const config = useConfig();

  const [data, setData] = useState(
    async () => await getJiraIssuesWithJql("project = chart-test")
  );
  console.log(data);

  return config.jql === defaultConfig.jql ? (
    <SectionMessage
      title="You need to configure this macro"
      appearance="warning"
    >
      <Text>
        While editing the page, select the macro, and click on the pencil icon
        to display configuration options.
      </Text>
    </SectionMessage>
  ) : (
    <Fragment>
      <Text>JQL: {config.jql}</Text>
      <Text>X: {config.xAxis}</Text>
      <Text>Y: {config.yAxis}</Text>
    </Fragment>
  );
};

export const run = render(<Macro app={<App />} />);

const Config = () => {
  return (
    <MacroConfig>
      <TextField name="jql" label="JQL" defaultValue={defaultConfig.jql} />
      <Select name="xAxis" label="x축 필드">
        <Option defaultSelected label="sample1" value="sample1" />
        <Option label="sample2" value="sample2" />
        <Option label="sample3" value="sample3" />
        <Option label="sample4" value="sample4" />
      </Select>
      <Select name="yAxis" label="y축 필드">
        <Option label="sample1" value="sample1" />
        <Option defaultSelected label="sample2" value="sample2" />
        <Option label="sample3" value="sample3" />
        <Option label="sample4" value="sample4" />
      </Select>
    </MacroConfig>
  );
};

export const config = render(<Config />);
