import api, { route, fetch, authorize } from "@forge/api";

// TODO: make this function to filter only numeric fields using isNaN
export async function getJiraFields() {
  const res = await api.asUser().requestJira(route`/rest/api/3/field`, {
    headers: {
      Accept: "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function getJiraIssuesWithJql(jql: string) {
  const res = await api.asUser().requestJira(route`/rest/api/3/search`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: `{
        "jql": "${jql}"
    }`,
  });

  const data = await res.json();
  return data;
}
