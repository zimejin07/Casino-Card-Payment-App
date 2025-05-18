'use client'

import { CardData } from '../types'
import { motion } from 'framer-motion'

type Props = {
  card: CardData
  onClick: () => void
  index: number
}

const getCardBrandIcon = (cardNumber: string) => {
  if (/^4/.test(cardNumber)) return <i className="fab fa-cc-visa text-2xl" />
  if (/^5[1-5]/.test(cardNumber)) return <i className="fab fa-cc-mastercard text-2xl" />
  if (/^3[47]/.test(cardNumber)) return <i className="fab fa-cc-amex text-2xl" />
  if (/^6(?:011|5)/.test(cardNumber)) return <i className="fab fa-cc-discover text-2xl" />
  return <i className="far fa-credit-card text-2xl" />
}

export default function CardItem({ card, onClick, index }: Props) {
  return (
    <motion.div
      key={card.id ?? index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      className="flip-card w-full cursor-pointer"
      onClick={onClick}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front bg-gradient-to-r from-[var(--casumo-purple)] to-[var(--casumo-purple-dark)] text-white p-6 rounded-2xl shadow-md min-h-[12rem] flex flex-col justify-between backface-hidden">
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

          <div className="flex justify-between text-sm opacity-90 mt-2">
            <p>Expires {card.expiryDate}</p>
            <p>CVV •••</p>
          </div>
        </div>

        {/* Back */}
        <div className="flip-card-back absolute inset-0 bg-gradient-to-r from-[#32007E] to-[var(--casumo-purple-dark)] text-white p-6 rounded-2xl shadow-md min-h-[12rem] flex flex-col justify-between backface-hidden transform rotate-y-180">
          <div className="h-8 bg-black opacity-20 mb-6" />
          <div className="bg-white h-8 rounded flex items-center px-2 mb-6">
            <p className="text-black font-mono text-sm">{card.cvv}</p>
          </div>
          <div className="flex justify-end">{getCardBrandIcon(card.cardNumber)}</div>
        </div>
      </div>
    </motion.div>
  )
}
