import api, { route } from "@forge/api";

export async function getJiraFields() {
  const res = await api.asApp().requestJira(route`/rest/api/3/field`, {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function getJiraIssuesWithJql(jql: string) {
  const res = await api.asApp().requestJira(route`/rest/api/3/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: `{
      "jql": "${jql.replace(/\"/g, "'")}",
      "maxResults": 200
    }`,
  });

  const data = await res.json();
  return data;
}
