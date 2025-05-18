import { CardType } from "@/app/payment-methods/types";

export const cardThemes: Record<
  CardType,
  {
    frontGradient: string;
    backGradient: string;
    badgeText: string;
    badgeColor: string;
  }
> = {
  basic: {
    frontGradient: "from-[#4C00C2] to-[#3B058E]",
    backGradient: "from-[#32007E] to-[#3B058E]",
    badgeText: "Basic",
    badgeColor: "bg-gray-500",
  },
  black: {
    frontGradient: "from-[#1E1E1E] to-[#2B2B2B]",
    backGradient: "from-[#111] to-[#222]",
    badgeText: "Black",
    badgeColor: "bg-black",
  },
  premium: {
    frontGradient: "from-[#FFD700] to-[#FFA500]",
    backGradient: "from-[#FFC107] to-[#FF9800]",
    badgeText: "Premium",
    badgeColor: "bg-yellow-500",
  },
};
