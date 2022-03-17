# Simple Jira Chart Macro for Confluence

> 좌측 상단의 TOC를 이용하여 더 편리하게 문서를 탐색해보세요!

이 앱은 Confluence에서 Jira의 이슈들을 Scatter Chart 형태로 볼 수 있게 해주는 간단한 차트 매크로입니다.

## Installation

> Will be added soon

## Development

### 개발 환경

- node (LTS version)
- Docker
- forge CLI

### 프로젝트 구조

```
📁 <project-root>
├── 📄 manifest.yml
├── 📄 package-lock.json
├── 📄 package.json
├── 📄 README-ko.md
├── 📄 README.md
├── 📁 src
│  ├── 📁 components
│  │  └── 📄 ChartConfig.tsx
│  ├── 📄 index.tsx
│  └── 📁 lib
│     └── 📄 api.ts
├── 📁 static
│  └── 📁 chart-app
│     ├── 📄 package-lock.json
│     ├── 📄 package.json
│     ├── 📁 public
│     │  └── 📄 index.html
│     ├── 📄 README.md
│     ├── 📁 src
│     │  ├── 📄 App.tsx
│     │  ├── 📁 components
│     │  │  ├── 📄 ExcludedList.tsx
│     │  │  └── 📄 ScatterPlot.tsx
│     │  ├── 📄 index.tsx
│     │  └── 📁 lib
│     │     └── 📄 util.ts
│     └── 📄 tsconfig.json
└── 📄 tsconfig.json
```

프로젝트 구조가 최상위 디렉토리와 `static/chart-app` 총 2개의 프로젝트로 구성되어 있는 것을 확인할 수 있습니다.  
최상위 디렉토리에 위치한 프로젝트는 Atlassian Forge 앱으로, Confluence와 Jira에 설치되어 동작하는 매크로에 관련된 프로젝트입니다.  
`static/chart-app` 디렉토리에 위치한 프로젝트는 Forge 앱 내부에서 Custom UI로써 동작하는 React 앱으로, Jira 이슈 데이터를 기반으로 차트를 보여주기 위한 프로젝트입니다.

### 빌드 흐름

전체적인 빌드 흐름은

1. `static/chart-app` React 앱을 빌드하여 `static/chart-app/build` 디렉토리에 최적화된 정적 파일들(HTML, CSS, JS)을 생성합니다.
2. 최상위 디렉토리에서 앱을 빌드할 때, `manifest.yml`의 설정대로 `static/chart-app/build`를 리소스로 참조하여 Forge 앱을 빌드합니다.

와 같이 이루어져 있습니다.

### 동작 흐름

빌드가 된 앱은 설치가 된 Confluence 상에서 동작합니다. Confluence에서 `/deneer-jira-chart`라고 입력하여 매크로를 동작할 수 있습니다.  
매크로가 로딩되면, Resource로 등록된 React 앱이 동작하기 시작합니다. 동작하자마자 Configuration을 기반으로 Forge 앱에 요청을 보내게 되고, 올바른 응답이 올 때까지 `Loading...` 을 표시하고 있다가, 올바른 응답이 오면 차트를 렌더링하여 표시하게 됩니다. 따라서 JQL이 잘못되었다거나 하는 경우에도 에러가 아닌 `Loading...`을 표시합니다.  
Forge 앱은 요청을 받으면 Jira에 API 요청을 보내서 필요한 정보를 반환해주는 FaaS로써 동작합니다. React 앱과 Forge 앱은 각각 `@forge/bridge`와 `@forge/resolver`라는 패키지를 이용하여 서로 통신합니다. 차트에서 보여줄 정보를 설정하기 위해 Configuration을 수정하고 싶으면, 문서를 수정하는 상태에서 매크로를 클릭하면 연필 아이콘을 통해 Configuration을 수정할 수 있습니다. Configuration이 수정될 때마다 매크로 전체가 다시 렌더링 됩니다. 즉, 수정된 Configuration을 기반으로 React 앱도 다시 렌더링 됩니다.

### 개발 환경으로 배포

```
forge deploy
```

를 통해서 자신의 Forge 앱 개발환경으로 배포할 수 있습니다. 이후

```
forge install
```

을 통해서 원하는 제품에 Forge 앱을 설치할 수 있습니다. **이 때, 꼭 Confluence와 Jira 둘 다에 앱을 설치해주세요!** 그렇지 않으면 Confluence에서 Jira에 접근을 할 수가 없습니다.  
만약 Forge 앱의 동작을 모니터링하고 싶으면

```
forge tunnel
```

을 통해서 모니터링할 수 있습니다. 해당 명령을 실행하면 Docker에 터널링을 위한 컨테이너가 생성되어, 본인의 PC에서 매크로를 호출하면 요청이 개발 Confluence로 가는 것이 아니라 로컬 환경으로 들어오게 됩니다.  
또한, Live Reload를 지원하기 때문에, Forge App의 소스 코드가 변경되면 자동으로 다시 개발 빌드가 진행됩니다.  
다만, React 앱의 소스 코드를 변경하여도 Live Reload가 되지 않음에 주의하세요! React 앱의 소스를 변경했을 때는 다시

```sh
# static/chart-app 에서
npm run build
# 최상위 디렉토리에서
forge deploy
forge tunnel
```

을 통해서 변경사항을 적용할 수 있습니다.  
위의 과정들을 어느정도 간소화하기 위해 Forge 앱의 `package.json`을 보면 `deploy`와 `tunnel` 스크립트가 마련되어 있습니다.

```sh
npm run deploy # 배포까지만
npm run tunnel # 배포 및 터널링
```

위의 명령어를 활용하면 조금 더 편하게 개발환경에 배포 및 터널링을 하실 수 있습니다.
