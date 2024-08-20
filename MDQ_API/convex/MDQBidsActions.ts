"use node";


import { action } from './_generated/server';
import { api } from './_generated/api';
import { v } from 'convex/values';


import { 
    Client, 
    PrivateKey, 
    AccountCreateTransaction, 
    AccountBalanceQuery, 
    Hbar, 
    TransferTransaction,
    TokenType,
    TokenCreateTransaction,
    TokenSupplyType,
    TokenMintTransaction,
    TopicCreateTransaction,
    PublicKey
} from "@hashgraph/sdk";


const myAccountId = process.env.HEDERA_ACCOUNT_ID;
const myPrivateKey = process.env.HEDERA_PRIVATE_KEY;
const myPublicKey = process.env.HEDERA_PUBLIC_KEY;

async function clientSetUp() {
    // If we weren't able to grab it, we should throw a new error
    if (!myAccountId || !myPrivateKey) {
        throw new Error("Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be present");
    }

    //Create your Hedera Testnet client
    const client = Client.forTestnet();

    //Set your account as the client's operator
    client.setOperator(myAccountId, myPrivateKey);

    //Set the default maximum transaction fee (in Hbar)
    client.setDefaultMaxTransactionFee(new Hbar(1));

    //Set the maximum payment for queries (in Hbar)
    client.setDefaultMaxQueryPayment(new Hbar(2));

    return client;


}

const client = await clientSetUp();


export const newItem = action({
    args: {
        name: v.string(),
        price_amount: v.number(),
        item_images: v.array(v.string()),
        description: v.string(),
        location: v.string(),
        bid_opens: v.string(),
        bid_closes: v.string()
    },
    handler: async (ctx, args) => {
        let txResponse = await new TopicCreateTransaction().execute(client);

        const receipt = await txResponse.getReceipt(client);
        const topicId = receipt.topicId;

        const Item = {
            topicID: `${ topicId }`,
            name: args.name,
            price_amount: args.price_amount,
            item_images:  args.item_images,
            description: args.description,
            location: args.location,
            bid_opens: args.bid_opens,
            bid_closes: args.bid_closes
        }

        const response: any = await ctx.runMutation(api.MDQBidsMutations.newItem, Item);

        return response;
    }
});




