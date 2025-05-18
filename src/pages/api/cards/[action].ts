import type { NextApiRequest, NextApiResponse } from "next";
import { gql } from "@apollo/client";
import serverClient from "../../../../lib/serverApolloClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const action = Array.isArray(req.query.action)
    ? req.query.action[0]
    : req.query.action;

  try {
    console.log("Action:", action);
    switch (action) {
      case "get":
        const getResult = await serverClient.query({
          query: gql`
            query GetCards {
              cards {
                id
                cardNumber
                expiryDate
                cvv
                cardholderName
              }
            }
          `,
        });
        return res.status(200).json(getResult.data.cards);

      case "create":
        const createData = req.body;
        const createResult = await serverClient.mutate({
          mutation: gql`
            mutation CreateCard($data: CardCreateInput!) {
              createCard(data: $data) {
                id
              }
            }
          `,
          variables: { data: createData },
        });
        return res.status(201).json(createResult.data.createCard);

      case "update":
        const { id: updateId, ...updateData } = req.body;
        const updateResult = await serverClient.mutate({
          mutation: gql`
            mutation UpdateCard($id: ID!, $data: CardUpdateInput!) {
              updateCard(where: { id: $id }, data: $data) {
                id
              }
            }
          `,
          variables: {
            id: updateId,
            data: updateData,
          },
        });
        return res.status(200).json(updateResult.data.updateCard);

      case "delete":
        const { id: deleteId } = req.body;
        const deleteResult = await serverClient.mutate({
          mutation: gql`
            mutation DeleteCard($id: ID!) {
              deleteCard(where: { id: $id }) {
                id
              }
            }
          `,
          variables: { id: deleteId },
        });
        return res.status(200).json(deleteResult.data.deleteCard);

      default:
        return res.status(404).json({ error: "Invalid action" });
    }
  } catch (err: any) {
    console.error(err);
    return res
      .status(500)
      .json({ error: err.message || "Something went wrong" });
  }
}
