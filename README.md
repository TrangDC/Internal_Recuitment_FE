# THRM Frontend

## Getting Started

### Install NodeJS with NVM and Yarn
- Install [nvm](https://github.com/nvm-sh/nvm) to download and manage NodeJS with specific version
  ```shell
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
  ```
- Install NodeJS >= 18: `nvm install 18`
- Install `yarn`` and use it instead of `npm`: `npm install -g yarn`
### Install repo, dependencies and run app

- Install dependencies.

```bash
npm install
```

- Create `.env` with content in `.env.sample` to configure environment variables.

- Serve with hot reload at <http://127.0.0.1:5173/>.

```bash
npm run dev
```

### Linting code
- Fix with lint
```bash
npm run lint
```

### Build for production

- Build
```bash
npm run build
```


# Folder Structure

```
src
├── configs
├── contexts
├──  features
│ ├──  teams
│ │ ├── domain
│ │ │   ├── graphql
│ │ │   |   └── teams_graphql.ts
│ │ │   └── interfaces
│ │ │       └── index.ts
│ │ ├── hooks
│ │ │   ├──  useActionTable.ts
│ │ │   └──  useTeamTable.ts
│ │ ├── presentation
│ │ |   ├── components
│ │ |   ├── page-sections
│ │ |   │   ├──  CreateTeamModal.tsx
│ │ |   │   ├──  DetailTeamModal.tsx
│ │ |   │   └──  EditTeamModal.tsx
│ │ |   └── pages
│ │ |       └── teams-list.tsx
│ │ └── shared
│ │         └── constants
│ │             └──  columns.tsx
│ ├──  dashboard
├── i18n
│ ├── en
│ │ └── resource.json
│ ├──vi
│ │ └── resource.json
├── layouts
├── middleware
│ └── graphql-middleware.ts
├── pages
│ └── 404.tsx
├── services
│ └── graphql-services.ts
├── shared
│ ├── components
│ ├── constants
│ ├── hooks
│ ├── theme
│ ├── utils
├── App.tsx
├── index.tsx
├── routes.tsx
....
```
