"use client";

import { useState } from "react";
import { CardData } from "../types";

export default function useCards() {
  const [cards, setCards] = useState<CardData[]>([]);

  async function fetchCards() {
    const res = await fetch("/api/cards/get");
    const data = await res.json();
    setCards(data);
  }

  async function createCard(card: CardData) {
    await fetch("/api/cards/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(card),
    });
    await fetchCards();
  }

  async function updateCard(id: string, card: CardData) {
    await fetch("/api/cards/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...card }),
    });
    await fetchCards();
  }

  async function deleteCard(id: string) {
    await fetch("/api/cards/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    await fetchCards();
  }

  return { cards, fetchCards, createCard, updateCard, deleteCard };
}
