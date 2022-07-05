import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })

    if (session) {
        res.send({
            content:
                `Welcome to MemeHub API ${session.user?.name}.`,
        })
    } else {
        res.send({
            error: "You must be signed in to MemeHub to access this API.",
        })
    }
}