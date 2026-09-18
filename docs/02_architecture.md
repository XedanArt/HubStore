+-----------------------------+
|        ElectronMain         |
|  - Database (Prisma)        |
|  - IPC Handlers             |
+-------------+---------------+
              |
              | IPC
              v
+-----------------------------+
|         PreloadBridge       |
|  - expose: api.db, api.ipc  |
+-------------+---------------+
              |
              v
+-----------------------------+
|          Services           |
|  + FranchiseService         |
|  + SiteService              |
|  + InterventionService      |
+-------------+---------------+
              |
              v
+-----------------------------+
|           Stores            |
|  + UIStore                  |
|  + FranchiseStore           |
|  + ...                      |
+-------------+---------------+
              |
              v
+-----------------------------+
|           Layout            |
|  + AppLayout                |
|  + Header                   |
|  + Sidebar                  |
|  + MainView                 |
+-------------+---------------+
              |
              v
+-----------------------------+
|            Pages            |
|  + Dashboard                |
|  + Franchises               |
|  + Sites                    |
|  + Interventions            |
|  + Settings                 |
|  + HomePage                 |
|  + CreateEntryPage          |
+-------------+---------------+
              |
              v
+-----------------------------+
|         Components          |
|  + CreateCard               |
|  + Forms                    |
|  + Buttons, Inputs, etc.    |
+-----------------------------+
