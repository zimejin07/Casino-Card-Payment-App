import type { NextApiRequest, NextApiResponse } from "next";
import { gql } from "@apollo/client";
import serverClient from "../../../../lib/serverApolloClient";

const CREATE_CARD = gql`
  mutation CreateCard($data: CardCreateInput!) {
    createCard(data: $data) {
      id
    }
  }
`;

const PUBLISH_CARD = gql`
  mutation PublishCard($id: ID!) {
    publishCard(where: { id: $id }) {
      id
    }
  }
`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const createData = req.body;

    const result = await serverClient.mutate({
      mutation: CREATE_CARD,
      variables: { data: createData },
    });

    const cardId = result.data.createCard.id;

    await serverClient.mutate({
      mutation: PUBLISH_CARD,
      variables: { id: cardId },
    });

    return res.status(201).json({ id: cardId });
  } catch (error) {
    const err = error as any;
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}
