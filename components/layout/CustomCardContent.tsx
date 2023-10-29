import React from 'react'
import { Paper, Typography } from '@mui/material'

function CustomCardContent() {

  return (
    <Paper
      sx={{
        p: 1,
        margin: '20px',
        textAlign: 'left',
        borderRadius: '15px',
        maxWidth: '1450px'
      }}
      elevation={24}
    >
      <Typography variant="h6">
        We explore the fascinating universe of technology, unveiling the secrets of artificial intelligence, shaping the future through programming, and bringing revolutionary ideas to life, and this is just the beginning of our adventure.
      </Typography>
    </Paper>
  )
}

export default CustomCardContent