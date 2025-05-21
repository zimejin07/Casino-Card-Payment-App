"use client";

import { useState } from "react";
import { CardData } from "../types";

const mockCards: CardData[] = [
  {
    id: "mock-1",
    cardNumber: "4111111111111111",
    expiryDate: "12/30",
    cvv: "123",
    cardholderName: "Tomasa D. Marcantonio",
    type: "basic",
  },
  {
    id: "mock-2",
    cardNumber: "5500000000000004",
    expiryDate: "01/26",
    cvv: "456",
    cardholderName: "Dana J. Clark",
    type: "black",
  },
  {
    id: "mock-3",
    cardNumber: "340000000000009",
    expiryDate: "03/27",
    cvv: "789",
    cardholderName: "Reino Hyvärinen",
    type: "premium",
  },
  {
    id: "mock-4",
    cardNumber: "6011000000000004",
    expiryDate: "06/28",
    cvv: "321",
    cardholderName: "Riikka Tiihonen",
    type: "black",
  },
];

export default function useCards() {
  const [cards, setCards] = useState<CardData[]>([]);

  async function fetchCards() {
    try {
      const res = await fetch("/api/cards/get", { cache: "no-store" });
      if (!res.ok) throw new Error("API failed");
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.warn("Falling back to mock data:", err);
      setCards(mockCards);
    }
  }

  async function createCard(card: CardData) {
    try {
      const response = await fetch("/api/cards/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
        cache: "no-store",
      });

      if (!response.ok) throw new Error(`Create failed`);

      const created = await response.json();
      setCards((prev) => [
        ...prev,
        { ...card, id: created.id || crypto.randomUUID() },
      ]);
    } catch (error) {
      console.warn("Create failed, fallback:", error);
      setCards((prev) => [...prev, { ...card, id: crypto.randomUUID() }]);
    }
  }

  async function updateCard(id: string, card: Partial<CardData>) {
    try {
      const res = await fetch("/api/cards/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, data: card }),
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Update failed");

      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...card } : c))
      );
    } catch (error) {
      console.warn("Update failed, fallback:", error);
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...card } : c))
      );
    }
  }

  async function deleteCard(id: string) {
    try {
      const res = await fetch(`/api/cards/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Delete failed");

      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.warn("Delete failed, fallback:", error);
      setCards((prev) => prev.filter((c) => c.id !== id));
    }
  }

  return { cards, fetchCards, createCard, updateCard, deleteCard };
}
