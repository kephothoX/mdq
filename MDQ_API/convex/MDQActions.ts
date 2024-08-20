"use node";


import { action } from './_generated/server';
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
    TopicMessageSubmitTransaction,
    PublicKey,
    TopicId,
    TopicMessageQuery
} from "@hashgraph/sdk";
require('dotenv').config();




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


export const submitTopicMessage = action({
    args: {
        topicID: v.any(),
        bid: v.number(),
        account: v.string()
    },
    handler: async (ctx, args) => {
        console.log(args);
        const topicId: TopicId = args.topicID;
        console.log(topicId);

        const client = await clientSetUp();


        let sendResponse = await new TopicMessageSubmitTransaction({
            topicId: topicId,
            message: `${args.account} bids ${args.bid}`,
        }).execute(client);


        const getReceipt = await sendResponse.getReceipt(client);

        const transactionStatus = getReceipt.status

        return transactionStatus.toString();
    }
});


export const subscribeToTopic = action({
    args: {
        topicId: v.any()
    },
    handler: async (ctx, args) => {
        let res;
        console.log(args);
        const topicId: TopicId = args.topicId;
        console.log(topicId);

        const client = await clientSetUp();

        console.log('Client: ', client);

        /*console.log(new TopicMessageQuery()
            .setTopicId(topicId)
            .subscribe(client, null, (message) => {
                let messageAsString = Buffer.from(`${message.contents}`, "utf8").toString();
                console.log(
                    `${message.consensusTimestamp.toDate()} Received: ${messageAsString}`
                );

                res = `${message.consensusTimestamp.toDate()} Received: ${messageAsString}`;
            })
);*/

        console.log('TopicMessageQuery', new TopicMessageQuery()
            .setTopicId(topicId)
            .setStartTime(0)
            .subscribe(
                client,
                null,
                (message) => console.log(Buffer.from(`${message?.contents}`, "utf8").toString())
            ));

        return "";

        /*return new TopicMessageQuery()
            .setTopicId(topicId)
            .subscribe(client, null, (message) => {
                let messageAsString = Buffer.from(`${message.contents}`, "utf8").toString();
                console.log(
                    `${message.consensusTimestamp.toDate()} Received: ${messageAsString}`
                );

                res = `${message.consensusTimestamp.toDate()} Received: ${messageAsString}`;
            });*/


    }
});



export const createAccountWithInitialBal = action({
    handler: async () => {
        const client = await clientSetUp();

        const privateKey = PrivateKey.generate();

        const response = await new AccountCreateTransaction()
            .setKey(privateKey.publicKey)
            .setInitialBalance(new Hbar(10))
            .execute(client);

        console.log(response);

        const transactionReceipt = await response.getReceipt(client);
        const newAccountId = transactionReceipt.accountId;

        console.log("The new account ID is: " + newAccountId);


        //Verify the account balance
        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(`${newAccountId}`)
            .execute(client);

        console.log("The new account balance is: " + accountBalance.hbars.toTinybars() + " tinybar.");


        const queryCost = await new AccountBalanceQuery()
            .setAccountId(`${newAccountId}`)
            .getCost(client);

        console.log("The cost of query is: " + queryCost);






        /*const newAccount = await new AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(Hbar.fromTinybars(1000))
    .execute(client);*/


        /*const accountBalance = await new AccountBalanceQuery()
            .setAccountId(myAccountId)
            .execute(client);

        console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");


        const FToken = client.setTokenType(TokenType.FungibleCommon)
        .setTokenName("bguiz coin")
        .setTokenSymbol("BGZ")
        .setDecimals(2)
        .setInitialSupply(1_000_000)


        return "success";*/
    },
});


export const createAccount = action({
    handler: async (ctx, args) => {
        const client = await clientSetUp();
        const accountPrivateKey = PrivateKey.generateED25519();



        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(`${myAccountId}`)
            .execute(client);

        console.log(accountBalance);

        const response: any = await new AccountCreateTransaction()
            .setInitialBalance(new Hbar(accountBalance))
            .setKey(accountPrivateKey)
            .execute(client);

        console.log(response);

        const receipt = await response.getReceipt(client);

        console.log(receipt);

        //const transactionReceipt = await response.getReceipt(client);
        //const newAccountId = transactionReceipt.accountId;

        //Create your Hedera Testnet client





        console.log([receipt.accountId, accountPrivateKey]);

        return [receipt.accountId, accountPrivateKey];





    }
})



export const newNFT = action({
    handler: async (ctx, args) => {
        const client = await clientSetUp();

        //Set your account as the client's operator
        client.setOperator(`${myAccountId}`, `${myPrivateKey}`);

        //Set the default maximum transaction fee (in Hbar)
        client.setDefaultMaxTransactionFee(new Hbar(10));

        //Set the maximum payment for queries (in Hbar)
        client.setDefaultMaxQueryPayment(new Hbar(50));

        console.log("Client setup complete.");

        const privateKey = PrivateKey.generate();
        console.log(privateKey);


        const nftCreate = new TokenCreateTransaction()
            .setTokenName("diploma")
            .setTokenSymbol("GRAD")
            .setTokenType(TokenType.NonFungibleUnique)
            .setDecimals(0)
            .setInitialSupply(0)
            .setTreasuryAccountId(`${myAccountId}`)
            .setSupplyType(TokenSupplyType.Finite)
            .setMaxSupply(250)
            .setSupplyKey(privateKey)
            .freezeWith(client);

        //Sign the transaction with the treasury key
        const nftCreateTxSign = await nftCreate.sign(privateKey);

        //Submit the transaction to a Hedera network
        const nftCreateSubmit = await nftCreateTxSign.execute(client);

        //Get the transaction receipt
        const nftCreateRx = await nftCreateSubmit.getReceipt(client);

        //Get the token ID
        const tokenId = nftCreateRx.tokenId;

        //Log the token ID
        console.log("Created NFT with Token ID: " + tokenId);

    }
});


