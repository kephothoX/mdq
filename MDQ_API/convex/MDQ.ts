
import { httpAction } from './_generated/server';
import { api, internal } from './_generated/api';





export const submitTopicMessage = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const response = await ctx.runAction(api.MDQActions.submitTopicMessage, params);

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

export const subscribeToTopic = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const response = await ctx.runAction(api.MDQActions.subscribeToTopic, params);

  console.log(response);

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


/*export const newAccessToken = httpAction(async (ctx, request) => {
  const params = JSON.parse(await request.text());

  const response = await ctx.runMutation(api.ardhiBloxMutations.addNewAccessToken, params);

  return new Response(JSON.stringify(response), {
    headers: new Headers({
        'Access-Control-Allow-Origin': process.env.CLIENT_ORIGIN!,
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type',   
        Vary: 'origin',
      }),

    status: 200,
  });

});*/
