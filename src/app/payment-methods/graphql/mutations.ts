import { gql } from "@apollo/client";

export const CREATE_CARD = gql`
  mutation CreateCard($data: CardCreateInput!) {
    createCard(data: $data) {
      id
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation UpdateCard($id: ID!, $data: CardUpdateInput!) {
    updateCard(where: { id: $id }, data: $data) {
      id
    }
  }
`;

export const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(where: { id: $id }) {
      id
    }
  }
`;
