import type { NextApiRequest, NextApiResponse } from "next";
import { gql } from "@apollo/client";
import serverClient from "../../../../lib/serverApolloClient";

const UPDATE_CARD = gql`
  mutation UpdateCard($id: ID!, $data: CardUpdateInput!) {
    updateCard(where: { id: $id }, data: $data) {
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { id, data } = req.body;

    const result = await serverClient.mutate({
      mutation: UPDATE_CARD,
      variables: { id, data },
    });

    await serverClient.mutate({
      mutation: PUBLISH_CARD,
      variables: { id },
    });

    return res.status(200).json(result.data.updateCard);
  } catch (err: any) {
    console.error("GraphQL update error:", JSON.stringify(err, null, 2));
    return res.status(500).json({ error: err.message });
  }
}
