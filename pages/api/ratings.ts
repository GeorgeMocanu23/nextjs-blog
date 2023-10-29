import { NextApiRequest, NextApiResponse } from 'next'

import prisma from '../../lib/prisma'

const getRatings = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const ratings = await prisma.messages.findMany({
      select: {
        rating: true,
      },
    })

    return res.status(200).json(ratings)
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' })
  }
}

export default getRatings