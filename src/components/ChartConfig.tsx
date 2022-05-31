import ForgeUI, {
  useState,
  MacroConfig,
  TextField,
  Select,
  Option,
  Fragment,
} from "@forge/ui";
import { getJiraFields, getProjects } from "../lib/api";

const FieldOptionList = ({ fields }: any) => {
  return (
    <Fragment>
      {fields
        .filter((item) => item?.schema?.type === "number")
        .map((field) => (
          <Option
            label={field.name}
            value={JSON.stringify({ name: field.name, key: field.key })}
          />
        ))}
    </Fragment>
  );
};

export const defaultConfig = {
  jql: "project = ",
};

export default () => {
  const [fields, setFields] = useState<Array<any>>(
    async () => await getJiraFields()
  );
  const [projects, setProjects] = useState<any>(
    async () => await getProjects()
  );

  return (
    <MacroConfig>
      <Select name="projectKey" label="Project Key">
        {projects.values.map((project) => (
          <Option label={project.key} value={project.key} />
        ))}
      </Select>
      <TextField name="jql" label="JQL" defaultValue={defaultConfig.jql} />
      <Select name="xAxis" label="x축 필드">
        <FieldOptionList fields={fields} />
      </Select>
      <Select name="yAxis" label="y축 필드">
        <FieldOptionList fields={fields} />
      </Select>
      <Select name="zAxis" label="Size 필드">
        <FieldOptionList fields={fields} />
      </Select>
    </MacroConfig>
  );
};
