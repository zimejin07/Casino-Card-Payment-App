"use client";

import { CardData } from "../types";
import { AnimatePresence } from "framer-motion";
import CardItem from "./CardItem";

type Props = {
  cards: CardData[];
  onEdit: (index: number) => void;
};

export default function CardList({ cards, onEdit }: Props) {
  if (cards.length === 0) {
    return (
      <div className="text-center text-[var(--casumo-gray)] mt-12">
        <i className="fas fa-credit-card text-5xl mb-4"></i>
        <p className="text-xl font-medium">No cards added yet</p>
        <p className="mt-2">Add your first card to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {cards.map((card, index) => (
            <CardItem
              key={card.id ?? index}
              card={card}
              index={index}
              onClick={() => onEdit(index)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
