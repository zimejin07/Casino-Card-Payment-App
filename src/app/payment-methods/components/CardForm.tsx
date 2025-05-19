"use client";

import { useEffect, useReducer, useState } from "react";
import { CardData, CardType } from "../types";
import {
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  formatCardNumber,
  formatExpiryDate,
} from "../utils/validation";
import FieldInput from "./FieldInput";
import FieldSelect from "./FieldSelect";
import {
  CardFormField,
  FieldState,
  cardFormReducer,
} from "../hooks/cardFormReducer";

type Props = {
  card: CardData | null;
  onCancel: () => void;
  onSave: (data: CardData) => void;
  onDelete?: () => void;
};

const initialFormState: Record<CardFormField, FieldState> = {
  cardNumber: { value: "", valid: null },
  expiryDate: { value: "", valid: null },
  cvv: { value: "", valid: null },
  cardholderName: { value: "", valid: null },
};

export default function CardForm({ card, onCancel, onSave, onDelete }: Props) {
  const isEditMode = !!card;
  const [formState, dispatch] = useReducer(cardFormReducer, initialFormState);
  const [type, setType] = useState<CardType>("basic");

  useEffect(() => {
    if (card) {
      dispatch({
        type: "SET_ALL_FIELDS",
        payload: {
          cardNumber: { value: formatCardNumber(card.cardNumber), valid: null },
          expiryDate: { value: formatExpiryDate(card.expiryDate), valid: null },
          cvv: { value: String(card.cvv), valid: null },
          cardholderName: { value: card.cardholderName, valid: null },
        },
      });
      setType(card.type ?? "basic");
    }
  }, [card]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validations = {
      cardNumber: validateCardNumber(formState.cardNumber.value),
      expiryDate: validateExpiryDate(formState.expiryDate.value),
      cvv: validateCVV(formState.cvv.value),
      cardholderName: formState.cardholderName.value.trim().length > 0,
    };

    Object.entries(validations).forEach(([field, isValid]) =>
      dispatch({
        type: "VALIDATE_FIELD",
        field: field as CardFormField,
        isValid,
      })
    );

    const allValid = Object.values(validations).every(Boolean);
    if (!allValid) return;

    const sanitizedData: CardData = {
      cardNumber: formState.cardNumber.value.replace(/\s+/g, ""),
      expiryDate: formState.expiryDate.value,
      cvv: String(formState.cvv.value),
      cardholderName: formState.cardholderName.value,
      ...(isEditMode ? {} : { type }),
    };

    onSave(sanitizedData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A212C]">
          {isEditMode ? "Edit card" : "Add new card"}
        </h2>
        <button
          onClick={onCancel}
          className="text-[var(--casumo-gray)] hover:text-[#444E5D]"
        >
          <i className="fas fa-times text-xl" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FieldInput
          label="Card number"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          value={formState.cardNumber.value}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "cardNumber",
              value: formatCardNumber(e.target.value),
            })
          }
          valid={formState.cardNumber.valid}
          error="Please enter a valid card number"
        />

        <div className="grid grid-cols-2 gap-4">
          <FieldInput
            label="Expiry date"
            placeholder="MM/YY"
            maxLength={5}
            value={formState.expiryDate.value}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "expiryDate",
                value: formatExpiryDate(e.target.value),
              })
            }
            valid={formState.expiryDate.valid}
            error="Please enter a valid expiry date"
          />

          <FieldInput
            label="CVV"
            type="password"
            placeholder="123"
            maxLength={3}
            value={formState.cvv.value}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "cvv",
                value: e.target.value,
              })
            }
            valid={formState.cvv.valid}
            error="Please enter a valid CVV"
          />
        </div>

        <FieldInput
          label="Cardholder name"
          placeholder="John Doe"
          maxLength={40}
          value={formState.cardholderName.value}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "cardholderName",
              value: e.target.value,
            })
          }
          valid={formState.cardholderName.valid}
          error="Please enter the cardholder name"
        />

        {!isEditMode && (
          <FieldSelect
            label="Card type"
            value={type}
            onChange={(e) => setType(e.target.value as CardType)}
          />
        )}

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
