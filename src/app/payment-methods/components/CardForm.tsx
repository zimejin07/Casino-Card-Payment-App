'use client'

import { useEffect, useState } from 'react'
import { CardData } from '../types'
import {
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
} from '../utils/validation'

type Props = {
  card: CardData | null
  onCancel: () => void
  onSave: (data: CardData) => void
  onDelete?: () => void
}

type FieldState = {
  value: string
  valid: boolean | null
}

export default function CardForm({ card, onCancel, onSave, onDelete }: Props) {
  const [cardNumber, setCardNumber] = useState<FieldState>({ value: '', valid: null })
  const [expiryDate, setExpiryDate] = useState<FieldState>({ value: '', valid: null })
  const [cvv, setCvv] = useState<FieldState>({ value: '', valid: null })
  const [cardholderName, setCardholderName] = useState<FieldState>({ value: '', valid: null })

  useEffect(() => {
    if (card) {
      setCardNumber({ value: card.cardNumber, valid: null })
      setExpiryDate({ value: card.expiryDate, valid: null })
      setCvv({ value: card.cvv, valid: null })
      setCardholderName({ value: card.cardholderName, valid: null })
    }
  }, [card])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const isCardNumberValid = validateCardNumber(cardNumber.value)
    const isExpiryValid = validateExpiryDate(expiryDate.value)
    const isCvvValid = validateCVV(cvv.value)
    const isNameValid = cardholderName.value.trim().length > 0

    setCardNumber((prev) => ({ ...prev, valid: isCardNumberValid }))
    setExpiryDate((prev) => ({ ...prev, valid: isExpiryValid }))
    setCvv((prev) => ({ ...prev, valid: isCvvValid }))
    setCardholderName((prev) => ({ ...prev, valid: isNameValid }))

    if (isCardNumberValid && isExpiryValid && isCvvValid && isNameValid) {
      onSave({
        cardNumber: cardNumber.value,
        expiryDate: expiryDate.value,
        cvv: cvv.value,
        cardholderName: cardholderName.value,
      })
    }
  }

  const inputClass = (valid: boolean | null) =>
    `w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition ${
      valid === null
        ? 'border-gray-300 focus:ring-casumo-purple'
        : valid
        ? 'border-casumo-success focus:ring-casumo-success'
        : 'border-casumo-error focus:ring-casumo-error'
    }`

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A212C]">
          {card ? 'Edit card' : 'Add new card'}
        </h2>
        <button
          onClick={onCancel}
          className="text-casumo-grayText hover:text-[#444E5D]"
        >
          <i className="fas fa-times text-xl"></i>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card Number */}
        <div>
          <label className="block text-[#444E5D] mb-2">Card number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className={inputClass(cardNumber.valid)}
            value={cardNumber.value}
            onChange={(e) =>
              setCardNumber({ value: e.target.value, valid: null })
            }
          />
          {cardNumber.valid === false && (
            <p className="text-casumo-error text-sm mt-1">
              Please enter a valid card number
            </p>
          )}
        </div>

        {/* Expiry & CVV */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#444E5D] mb-2">Expiry date</label>
            <input
              type="text"
              placeholder="MM/YY"
              maxLength={5}
              className={inputClass(expiryDate.valid)}
              value={expiryDate.value}
              onChange={(e) =>
                setExpiryDate({ value: e.target.value, valid: null })
              }
            />
            {expiryDate.valid === false && (
              <p className="text-casumo-error text-sm mt-1">
                Please enter a valid expiry date
              </p>
            )}
          </div>

          <div>
            <label className="block text-[#444E5D] mb-2">CVV</label>
            <input
              type="password"
              placeholder="123"
              maxLength={3}
              className={inputClass(cvv.valid)}
              value={cvv.value}
              onChange={(e) => setCvv({ value: e.target.value, valid: null })}
            />
            {cvv.valid === false && (
              <p className="text-casumo-error text-sm mt-1">
                Please enter a valid CVV
              </p>
            )}
          </div>
        </div>

        {/* Cardholder Name */}
        <div>
          <label className="block text-[#444E5D] mb-2">Cardholder name</label>
          <input
            type="text"
            placeholder="John Doe"
            className={inputClass(cardholderName.valid)}
            value={cardholderName.value}
            onChange={(e) =>
              setCardholderName({ value: e.target.value, valid: null })
            }
          />
          {cardholderName.valid === false && (
            <p className="text-casumo-error text-sm mt-1">
              Please enter the cardholder name
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4">
          {onDelete && (
            <button
              type="button"
              onClick={onDelete}
              className="bg-casumo-error hover:bg-red-600 text-white py-3 rounded-lg font-medium"
            >
              Delete card
            </button>
          )}
          <button
            type="submit"
            className="bg-casumo-purple hover:bg-casumo-purpleDark text-white py-3 rounded-lg font-medium"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}
