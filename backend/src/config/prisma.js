import { PrismaClient } from "@prisma/client"

export const prisma = new PrismaClient()

export const connectPrismaToDB = async () => {
    try {
        prisma.$connect();
        console.log("Postgres Connected Successfully")
    } catch (error) {
        console.error(`Postgres Connected Unsuccessfully`,error.message)
        
    }

}