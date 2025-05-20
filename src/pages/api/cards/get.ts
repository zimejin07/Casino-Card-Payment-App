import type { NextApiRequest, NextApiResponse } from "next";
import { gql } from "@apollo/client";
import serverClient from "../../../../lib/serverApolloClient";

const GET_CARDS = gql`
  query GetCards {
    cards(stage: PUBLISHED) {
      id
      cardNumber
      expiryDate
      cvv
      cardholderName
      type
    }
  }
`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    const { data } = await serverClient.query({
      query: GET_CARDS,
      fetchPolicy: "no-cache",
    });

    return res.status(200).json(data.cards);
  } catch (error) {
    const err = error as any;
    return res.status(500).json({ error: err.message });
  }
}
