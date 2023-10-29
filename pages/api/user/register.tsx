import prisma from '../../../lib/prisma'
import bcrypt from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

const SALT_ROUNDS = 10

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({
      error: 'Both username and password are required'
    })
  }

  try {
    const existingUser = await prisma.users.findFirst({
      where: { username: username.toLowerCase() },
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
      },
    })

    const { password: _, ...userWithoutPassword } = newUser

    return res.status(201).json({
      success: true,
      user: JSON.stringify(userWithoutPassword),
    })

  } catch (error) {
    console.error('Error during registration:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}