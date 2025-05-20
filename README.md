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
- No backend — local state persistence

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

## ⚠️ Known Limitations

- ⚠️ **Types**: Some `any`/loose types exist for speed.
- ⚠️ **No SSR**: Not optimized for SEO or SSR deployment.
- ⚠️ **Not fully production-ready**: Skipped extensive validation logic & data layer abstraction.
- ⚠️ **No persistent storage**: All card data is lost on page refresh (by design for this task).
- ⚠️ **No mobile testing**: Responsive layout tested, but not on physical devices.
- ⚠️ **No build-time optimization**: Running dev version inside Docker due to runtime type issues.

---

## 🐳 Docker Support

This app is Dockerized to run the **development server** inside a container.

### ✅ To Run:

```bash
# Build image
docker build -t casumo-payment-app .

# Run container on port 3001 (in case 3000 is taken)
docker run -p 3001:3000 casumo-payment-app
