import React, { useState } from 'react'
import { Box, Rating } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'

export default function HoverRating({ onRatingChange }) {
  const [value, setValue] = useState(0)
  const [hover, setHover] = useState(-1)
  const labels: { [index: string]: string } = {
    '0.5': 'Useless',
    '1': 'Unconvincing',
    '1.5': 'Weak',
    '2': 'Inadequate',
    '2.5': 'Acceptable',
    '3': 'Satisfactory',
    '3.5': 'Good',
    '4': 'Outstanding',
    '4.5': 'Excellent',
    '5': 'Exceptional'
  }

  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
    onRatingChange(newValue)
  }

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={handleChange}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  )
}