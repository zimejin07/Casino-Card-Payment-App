'use client'

import { useState } from 'react'
import { CardData } from '../types'
import {
  formatCardNumber,
  formatExpiryDate,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
} from '../utils/validation'

interface Props {
  card: CardData | null
  onCancel: () => void
  onSave: (card: CardData) => void
  onDelete?: () => void
}

export default function CardForm({ card, onCancel, onSave, onDelete }: Props) {
  const [cardData, setCardData] = useState<CardData>(
    card ?? { cardNumber: '', expiryDate: '', cvv: '', cardholderName: '' }
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (field: keyof CardData, value: string) => {
    const formatted =
      field === 'cardNumber'
        ? formatCardNumber(value)
        : field === 'expiryDate'
        ? formatExpiryDate(value)
        : value
    setCardData({ ...cardData, [field]: formatted })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}

    if (!validateCardNumber(cardData.cardNumber)) errs.cardNumber = 'Invalid card number'
    if (!validateExpiryDate(cardData.expiryDate)) errs.expiryDate = 'Invalid expiry'
    if (!validateCVV(cardData.cvv)) errs.cvv = 'Invalid CVV'
    if (!cardData.cardholderName.trim()) errs.cardholderName = 'Required'

    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }

    onSave(cardData)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-[#1A212C]">
          {card ? 'Edit card' : 'Add new card'}
        </h2>
        <button type="button" onClick={onCancel} className="text-[#798291] hover:text-[#444E5D]">
          ✕
        </button>
      </div>

      <div className="mb-4">
        <label>Card Number</label>
        <input
          className="card-input w-full px-4 py-3 border rounded-lg mt-1"
          value={cardData.cardNumber}
          onChange={(e) => handleChange('cardNumber', e.target.value)}
          maxLength={19}
          placeholder="1234 5678 9012 3456"
        />
        {errors.cardNumber && <p className="text-sm text-red-500 mt-1">{errors.cardNumber}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label>Expiry Date</label>
          <input
            className="card-input w-full px-4 py-3 border rounded-lg mt-1"
            value={cardData.expiryDate}
            onChange={(e) => handleChange('expiryDate', e.target.value)}
            maxLength={5}
            placeholder="MM/YY"
          />
          {errors.expiryDate && <p className="text-sm text-red-500 mt-1">{errors.expiryDate}</p>}
        </div>
        <div>
          <label>CVV</label>
          <input
            type="password"
            className="card-input w-full px-4 py-3 border rounded-lg mt-1"
            value={cardData.cvv}
            onChange={(e) => handleChange('cvv', e.target.value)}
            maxLength={3}
            placeholder="123"
          />
          {errors.cvv && <p className="text-sm text-red-500 mt-1">{errors.cvv}</p>}
        </div>
      </div>

      <div className="mb-6">
        <label>Cardholder Name</label>
        <input
          className="card-input w-full px-4 py-3 border rounded-lg mt-1"
          value={cardData.cardholderName}
          onChange={(e) => handleChange('cardholderName', e.target.value)}
          placeholder="John Doe"
        />
        {errors.cardholderName && (
          <p className="text-sm text-red-500 mt-1">{errors.cardholderName}</p>
        )}
      </div>

      <div className="flex gap-4">
        {onDelete && (
          <button
            type="button"
            className="w-full bg-[#FC484C] hover:bg-[#e03c40] text-white py-3 rounded-lg"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
        <button
          type="submit"
          className="w-full bg-[#4C00C2] hover:bg-[#3B058E] text-white py-3 rounded-lg"
        >
          Save
        </button>
      </div>
    </form>
  )
}
