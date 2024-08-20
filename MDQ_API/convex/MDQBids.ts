
import { httpAction } from './_generated/server';
import { api, internal } from './_generated/api';



export const newItem = httpAction(async (ctx, request) => {
    let response;

    await request.formData().then(async (data: any) => {

        if (data.get('item_images[]')) {
            const item_images = new Array();

            for (let img of data.getAll('item_images[]')) {
                const blob_img = img as Blob;
                const storageId = await ctx.storage.store(blob_img);
                item_images.push(await ctx.storage.getUrl(storageId));

            }

            const Item = {
                name: data.get('name'),
                price_amount: parseFloat(data.get('price_amount')),
                item_images: item_images,
                description: data.get('description'),
                location: data.get('location'),
                bid_opens: data.get('bid_opens'),
                bid_closes: data.get('bid_closes')
            }

            response = await ctx.runAction(api.MDQBidsActions.newItem, Item);


        } else {

            const Item = {
                name: data.get('name'),
                price_amount: parseFloat(data.get('price_amount')),
                item_images: ['No Item Images'],
                description: data.get('description'),
                location: data.get('location'),
                bid_opens: data.get('bid_opens'),
                bid_closes: data.get('bid_closes')
            }

            response = await ctx.runAction(api.MDQBidsActions.newItem, Item);

        }
    });

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});





export const getAllItems = httpAction(async (ctx, request) => {

    const response = await ctx.runQuery(api.MDQBidsQueries.getAllItems);

    return new Response(JSON.stringify(response), {
        headers: {
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',   
            Vary: 'origin',
        },
        status: 200,
    });
});

export const getItems = httpAction(async (ctx, request) => {

    const response = await ctx.runQuery(api.MDQBidsQueries.getItems);


    return new Response(JSON.stringify(response), {
        headers: {
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type',   
            Vary: 'origin',
        },
        status: 200,
    });
});


export const getItemById = httpAction(async (ctx, request) => {
    const params = JSON.parse(await request.text());

    const response = await ctx.runQuery(api.MDQBidsQueries.getItemById, params);
    console.log(response);

    return new Response(JSON.stringify(response), {
        headers: {
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',   
            Vary: 'origin',
        },
        status: 200,
    });
});



export const updateItem = httpAction(async (ctx, request) => {
    let response;
    await request.formData().then(async (data: any) => {

        if (data.get('item_images[]')) {
            const item_images = new Array();

            for (let img of data.getAll('item_images[]')) {
                const blob_img = img as Blob;
                const storageId = await ctx.storage.store(blob_img);
                item_images.push(await ctx.storage.getUrl(storageId));

            }  
            

            const Item = {
                id: data.get('id'),
                topicID: data.get('topicID'),
                name: data.get('name'),
                price_amount: parseFloat(data.get('price_amount')),
                item_images: item_images,
                description: data.get('description'),
                location: data.get('location'),
                bid_opens: data.get('bid_opens'),
                bid_closes: data.get('bid_closes')
            }

            response = await ctx.runMutation(api.MDQBidsMutations.updateItem, Item);


        } else {

            const Item = {
                id: data.get('id'),
                topicID: data.get('topicID'),
                created_by: data.get('created_by'),
                name: data.get('name'),
                price_amount: parseFloat(data.get('price_amount')),
                item_images: [],
                description: data.get('description'),
                location: data.get('location'),
                bid_opens: data.get('bid_opens'),
                bid_closes: data.get('bid_closes')
            }

            response = await ctx.runMutation(api.MDQBidsMutations.updateItem, Item);

        }
    });

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});


export const updateBid = httpAction(async (ctx, request) => {
    let response;
    await request.formData().then(async (data: any) => {

            const Bid = {
                id: data.get('id'),
                topicID: data.get('topicID'),
                bid_amount: parseFloat(data.get('price_amount')),
                account: data.get('account'),
            }

            response = await ctx.runMutation(api.MDQBidsMutations.updateBid, Bid);

        
    });

    return new Response(JSON.stringify(response), {
        headers: new Headers({
            'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
            'Access-Control-Allow-Methods': 'POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            Vary: 'origin',
        }),

        status: 200,
    });
});



