import type { NextApiRequest, NextApiResponse } from 'next'
import { gql } from '@apollo/client'

import serverClient from '../../../../lib/serverApolloClient'

const GET_CARDS = gql`
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
`

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end()

  try {
    const { data } = await serverClient.query({ query: GET_CARDS })
    return res.status(200).json(data.cards)
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
}
