import { render, screen, fireEvent } from "@testing-library/react";
import CardList from "../components/CardList";
import { CardData } from "../types";
import React from "react";

global.React = React;

const mockCards: CardData[] = [
  {
    cardNumber: "4111111111111111",
    expiryDate: "12/30",
    cvv: "123",
    cardholderName: "User One",
    type: "premium",
  },
  {
    cardNumber: "5500000000000004",
    expiryDate: "01/25",
    cvv: "456",
    cardholderName: "User Two",
    type: "basic",
  },
];

describe("CardList minimal test", () => {
  it("shows empty message", () => {
    render(<CardList cards={[]} onEdit={() => {}} />);
    expect(screen.getByText(/no cards/i)).toBeInTheDocument();
  });

  it("renders multiple cards and handles edit click", () => {
    const mockEdit = jest.fn();
    render(<CardList cards={mockCards} onEdit={mockEdit} />);

    expect(screen.getByText("User One")).toBeInTheDocument();
    expect(screen.getByText("User Two")).toBeInTheDocument();

    fireEvent.click(screen.getByText("User One"));
    expect(mockEdit).toHaveBeenCalled();
  });
});
