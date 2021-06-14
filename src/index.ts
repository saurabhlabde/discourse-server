import "reflect-metadata";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { ApolloServer, PubSub } from "apollo-server";
import { PrismaClient } from '@prisma/client'

dotenv.config();

import { resolvers } from "./gql/resolvers";

const prisma = new PrismaClient()

const pubSub = new PubSub();

export type PrismaType = typeof prisma

// config
const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
        const schema = await buildSchema({ resolvers, pubSub });

        const node_env: string | null = process.env.NODE_ENV

        const playground: boolean = node_env === 'development'

        const server = new ApolloServer({
                schema,
                playground: playground,
                context: ({ res }) => ({ res, prisma, pubSub }),
                tracing: true,
                subscriptions: {
                        onConnect(connectionParams, webSocket) {
                                console.log("Connected to websocket 🕸");
                        },
                        onDisconnect() { },
                },
        });

        await server.listen({ port: PORT }).then(() => {
                return console.log(`server online PORT ${PORT}`);
        });
};

bootstrap().catch(e => {
        throw e
})
        .finally(async () => {
                await prisma.$disconnect().then(() => {
                        console.log('disconnect prisma');
                })
        })
