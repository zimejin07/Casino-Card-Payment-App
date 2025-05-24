import type {NextApiRequest, NextApiResponse} from "next";
import {gql} from "@apollo/client";
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).end();

    try {
        res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");

        const {data} = await serverClient.query({
            query: GET_CARDS, fetchPolicy: "no-cache",
        });

        return res.status(200).json(data.cards);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("GraphQL get error:", error);
            return res.status(500).json({error: error.message});
        }

        console.error("Unknown error during get:", error);
        return res.status(500).json({error: "Unexpected server error"});
    }
}
