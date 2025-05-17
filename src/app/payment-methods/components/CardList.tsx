import { CardData } from '../types'

interface Props {
  cards: CardData[]
  onEdit: (index: number) => void
}

export default function CardList({ cards, onEdit }: Props) {
  if (cards.length === 0) {
    return (
      <div className="text-center text-[#798291] mt-12">
        <i className="fas fa-credit-card text-5xl mb-4"></i>
        <p className="text-xl">No cards added yet</p>
        <p className="mt-2">Add your first card to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-gradient-to-r from-[#4C00C2] to-[#3B058E] rounded-2xl p-6 text-white h-48 flex flex-col justify-between hover:translate-y-[-2px] shadow-md transition-transform cursor-pointer"
          onClick={() => onEdit(i)}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-80">Cardholder name</p>
              <p className="text-lg font-medium">{card.cardholderName}</p>
            </div>
            <div className="text-2xl">💳</div>
          </div>
          <div>
            <p className="text-sm opacity-80">Card number</p>
            <p className="text-xl font-medium tracking-wider">
              •••• •••• •••• {card.cardNumber.slice(-4)}
            </p>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-sm opacity-80">Expires</p>
              <p>{card.expiryDate}</p>
            </div>
            <div>
              <p className="text-sm opacity-80">CVV</p>
              <p>•••</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
