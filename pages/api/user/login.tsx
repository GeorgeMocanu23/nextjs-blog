import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if (!req.body.password || req.body.password.trim() === '') {
    return res.status(400).json({
      error: 'Incorrect user/password combination'
    })
  }

  try {
    const userObject = await prisma.users.findFirst({
      where: { username: req.body.username },
    })

    if (!userObject) {
      return res.status(403).json({
        error: 'Incorrect user/password combination'
      })
    }

    const passwordsMatch =
      await bcrypt.compare(req.body.password, userObject.password)

    if (passwordsMatch) {
      delete userObject.password
      return res.status(200).json({
        success: true,
        user: JSON.stringify(userObject)
      })
    }

    return res.status(403).json({
      error: 'Incorrect user/password combination'
    })

  } catch (error) {
    console.error('Error during login:', error)
    return res.status(500).json({
      error: 'Internal server error',
    })
  }
}