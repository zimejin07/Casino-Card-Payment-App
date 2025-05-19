import type { NextApiRequest, NextApiResponse } from "next";
import { gql } from "@apollo/client";
import serverClient from "../../../../lib/serverApolloClient";

const DELETE_CARD = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(where: { id: $id }) {
      id
    }
  }
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { id } = req.body;

    const result = await serverClient.mutate({
      mutation: DELETE_CARD,
      variables: { id },
    });

    return res.status(200).json(result.data.deleteCard);
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
