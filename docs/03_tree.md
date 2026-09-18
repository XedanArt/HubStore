.
└── HubStore/
    ├── dist/
    │   ├── ipc/
    │   │   ├── auth.js
    │   │   ├── auth.js.map
    │   │   ├── dbhandlers.js
    │   │   └── dbhandlers.js.map
    │   ├── renderer/
    │   ├── main.js
    │   ├── main.js.map
    │   ├── preload.js
    │   └── preload.js.map
    ├── docs
    ├── node_modules
    ├── prisma/
    │   ├── migrations/
    │   ├── dev.db
    │   └── schema.prisma
    ├── release
    ├── scripts/
    │   ├── build-ipc.mjs
    │   ├── build-main.mjs
    │   ├── build-preload.mjs
    │   ├── build-renderer.mjs
    │   ├── createAdmin.mjs
    │   └── seed.ts
    ├── src/
    │   ├── main/
    │   │   ├── ipc/
    │   │   │   ├── auth.ts
    │   │   │   ├── franchise.ts
    │   │   │   └── dbhandlers.ts
    │   │   ├── auth.ts
    │   │   ├── database.ts
    │   │   └── index.ts
    │   ├── preload/
    │   │   └── preload.ts
    │   ├── renderer/
    │   │   ├── public/
    │   │   ├── src/
    │   │   │   ├── assets/
    │   │   │   ├── components/
    │   │   │   ├── config/
    │   │   │   ├── hooks/
    │   │   │   ├── layout/
    │   │   │   │   ├── AppLayout.tsx
    │   │   │   │   ├── Header.tsx
    │   │   │   │   ├── MainView.tsx
    │   │   │   │   └── Sidebar.tsx
    │   │   │   ├── pages/
    │   │   │   │   ├── Franchises.tsx
    │   │   │   │   ├── Interventions.tsx
    │   │   │   │   ├── Settings.tsx
    │   │   │   │   └── Sites.tsx
    │   │   │   ├── services/
    │   │   │   │   ├── franchise.service.ts
    │   │   │   │   ├── intervention.service.ts
    │   │   │   │   └── site.service.ts
    │   │   │   ├── store/
    │   │   │   │   ├── auth.store.ts
    │   │   │   │   ├── franchise.store.ts
    │   │   │   │   ├── intervention.store.ts
    │   │   │   │   ├── site.store.ts
    │   │   │   │   ├── theme.store.ts
    │   │   │   │   └── ui.store.ts
    │   │   │   ├── types/
    │   │   │   │   ├── database.ts
    │   │   │   │   ├── index.ts
    │   │   │   │   └── ipc.ts
    │   │   │   ├── utils/
    │   │   │   ├── views/
    │   │   │   │   ├── auth/
    │   │   │   │   │   └── LoginPage.tsx
    │   │   │   │   ├── create/
    │   │   │   │   │   ├── CreateCard.tsx
    │   │   │   │   │   ├── CreateEntryPage.tsx
    │   │   │   │   │   ├── CreateFranchiseForm.tsx
    │   │   │   │   │   ├── CreateInterventionForm.tsx
    │   │   │   │   │   └── CreateSiteForm.tsx
    │   │   │   │   ├── dashboard/
    │   │   │   │   │   ├── DashboardPage.tsx
    │   │   │   │   │   ├── InterventionsPage.tsx
    │   │   │   │   │   ├── LogsPage.txt
    │   │   │   │   │   ├── ManagePage.tsx
    │   │   │   │   │   └── UsersPage.tsx
    │   │   │   │   ├── home/
    │   │   │   │   │   └── HomePage.tsx
    │   │   │   │   ├── intervention/
    │   │   │   │   │   └── InterventionPage.tsx
    │   │   │   │   └── site/
    │   │   │   │       └── SitePage.tsx
    │   │   │   ├── App.tsx
    │   │   │   ├── global.d.ts
    │   │   │   └── main.tsx
    │   │   ├── .gitignore
    │   │   ├── index.css
    │   │   ├── index.html
    │   │   ├── postcss.config.cjs
    │   │   ├── tailwind.config.cjs
    │   │   └── vite.config.ts
    │   └── shared
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json