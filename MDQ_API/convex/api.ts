import { httpAction, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";


export const textAction = httpAction(async () => {

    return new Response("Success", {
        status: 200
    })
});