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
  if (req.method !== "POST") {
    console.warn("Received non-POST request");
    return res.status(405).end();
  }

  const { id } = req.body;

  if (!id || typeof id !== "string") {
    console.warn("Invalid or missing 'id' in body:", id);
    return res.status(400).json({ error: "Missing or invalid cardId" });
  }

  try {
    const result = await serverClient.mutate({
      mutation: DELETE_CARD,
      variables: { id },
      fetchPolicy: "no-cache",
    });

    if (result.errors) {
      console.error("GraphQL Errors:", result.errors);
      return res.status(500).json({
        error: "Delete failed due to GraphQL errors",
        details: result.errors,
      });
    }

    const deletedCard = result.data?.deleteCard;

    if (!deletedCard?.id) {
      console.error("Delete mutation returned no data");
      return res.status(500).json({ error: "Delete failed: no card returned" });
    }

    return res.status(200).json({
      id: deletedCard.id,
      message: `Card with ID "${deletedCard.id}" deleted successfully`,
    });
  } catch (err: any) {
    console.error("Delete API exception occurred:", err.message);
    console.debug("Exception stack trace:", err.stack);
    return res.status(500).json({ error: err.message });
  }
}
