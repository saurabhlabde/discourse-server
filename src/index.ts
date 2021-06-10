import * as dotenv from "dotenv";
import "reflect-metadata";

import { buildSchema } from "type-graphql";
import { ApolloServer, } from "apollo-server";
import { PrismaClient } from '@prisma/client'

dotenv.config();

import { resolvers } from "./gql/resolvers";

const prisma = new PrismaClient()

export type PrismaType = typeof prisma

// config
const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
        const schema = await buildSchema({ resolvers });

        const server = new ApolloServer({
                schema,
                playground: true,
                context: ({ res }) => ({ res, prisma }),
                tracing: true,
        });

        await server.listen({ port: PORT }).then(() => {
                return console.log(`server online PORT ${PORT}`);
        });
};

bootstrap().catch(e => {
        throw e
})
        .finally(async () => {
                await prisma.$disconnect()
        })
