import { gql } from "@apollo/client";

export const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      cardNumber
      expiryDate
      cvv
      cardholderName
      type
    }
  }
`;
