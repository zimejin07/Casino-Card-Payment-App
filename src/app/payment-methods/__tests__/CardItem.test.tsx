import { render, screen, fireEvent } from "@testing-library/react";
import CardItem from "../components/CardItem";
import { CardData } from "../types";
import React from "react";

global.React = React;

const sampleCard: CardData = {
  cardNumber: "4111111111111111",
  expiryDate: "12/30",
  cvv: "123",
  cardholderName: "Test User",
  type: "black",
};

describe("CardItem smoke test", () => {
  it("renders key card data", () => {
    render(<CardItem card={sampleCard} onClick={() => {}} index={0} />);

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByText(/1111/)).toBeInTheDocument();
    expect(screen.getByText(/12\/30/)).toBeInTheDocument();
  });

  it("fires click handler", () => {
    const mockClick = jest.fn();
    render(<CardItem card={sampleCard} onClick={mockClick} index={0} />);

    fireEvent.click(screen.getByText("Test User"));
    expect(mockClick).toHaveBeenCalled();
  });
});
