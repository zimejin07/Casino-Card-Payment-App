import { render, screen, fireEvent } from "@testing-library/react";
import CardList from "../components/CardList";
import { CardData } from "../types";

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

describe("CardList", () => {
  it("renders fallback message when empty", () => {
    render(<CardList cards={[]} onEdit={() => {}} />);
    expect(screen.getByText(/No cards added yet/)).toBeInTheDocument();
  });

  it("renders all cards and calls onEdit", () => {
    const mockEdit = jest.fn();
    render(<CardList cards={mockCards} onEdit={mockEdit} />);

    expect(screen.getByText("User One")).toBeInTheDocument();
    expect(screen.getByText("User Two")).toBeInTheDocument();

    fireEvent.click(screen.getByText("User One"));
    expect(mockEdit).toHaveBeenCalledWith(0);
  });
});
