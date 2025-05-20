import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PaymentMethodsPage from "../page";
import * as useCardsHook from "../hooks/useCards";
import { CardType } from "../types";

jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("PaymentMethodsPage", () => {
  const mockFetch = jest.fn();
  const mockCreate = jest.fn();
  const mockUpdate = jest.fn();
  const mockDelete = jest.fn();

  const mockCards = [
    {
      cardNumber: "4111111111111111",
      expiryDate: "12/30",
      cvv: "123",
      cardholderName: "Tester",
      type: "basic" as CardType,
    },
  ];

  beforeEach(() => {
    jest.spyOn(useCardsHook, "default").mockReturnValue({
      cards: mockCards,
      fetchCards: mockFetch,
      createCard: mockCreate,
      updateCard: mockUpdate,
      deleteCard: mockDelete,
    });
  });

  it("renders list and opens form modal", async () => {
    render(<PaymentMethodsPage />);

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    expect(screen.getByText("Payment Methods")).toBeInTheDocument();
    expect(screen.getByText("Tester")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Add new card"));
    expect(screen.getByText("Add new card")).toBeInTheDocument();
    expect(screen.getByText("Card number")).toBeInTheDocument();
  });
});
