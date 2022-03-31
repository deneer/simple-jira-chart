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
  let response = [];

  for (let i = 0; i < 10; i++) {
    const res = await api.asApp().requestJira(route`/rest/api/3/search`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: `{
        "jql": "${jql.replace(/\"/g, "'")}",
        "maxResults": 100,
        "startAt": ${i * 100}
      }`,
    });
    const data = await res.json();
    response.push(...data.issues);

    if (data.issues.length < 100) break;
  }

  return response;
}

export async function getServerInfo() {
  const response = await api
    .asApp()
    .requestJira(route`/rest/api/3/serverInfo`, {
      headers: {
        Accept: "application/json",
      },
    });
  return await response.json();
}
