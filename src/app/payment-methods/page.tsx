'use client'

import { useEffect, useState } from 'react'
import CardList from './components/CardList'
import CardForm from './components/CardForm'
import { CardData } from './types'
import useCards from './hooks/useCards'

export default function PaymentMethodsPage() {
  const { cards, fetchCards, createCard, updateCard, deleteCard } = useCards()
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchCards()
  }, [])

  const handleAdd = () => {
    setEditingIndex(null)
    setShowForm(true)
  }

  const handleSave = async (card: CardData, index: number | null) => {
    if (index !== null) {
      await updateCard(cards[index].id!, card)
    } else {
      await createCard(card)
    }
    setShowForm(false)
  }

  const handleDelete = async (index: number) => {
    await deleteCard(cards[index].id!)
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] px-4 py-8 max-w-4xl mx-auto font-sans">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#1A212C]">Payment Methods</h1>
        <button
          className="bg-[#4C00C2] hover:bg-[#3B058E] text-white px-6 py-2 rounded-full font-medium"
          onClick={handleAdd}
        >
          Add new card
        </button>
      </header>

      {showForm ? (
        <CardForm
          card={editingIndex !== null ? cards[editingIndex] : null}
          onCancel={() => setShowForm(false)}
          onSave={(card) => handleSave(card, editingIndex)}
          onDelete={editingIndex !== null ? () => handleDelete(editingIndex) : undefined}
        />
      ) : (
        <CardList cards={cards} onEdit={(i) => {
          setEditingIndex(i)
          setShowForm(true)
        }} />
      )}
    </div>
  )
}
