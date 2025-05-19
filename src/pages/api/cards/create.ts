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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    try {
        const createData = req.body;

        const result = await serverClient.mutate({
            mutation: CREATE_CARD,
            variables: { data: createData },
        });

        return res.status(201).json(result.data.createCard);
    } catch (err: any) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
}
