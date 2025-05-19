"use client";

import { cardThemes } from "../../../../lib/cardThemes";
import { CardData } from "../types";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcVisa,
  faCcMastercard,
  faCcAmex,
  faCcDiscover,
} from "@fortawesome/free-brands-svg-icons";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";

type Props = {
  card: CardData;
  onClick: () => void;
  index: number;
};

const getCardBrandIcon = (cardNumber: string) => {
  if (/^4/.test(cardNumber))
    return <FontAwesomeIcon icon={faCcVisa} className="text-2xl" />;

  if (/^5[1-5]/.test(cardNumber))
    return <FontAwesomeIcon icon={faCcMastercard} className="text-2xl" />;

  if (/^3[47]/.test(cardNumber))
    return <FontAwesomeIcon icon={faCcAmex} className="text-2xl" />;

  if (/^6(?:011|5)/.test(cardNumber))
    return <FontAwesomeIcon icon={faCcDiscover} className="text-2xl" />;

  return <FontAwesomeIcon icon={faCreditCard} className="text-2xl" />;
};

export default function CardItem({ card, onClick, index }: Props) {
  const theme = cardThemes[card.type ?? "basic"];

  return (
    <motion.div
      key={card.id ?? index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flip-card cursor-pointer"
      onClick={onClick}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div
          className={`flip-card-front bg-gradient-to-r ${theme.frontGradient} text-white p-6 rounded-2xl shadow-md min-h-[12rem] flex flex-col justify-between backface-hidden`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-80">Cardholder name</p>
              <p className="text-lg font-semibold">{card.cardholderName}</p>
            </div>
            {getCardBrandIcon(card.cardNumber)}
          </div>

          <div className="mt-2">
            <p className="text-sm opacity-80">Card number</p>
            <p className="text-lg font-mono tracking-wider">
              •••• •••• •••• {card.cardNumber.slice(-4)}
            </p>
          </div>

          <div className="flex justify-between items-end text-sm opacity-90 mt-2">
            <p>Expires {card.expiryDate}</p>
            <span
              className={`text-xs text-white py-1 px-2 rounded-full ${theme.badgeColor}`}
            >
              {theme.badgeText}
            </span>
          </div>
        </div>

        {/* Back */}
        <div
          className={`flip-card-back absolute inset-0 bg-gradient-to-r ${theme.backGradient} text-white p-6 rounded-2xl shadow-md min-h-[12rem] flex flex-col justify-between backface-hidden transform rotate-y-180`}
        >
          <div className="h-8 bg-black opacity-20 mb-6" />
          <div className="bg-white h-8 rounded flex items-center px-2 mb-6">
            <p className="text-black font-mono text-sm">{card.cvv}</p>
          </div>
          <div className="flex justify-end">
            {getCardBrandIcon(card.cardNumber)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
