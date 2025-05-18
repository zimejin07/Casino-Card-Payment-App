export type CardType = "basic" | "black" | "premium";

export type CardData = {
  id?: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardholderName: string;
  type?: CardType;
};
