import { CardType } from "@/app/payment-methods/types";

export const cardThemes: Record<CardType, { front: string; back: string }> = {
  basic: {
    front: "from-[var(--casumo-purple)] to-[var(--casumo-purple-dark)]",
    back: "from-[#32007E] to-[var(--casumo-purple-dark)]",
  },
  black: {
    front: "from-gray-900 to-gray-800",
    back: "from-black to-gray-800",
  },
  premium: {
    front: "from-yellow-400 to-yellow-600",
    back: "from-yellow-700 to-yellow-800",
  },
};
