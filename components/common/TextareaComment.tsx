import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import 'react-quill/dist/quill.bubble.css'
import SendIcon from '@mui/icons-material/Send'
import { Box, Button, FormControl, FormLabel } from '@mui/joy'
import { useSession } from 'next-auth/react'

import CustomReactQuill from './CustomReactQuill'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

export default function TextareaComment({ ratingValue }) {
  const [message, setMessage] = useState('')
  const { data: session } = useSession()

  const handleSendMessage = async () => {
    const userId = session.user.id

    try {
      await fetch('api/user/crud-messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:
          JSON.stringify({
            message: message,
            userId: userId,
            rating: ratingValue, 
            isHtml: true
          }),
      })
    } catch (error) {
      console.error('Error sending message:', error)
    }
    setMessage('')
  }

  return (
    <FormControl>
      <FormLabel style={{marginTop: '10px'}}>
        Please share your valuable feedback to support my growth and development. Your input is highly appreciated and will help me improve further.
      </FormLabel>
      <CustomReactQuill
        value={message}
        onChange={setMessage}
      />
      <Box
        sx={{
          display: 'flex',
          gap: 'var(--Textarea-paddingBlock)',
          pt: 'var(--Textarea-paddingBlock)',
          borderTop: '1px solid',
          borderColor: 'divider',
          flex: 'auto',
        }}
      >
        <Button
          style={{ marginLeft: 'auto', marginTop: '20px' }}
          onClick={handleSendMessage}
          disabled={!ratingValue || !message || message === '<p><br></p>'}
        >
          <SendIcon sx={{ mr: '5px' }} fontSize="small" />
          Send
        </Button>
      </Box>
    </FormControl>
  )
}