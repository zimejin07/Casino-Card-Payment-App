"use client";

import { useEffect, useState } from "react";
import { CardData } from "../types";
import {
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
} from "../utils/validation";
import FieldInput from "./FieldInput";

type Props = {
  card: CardData | null;
  onCancel: () => void;
  onSave: (data: CardData) => void;
  onDelete?: () => void;
};

type FieldState = {
  value: string;
  valid: boolean | null;
};

export default function CardForm({ card, onCancel, onSave, onDelete }: Props) {
  const [cardNumber, setCardNumber] = useState<FieldState>({
    value: "",
    valid: null,
  });
  const [expiryDate, setExpiryDate] = useState<FieldState>({
    value: "",
    valid: null,
  });
  const [cvv, setCvv] = useState<FieldState>({ value: "", valid: null });
  const [cardholderName, setCardholderName] = useState<FieldState>({
    value: "",
    valid: null,
  });

  useEffect(() => {
    if (card) {
      setCardNumber({ value: card.cardNumber, valid: null });
      setExpiryDate({ value: card.expiryDate, valid: null });
      setCvv({ value: card.cvv, valid: null });
      setCardholderName({ value: card.cardholderName, valid: null });
    }
  }, [card]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isCardNumberValid = validateCardNumber(cardNumber.value);
    const isExpiryValid = validateExpiryDate(expiryDate.value);
    const isCvvValid = validateCVV(cvv.value);
    const isNameValid = cardholderName.value.trim().length > 0;

    setCardNumber((prev) => ({ ...prev, valid: isCardNumberValid }));
    setExpiryDate((prev) => ({ ...prev, valid: isExpiryValid }));
    setCvv((prev) => ({ ...prev, valid: isCvvValid }));
    setCardholderName((prev) => ({ ...prev, valid: isNameValid }));

    if (isCardNumberValid && isExpiryValid && isCvvValid && isNameValid) {
      onSave({
        cardNumber: cardNumber.value,
        expiryDate: expiryDate.value,
        cvv: cvv.value,
        cardholderName: cardholderName.value,
      });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A212C]">
          {card ? "Edit card" : "Add new card"}
        </h2>
        <button
          onClick={onCancel}
          className="text-[var(--casumo-gray)] hover:text-[#444E5D]"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldInput
          label="Card number"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          value={cardNumber.value}
          onChange={(e) =>
            setCardNumber({ value: e.target.value, valid: null })
          }
          valid={cardNumber.valid}
          error="Please enter a valid card number"
        />

        <div className="grid grid-cols-2 gap-4">
          <FieldInput
            label="Expiry date"
            placeholder="MM/YY"
            maxLength={5}
            value={expiryDate.value}
            onChange={(e) =>
              setExpiryDate({ value: e.target.value, valid: null })
            }
            valid={expiryDate.valid}
            error="Please enter a valid expiry date"
          />

          <FieldInput
            label="CVV"
            type="password"
            placeholder="123"
            maxLength={3}
            value={cvv.value}
            onChange={(e) => setCvv({ value: e.target.value, valid: null })}
            valid={cvv.valid}
            error="Please enter a valid CVV"
          />
        </div>

        <FieldInput
          label="Cardholder name"
          placeholder="John Doe"
          maxLength={40}
          value={cardholderName.value}
          onChange={(e) =>
            setCardholderName({ value: e.target.value, valid: null })
          }
          valid={cardholderName.valid}
          error="Please enter the cardholder name"
        />

        <div className="grid grid-cols-2 gap-4 pt-4">
          {onDelete && (
            <button type="button" onClick={onDelete} className="btn-danger">
              Delete card
            </button>
          )}
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
