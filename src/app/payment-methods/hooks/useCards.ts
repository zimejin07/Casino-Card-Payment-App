"use client";

import { useState } from "react";
import { CardData } from "../types";

export default function useCards() {
  const [cards, setCards] = useState<CardData[]>([]);

  async function fetchCards() {
    const res = await fetch("/api/cards/get", { cache: "no-store" });
    const data = await res.json();
    setCards(data);
  }

  async function createCard(card: CardData) {
    try {
      const response = await fetch("/api/cards/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(card),
        cache: "no-store",
      });

      if (!response.ok) {
        console.error(`Failed to create card: ${response.statusText}`);
        return;
      }

      const created = await response.json();

      setCards((prev) => [...prev, { ...card, id: created.id }]);
    } catch (error) {
      console.error(`Network error: ${error}`);
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

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Update failed");
      }

      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, ...card } : c))
      );
    } catch (error) {
      console.error("Failed to update card:", error);
    }
  }

  async function deleteCard(id: string) {
    console.log("raw", id);
    try {
      const res = await fetch(`/api/cards/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
        cache: "no-store",
      });

      console.log("the id payload", JSON.stringify({ id }));

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || "Delete failed");
      }

      setCards((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Failed to delete card:", error);
    }
  }

  return { cards, fetchCards, createCard, updateCard, deleteCard };
}
