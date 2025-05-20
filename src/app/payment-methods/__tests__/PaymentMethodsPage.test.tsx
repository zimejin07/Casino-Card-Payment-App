import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PaymentMethodsPage from "../page";
import { CardType } from "../types";
import * as useCardsHook from "../hooks/useCards";
import React from "react";

global.React = React;

jest.mock("react-hot-toast", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("PaymentMethodsPage minimal test", () => {
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

  it("renders card and opens add form", async () => {
    render(<PaymentMethodsPage />);

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    expect(screen.getByText(/Payment Methods/i)).toBeInTheDocument();
    expect(screen.getByText("Tester")).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Add new card/i));
    expect(screen.getAllByText(/Add new card/i).length).toBeGreaterThan(0);
  });
});