export const mintToken = action({
    handler: async (ctx, args) => {
        const client = await clientSetUp();

        //Set your account as the client's operator
        client.setOperator(`${myAccountId}`, `${myPrivateKey}`);
        const tokenID = '0.0.4654010';

        const supplyKey = PrivateKey.generate();
        console.log(supplyKey);


        //Set your account as the client's operator
        client.setOperator(`${myAccountId}`, `${myPrivateKey}`);

        //Set the default maximum transaction fee (in Hbar)
        client.setDefaultMaxTransactionFee(new Hbar(10));

        //Set the maximum payment for queries (in Hbar)
        client.setDefaultMaxQueryPayment(new Hbar(50));
        // Max transaction fee as a constant
        const maxTransactionFee = new Hbar(20);

        //IPFS content identifiers for which we will create a NFT
        const CID = [
            Buffer.from(
                "ipfs://bafyreiao6ajgsfji6qsgbqwdtjdu5gmul7tv2v3pd6kjgcw5o65b2ogst4/metadata.json"
            ),
            Buffer.from(
                "ipfs://bafyreic463uarchq4mlufp7pvfkfut7zeqsqmn3b2x3jjxwcjqx6b5pk7q/metadata.json"
            ),
            Buffer.from(
                "ipfs://bafyreihhja55q6h2rijscl3gra7a3ntiroyglz45z5wlyxdzs6kjh2dinu/metadata.json"
            ),
            Buffer.from(
                "ipfs://bafyreidb23oehkttjbff3gdi4vz7mjijcxjyxadwg32pngod4huozcwphu/metadata.json"
            ),
            Buffer.from(
                "ipfs://bafyreie7ftl6erd5etz5gscfwfiwjmht3b52cevdrf7hjwxx5ddns7zneu/metadata.json"
            )
        ];

        // MINT NEW BATCH OF NFTs
        const mintTx = new TokenMintTransaction()
            .setTokenId(tokenID)
            .setMetadata(CID) //Batch minting - UP TO 10 NFTs in single tx
            .setMaxTransactionFee(maxTransactionFee)
            .freezeWith(client);

        //Sign the transaction with the supply key
        const mintTxSign = await mintTx.sign(supplyKey);

        //Submit the transaction to a Hedera network
        const mintTxSubmit = await mintTxSign.execute(client);

        //Get the transaction receipt
        const mintRx = await mintTxSubmit.getReceipt(client);

        //Log the serial number
        console.log("Created NFT " + tokenID + " with serial number: " + mintRx.serials);
    }
});

/*
export const getAccountBal = action({
    handler: async (ctx, args) => {
    getAccountTokenBalances(accountId: AccountId) {
   // get token balances
   const tokenBalanceInfo = await fetch(`${this.url}/api/v1/accounts/${accountId}/tokens?limit=100`, { method: "GET" });
   const tokenBalanceInfoJson = await tokenBalanceInfo.json();

   const tokenBalances = [...tokenBalanceInfoJson.tokens] as MirrorNodeAccountTokenBalance[];

   // because the mirror node API paginates results, we need to check if there are more results
   // if links.next is not null, then there are more results and we need to fetch them until links.next is null
   let nextLink = tokenBalanceInfoJson.links.next;
   while (nextLink !== null) {
     const nextTokenBalanceInfo = await fetch(`${this.url}${nextLink}`, { method: "GET" });
     const nextTokenBalanceInfoJson = await nextTokenBalanceInfo.json();
     tokenBalances.push(...nextTokenBalanceInfoJson.tokens);
     nextLink = nextTokenBalanceInfoJson.links.next;
   }

   return tokenBalances;
 }
    }
})

*/



export const newTransaction = action({
    handler: async () => {

        const client = await clientSetUp();
        const newPublicKey = PublicKey.fromString(`${myPublicKey}`);

        const transaction = new AccountCreateTransaction()
            .setKey(newPublicKey)
            .setInitialBalance(new Hbar(5));

        //Sign with client operator private key and submit the transaction to a Hedera network
        const txResponse = await transaction.execute(client);

        //Get the transaction ID
        const transactionId = txResponse.transactionId;

        //Get the account ID of the node that processed the transaction
        const nodeId = txResponse.nodeId;

        //Get the transaction hash
        const transactionHash = txResponse.transactionHash;

        console.log("The transaction ID is " + transactionId);
        console.log("The transaction hash is " + transactionHash);
        console.log("The node ID is " + nodeId);

    }
})


