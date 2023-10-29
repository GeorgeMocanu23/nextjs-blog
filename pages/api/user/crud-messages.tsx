import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import prisma from '../../../lib/prisma'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req

  switch (method) {
    case 'GET':
      return getMessages(req, res)
    case 'POST':
      return createMessage(req, res)
    case 'PUT':
      return updateMessage(req, res)
    case 'DELETE':
      return deleteMessage(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

// Get all messages
const getMessages = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req })

  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const messages = await prisma.messages.findMany({
      select: {
        id: true,
        userId: true,
        rating: true,
        message: true,
        createdAt: true,
        updatedAt: true,
        user: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    })
    return res.status(200).json(messages)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

// Create a new message
const createMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message, userId, rating } = req.body;

  if (!message || !userId || !rating) {
    return res.status(400).json({ message: 'Message and rating are a required fields' })
  }

  try {
    const newMessage = await prisma.messages.create({
      data: {
        userId: parseInt(userId),
        message: message,
        rating: parseFloat(rating),
      },
    })
    return res.status(201).json({
      message: 'Message created successfully', note: newMessage
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}

// Update a message
const updateMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, messageId, message } = req.body;

  if (!messageId || !message) {
    return res.status(400).json({
      message: 'messageId and message are required fields'
    })
  }

  try {
    const existingMessage = await prisma.messages.findUnique({
      where: { id: parseInt(messageId) },
    })

    if (!existingMessage) {
      return res.status(404).json({ message: 'Message not found' })
    }

    if (existingMessage.userId == userId) {
      const updatedMessage = await prisma.messages.update({
        where: { id: parseInt(messageId) },
        data: { message: message },
      })

      return res.status(200).json({
        message: 'Message updated successfully', note: updatedMessage
      })
    } else {
      return res.status(403).json({
        message: 'You are not authorized to update this message'
      })
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' })
  }
}

// Delete a message
const deleteMessage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId, messageId } = req.body

  if (!messageId) {
    return res.status(400).json({ message: 'id is a required field' })
  }

  try {
    const message = await prisma.messages.findUnique({
      where: { id: parseInt(messageId) },
    })

    if (!message) {
      return res.status(404).json({ message: 'Message not found' })
    }

    if (message.userId != userId) {
      return res.status(403).json({
        message: 'You are not authorized to delete this message'
      })
    }

    await prisma.messages.delete({ where: { id: parseInt(messageId) } })
    return res.status(200).json({ message: 'Message deleted successfully' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Server error' })
  }
}