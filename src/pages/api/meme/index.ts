import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"
import { MemeResponse } from "../../../utils/meme"



export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })
    
    if (req.method === 'GET') {
     
    const memes = await prisma.meme.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    if(memes.length === 0) {
      res.status(404).json({
        message: "No memes uploaded yet"
      })
    }else{
      return res.json(
        memes.map((meme) => ({
          id: meme.id.toString(),
          imageUrl: meme.imageUrl,
          nsfw: meme.nsfw,
          likes: meme.likes,
          // @ts-ignore
          author: meme.author
  
        }))
      );
    }
  }
    
  
  if (!session) {
    return res.status(403).send('You must be signed in to MemeHub to access this API');
  }
  if(req.method === 'POST') {
      const {imageUrl, nsfw}  = req.query
      let nsfwValue: boolean;
      if(nsfw === 'true') {
        nsfwValue = true
      }else{
        nsfwValue = false
      }
      const memes = await prisma.meme.create({
          data: {
              imageUrl : String(imageUrl),
              // @ts-ignore
              nsfw: nsfwValue,
            // @ts-ignore
              author: { connect: { name: session?.user?.name } }
          }
      });
      return res.send(memes)
  }

  return res.send('Method not allowed.');
}