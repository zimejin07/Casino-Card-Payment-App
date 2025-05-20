# 💳 Casumo Payment Methods App

A small React + Next.js app for managing bank cards, built for the **Casumo Frontend Engineer Technical Assessment**.

---

## 🚀 Features

- Add, edit, and delete payment cards
- Form validation with UI feedback for error/success
- Full support for:
  - Cardholder name
  - Card number
  - Expiry date
  - CVV
  - Card type (basic, black, premium)
- Fully functional responsive UI using TailwindCSS
- Uses `useReducer` for form state
  
- **Data Layer**: Integrated with **Hygraph (GraphQL CMS)** using Apollo Client for managing card data via GraphQL queries and mutations. This decouples the UI from hardcoded local state and demonstrates real-world API interaction.

---

## 🧠 Design Considerations

- **Componentization**: Modular structure (`CardItem`, `CardForm`, `CardList`, etc.)
- **State Management**: Minimal global state, primarily `useReducer` and prop drilling
- **Validation**: Pure validation utils for maintainability
- **UI/UX**: Matches Casumo design system (spacing, typography, colors)

---

## 🔬 Testing Strategy

Tests written using:

- `@testing-library/react`
- `jest`
- Custom mock hooks

We created safe, minimal tests for:

- Card rendering and click handling
- Form rendering and validation
- Page interaction: opening form modal, fetching cards

### ✅ Passed test suites:

- `CardForm.test.tsx`
- `CardItem.test.tsx`
- `CardList.test.tsx`
- `PaymentMethodsPage.test.tsx`

### 📋 Coverage Summary:

We focused on interaction paths and key render assertions. Full unit test coverage was not prioritized due to time constraints.

---

## 🔧 Scope Notes & Trade-offs

To focus on delivering the core functionality and user experience within time constraints, a few areas were deliberately simplified:

- **Type Coverage**: TypeScript is used throughout, though some areas use relaxed typing (`any`) for faster iteration.
- **Rendering Strategy**: Runs in **client-side mode only**, aligning with the interactive use case (no SEO or SSR needed).
- **Form Validation**: Basic correctness and feedback UX are prioritized; advanced rules (e.g. Luhn checks) are deferred.
- **Data Persistence**: Cards are stored in local memory only, per spec.
- **Responsive Layout**: Tailwind utilities used for mobile responsiveness; manually tested on desktop and key breakpoints.
- **Docker Runtime**: Runs in development mode via Docker to simplify review setup and avoid build-time issues.

---

## 🐳 Docker Support

The app is Dockerized to run the **development server** in a container.

### ✅ To Run:

```bash
# Build image
docker build -t casumo-payment-app .

# Run container on port 3001 (in case 3000 is taken)
docker run -p 3001:3000 casumo-payment-app
```

Then open: [http://localhost:3001](http://localhost:3001)

---

## 🧪 Local Dev (without Docker)

```bash
pnpm install
pnpm dev
```

Runs on: [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Folder Structure

```
/app
  /payment-methods
    components/
      CardForm.tsx
      CardItem.tsx
      CardList.tsx
      FieldInput.tsx
      FieldSelect.tsx
      ToastProvider.tsx
    hooks/
      useCards.ts
      cardFormReducer.ts
    utils/
      validation.ts
    __tests__/
      CardForm.test.tsx
      CardItem.test.tsx
      CardList.test.tsx
      PaymentMethodsPage.test.tsx
  page.tsx
```

---

## 🛠️ Tools Used

- **Next.js 15 (App Router)**
- **React 19**
- **TailwindCSS**
- **TypeScript**
- **Apollo Client** (light usage)
- **@testing-library/react** & **jest**
- **Docker** (for dev runtime)

---

## 🏁 What Was Left Out (And Why)

| Feature                  | Reason                                     |
|--------------------------|--------------------------------------------|
| SSR/SEO                 | Not needed for this scoped SPA             |
| Complete type safety    | Slowed down iteration                      |
| CI/CD setup             | Out of scope                               |
