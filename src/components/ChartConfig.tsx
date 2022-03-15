import ForgeUI, {
  useState,
  MacroConfig,
  TextField,
  Select,
  Option,
} from "@forge/ui";
import { getJiraFields } from "../lib/api";

export const defaultConfig = {
  jql: "project = ",
};

export default () => {
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
      <Select name="zAxis" label="Size 필드">
        {fields
          .filter((item) => item?.schema?.type === "number")
          .map((field) => (
            <Option label={field.name} value={field.name} />
          ))}
      </Select>
    </MacroConfig>
  );
};
