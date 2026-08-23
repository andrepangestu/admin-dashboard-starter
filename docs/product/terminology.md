# Terminology

| Term               | Meaning                                                                             |
| ------------------ | ----------------------------------------------------------------------------------- |
| Admin app          | The browser SPA under `apps/admin`                                                  |
| Backend API        | The separately deployed service that owns business data and authorization decisions |
| Feature            | A cohesive business capability with its own API, model, UI, and tests               |
| Route              | URL-level composition managed by TanStack Router                                    |
| Remote state       | Data owned by the backend and cached by TanStack Query                              |
| Client state       | Ephemeral browser interaction state owned near its UI                               |
| Permission         | A named capability granted by the backend, such as `users.read`                     |
| Role               | A backend-managed collection of permissions                                         |
| Design primitive   | A stable low-level UI building block such as Button or Card                         |
| Generated client   | Replaceable TypeScript output derived from the OpenAPI contract                     |
| Demonstration data | Local sample data enabled only through `VITE_ENABLE_MOCKS`                          |
