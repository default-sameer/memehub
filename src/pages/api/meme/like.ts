import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })

    if (session) {
        const {id, updatedLikes} = req.body
        const userMeme = await prisma.meme.update({
            where: {
                id: id
            },
            data:{
                likes: updatedLikes
            }
        })
        res.json(userMeme)
        
    } else {
        res.send({
            error: "You must be signed in to MemeHub to access this API.",
        })
    }
}