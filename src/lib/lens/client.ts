import { PublicClient,testnet } from "@lens-protocol/react";

export const lensClient = PublicClient.create({
  environment: testnet,
}); 