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
import { getJiraFields, getJiraIssuesWithJql } from "./lib/api";

const defaultConfig = {
  jql: "project = ",
};

const App = () => {
  const config = useConfig();

  const [data, setData] = useState(
    async () => await getJiraIssuesWithJql("project = chart-test")
  );

  console.log(data);

  if (config && config.jql !== defaultConfig.jql) {
    return (
      <Fragment>
        <Text>JQL: {config.jql}</Text>
        <Text>X: {config.xAxis || ""}</Text>
        <Text>Y: {config.yAxis || ""}</Text>
      </Fragment>
    );
  } else {
    return (
      <SectionMessage
        title="You need to configure this macro"
        appearance="warning"
      >
        <Text>
          While editing the page, select the macro, and click on the pencil icon
          to display configuration options.
        </Text>
      </SectionMessage>
    );
  }
};

export const run = render(<Macro app={<App />} />);

const Config = () => {
  const [fields, setFields] = useState<Array<any>>(
    async () => await getJiraFields()
  );
  return (
    <MacroConfig>
      <TextField name="jql" label="JQL" defaultValue={defaultConfig.jql} />
      <Select name="xAxis" label="x축 필드">
        {fields
          .filter((item) => item?.schema?.type === "number")
          .map((field) => (
            <Option label={field.name} value={field.name} />
          ))}
      </Select>
      <Select name="yAxis" label="y축 필드">
        {fields
          .filter((item) => item?.schema?.type === "number")
          .map((field) => (
            <Option label={field.name} value={field.name} />
          ))}
      </Select>
    </MacroConfig>
  );
};

export const config = render(<Config />);
