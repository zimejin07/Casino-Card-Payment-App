# 💳 Casino Payment Methods App

A React + Next.js (App Router) web application to manage bank cards.

---

<p align="center">
  <img src="/public/preview.png" alt="App Preview" width="300" />
</p>

---

<p align="center">
  <img src="/public/form-preview.png" alt="form Preview" width="300" />
</p>


## 🚀 Features

- ✅ Add / Edit / Delete payment cards
- ✅ Form validation with live UI feedback
- ✅ Fields: Cardholder Name, Card Number, Expiry, CVV, and Card Type
- ✅ Mobile-friendly layout using TailwindCSS
- ✅ `useReducer`-based form state management
- ✅ GraphQL API integration via Hygraph + Apollo Client
- ✅ Built-in fallback to mock API for zero-config review

---

## 🔁 API Layer

The app integrates a GraphQL API using Hygraph:

- Fetches data via `/api/cards/get`, which proxies to Hygraph.
- Uses Apollo Client for typed mutations (create, edit, delete).
- Falls back to local mock data on API failure (e.g. token expiration), ensuring smooth runtime experience.

---

## 🧠 Design Considerations

- **Componentized architecture** – Reusable units like `<CardForm />`, `<CardItem />`, etc.
- **Accessible inputs** – Semantic labels (in progress).
- **Minimal global state** – `useReducer` + props-based data flow.
- **UI Feedback** – Real-time validation, toasts, and modals.
- **Mobile Responsiveness** – Manually tested using Tailwind utilities.

---

## 🧪 Testing Plan

Tested with **Jest** + **React Testing Library**:

| Component              | Coverage                                |
|------------------------|------------------------------------------|
| `CardForm`             | Input rendering, validation, submit     |
| `CardList`             | Renders fallback + list                 |
| `CardItem`             | Interaction and data rendering          |
| `PaymentMethodsPage`   | Full-page behavior and modal flow       |

✅ All test suites pass:

- `CardForm.test.tsx`
- `CardItem.test.tsx`
- `CardList.test.tsx`
- `PaymentMethodsPage.test.tsx`

---

## 🧰 Tech Stack

| Tool           | Purpose                      |
|----------------|------------------------------|
| React 19       | UI & Hooks                   |
| Next.js 15     | Routing + API Layer          |
| Tailwind CSS   | Utility-first styling        |
| TypeScript     | Type-safe data models        |
| Apollo Client  | GraphQL integration (Hygraph)|
| Jest + RTL     | Unit testing                 |
| Docker         | Dev containerization         |

---

## 🐳 Run in Docker (Preferred)

```bash
docker build -t casumo-payment-app .
docker run -p 3001:3000 casumo-payment-app
```

👉 App available at: [http://localhost:3001](http://localhost:3001)

> ⚠️ Runs in **development mode** inside Docker to ensure an easy deployment and consistent review experience.

---

## 🔄 Local Development

```bash
pnpm install
pnpm dev
```

👉 Open at: [http://localhost:3000](http://localhost:3000)

---

## 🌍 Environment Setup

The `.env.local` file includes the public Hygraph API endpoint.

> ⚠️ Typically, `.env` files are git-ignored. This file is included intentionally to ensure out-of-the-box functionality during assessment.

---

## 📁 Folder Structure

```
/app
  /payment-methods
    components/
    hooks/
    utils/
    __tests__/
  page.tsx
/pages/api/cards/
  get.ts
  create.ts
  update.ts
  delete.ts
```

---

## ⚙️ Limitations & Trade-offs

| Area                   | Status     | Notes                                           |
|------------------------|------------|-------------------------------------------------|
| SSR / SEO              | ❌         | Not necessary for this SPA                      |
| Advanced validation    | ❌         | Luhn check skipped for simplicity               |
| CI/CD                  | ❌         | Not part of the assessment scope                |
| Auth                   | ❌         | Not required                                    |
| Hygraph auth fallback  | ✅         | Ensures continuity when token expires           |

---

## 📝 Final Notes

This app was built with clarity, interactivity, and developer experience as top priorities, under tight time constraints.

> While certain features were simplified, the core logic, architecture, and DX best practices adhere to production-grade standards.

---

## 🧑‍💻 Author

**Zimuzo Ejinkeonye**  
[github.com/zimejin07](https://github.com/zimejin07)
