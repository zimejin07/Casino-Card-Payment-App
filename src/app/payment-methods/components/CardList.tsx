"use client";

import { CardData } from "../types";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  cards: CardData[];
  onEdit: (index: number) => void;
};

export default function CardList({ cards, onEdit }: Props) {
  if (cards.length === 0) {
    return (
      <div className="text-center text-[#798291] mt-12">
        <i className="fas fa-credit-card text-5xl mb-4"></i>
        <p className="text-xl">No cards added yet</p>
        <p className="mt-2">Add your first card to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            onClick={() => onEdit(index)}
            className="bg-gradient-to-r from-purple-800 to-purple-600 text-white p-6 rounded-2xl shadow cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-sm opacity-80">Cardholder name</p>
                <p className="text-lg font-semibold">{card.cardholderName}</p>
              </div>
              <div className="text-xl">
                <i className="far fa-credit-card"></i>
              </div>
            </div>
            <div className="my-2">
              <p className="text-sm opacity-80">Card number</p>
              <p className="text-lg font-mono tracking-wider">
                •••• •••• •••• {card.cardNumber.slice(-4)}
              </p>
            </div>
            <div className="flex justify-between text-sm opacity-90">
              <p>Expires {card.expiryDate}</p>
              <p>CVV •••</p>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
