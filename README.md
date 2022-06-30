# Simple Jira Issues Scatter Chart for Confluence

![chart-plugin-intro](https://user-images.githubusercontent.com/23608029/175864937-9df80457-245e-4c1f-9bcd-247fc99b35a4.gif)

Add scatter chart about jira issues to a confluence document with ease!

## Setup Project

You can install `node_modules` dependencies by running a script below.

```
npm run setup
```

## Develop Guide

### Prerequisites

- You need [forge cli](https://developer.atlassian.com/platform/forge/cli-reference/).
- You need to get logged into forge cli with your atlassian api key.
- You need a development workspace environment on atlassian cloud.

Please refer to atlassian [getting started guide](https://developer.atlassian.com/platform/forge/getting-started/) for more details.

### 1. Create dummy-app

- Create any dummy forge app.

```bash
forge create dummy-app # and then select anything you want
```

### 2. Copy dummy-app's atlassian app id

- Open `dummy-app/manifest.yml`.
- There will be app id in yml something like

```yml
app:
  id: ari:cloud:ecosystem::app/and-foo-bar-zee
```

- Copy id value.

### 3. Paste it to chart plugin's `mainfest.yml`

- Open `<your-chart-plugin-path>/manifest.yml`.
- Paste app id which is copied from dummy-app.

### 4. Deploy and install app to development environment

- Deploy your app to development environment.

```bash
npm run deploy
```

- Install your app to your development environment.

```bash
forge install
```

- And now you can use this plugin in your development environment confluence.

### (Optional) 5. Tunnel request to localhost

- You can tunnel request to localhost with [forge tunnel](https://developer.atlassian.com/platform/forge/tunneling/).
- npm script is ready for tunneling. It builds static file and run tunnel.

```bash
npm run tunnel
```

## Deploy to production confluence

Please refer to [deploy environment document](https://developer.atlassian.com/platform/forge/staging-and-production-apps/) and [distributing app document](https://developer.atlassian.com/platform/forge/distribute-your-apps/).
