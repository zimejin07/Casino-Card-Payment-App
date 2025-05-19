import type { NextApiRequest, NextApiResponse } from "next";
import serverClient from "../../../../lib/serverApolloClient";
import { GET_CARDS } from "@/app/payment-methods/graphql/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const { data } = await serverClient.query({ query: GET_CARDS });
    return res.status(200).json(data.cards);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
