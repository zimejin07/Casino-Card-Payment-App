import { render, screen, fireEvent } from "@testing-library/react";
import CardForm from "../components/CardForm";
import "@testing-library/jest-dom";
import React from "react";

global.React = React;

describe("CardForm minimal smoke test", () => {
  it("renders without crashing and Save button is clickable", () => {
    const mockOnSave = jest.fn();

    render(<CardForm onSave={mockOnSave} onCancel={() => {}} card={null} />);

    const saveButtons = screen.getAllByText(/Save/i);
    fireEvent.click(saveButtons[0]);

    expect(saveButtons.length).toBeGreaterThan(0);
  });
});
