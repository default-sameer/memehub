import { getSession } from 'next-auth/react'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (session) {
    const { updateBio } = req.body
    const UserBio = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        bio: updateBio,
      },
    })
    res.json(UserBio)
  } else {
    res.send({
      error: 'You must be signed in to MemeHub to access this API.',
    })
  }
}
