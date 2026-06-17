import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

export const connectPrismaToDB = async () => {
    try {
        await prisma.$connect();
        console.log("PostgreSQL Connected Successfully")
    } catch (error) {
        console.error(`PostgreSQL Connected Unsuccessfully`, error.message)

    }

}