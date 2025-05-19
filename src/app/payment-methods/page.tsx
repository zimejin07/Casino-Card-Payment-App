"use client";

import { useEffect, useState, useCallback } from "react";
import CardList from "./components/CardList";
import CardForm from "./components/CardForm";
import { CardData } from "./types";
import useCards from "./hooks/useCards";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

export default function PaymentMethodsPage() {
  const { cards, fetchCards, createCard, updateCard, deleteCard } = useCards();
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCards();
  }, []);

  const handleAdd = () => {
    setEditingIndex(null);
    setShowForm(true);
  };

  const handleSave = async (card: CardData, index: number | null) => {
    try {
      if (index !== null) {
        await updateCard(cards[index]?.id!, card);
      } else {
        await createCard(card);
      }

      setShowForm(false);
      toast.success("Card saved!");
    } catch (error) {
      console.error("Error saving card:", error);
      toast.error("Failed to save card. Please try again.");
    }
  };

  const handleDelete = async (index: number) => {
    try {
      await deleteCard(cards[index]?.id!);
      setShowForm(false);
      toast.success("Card deleted!");
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Failed to delete card. Please try again.");
    }
  };

  // Close modal with ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowForm(false);
    }
  }, []);

  useEffect(() => {
    if (showForm) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [showForm, handleKeyDown]);

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

      <AnimatePresence mode="wait">
        {!showForm && (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CardList
              cards={cards}
              onEdit={(i) => {
                setEditingIndex(i);
                setShowForm(true);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Overlay */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            key="form-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-center items-end"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full max-w-xl bg-white rounded-t-2xl p-6 shadow-xl"
              drag="y"
              dragConstraints={{ top: 0, bottom: 100 }}
              dragElastic={0.2}
              onDragEnd={(event, info) => {
                if (info.offset.y > 100) setShowForm(false);
              }}
            >
              <CardForm
                card={editingIndex !== null ? cards[editingIndex] : null}
                onCancel={() => setShowForm(false)}
                onSave={(card) => handleSave(card, editingIndex)}
                onDelete={
                  editingIndex !== null
                    ? () => handleDelete(editingIndex)
                    : undefined
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
