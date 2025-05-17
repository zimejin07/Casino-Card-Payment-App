'use client'

import { useState } from 'react'
import { gql } from '@apollo/client'
import client from '@/lib/apolloClient'
import { CardData } from '../types'

const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      cardNumber
      expiryDate
      cvv
      cardholderName
    }
  }
`

const CREATE_CARD = gql`
  mutation CreateCard($data: CardCreateInput!) {
    createCard(data: $data) {
      id
    }
  }
`

const UPDATE_CARD = gql`
  mutation UpdateCard($id: ID!, $data: CardUpdateInput!) {
    updateCard(where: { id: $id }, data: $data) {
      id
    }
  }
`

const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(where: { id: $id }) {
      id
    }
  }
`

export default function useCards() {
  const [cards, setCards] = useState<CardData[]>([])

  async function fetchCards() {
    const { data } = await client.query({ query: GET_CARDS, fetchPolicy: 'no-cache' })
    setCards(data.cards)
  }

  async function createCard(card: CardData) {
    await client.mutate({ mutation: CREATE_CARD, variables: { data: card } })
    await fetchCards()
  }

  async function updateCard(id: string, card: CardData) {
    await client.mutate({ mutation: UPDATE_CARD, variables: { id, data: card } })
    await fetchCards()
  }

  async function deleteCard(id: string) {
    await client.mutate({ mutation: DELETE_CARD, variables: { id } })
    await fetchCards()
  }

  return { cards, fetchCards, createCard, updateCard, deleteCard }
}
