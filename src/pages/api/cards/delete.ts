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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { id } = req.body;

    console.log("Received delete request for ID:", id);

    const result = await serverClient.mutate({
      mutation: DELETE_CARD,
      variables: { id },
    });

    const deletedCard = result.data?.deleteCard;

    if (!deletedCard?.id) {
      console.error("Delete mutation returned no data");
      return res.status(500).json({ error: "Delete failed: no card returned" });
    }

    return res.status(200).json({ id: deletedCard.id });
  } catch (err: any) {
    console.error("Delete API error:", err);
    return res.status(500).json({ error: err.message });
  }
}
