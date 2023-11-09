import React, { useEffect, useState } from 'react'
import { Avatar, Rating, Tooltip, Typography } from '@mui/material'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone'
import ContactMailIcon from '@mui/icons-material/ContactMail'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'

function ProfilePicture() {
  const [isHovered, setIsHovered] = useState(false)
  const [averageRating, setAverageRating] = useState(0)
  const [numberOfRatings, setNumberOfRatings] = useState(0)

  const personalInfo = {
    phone: '+491622363983',
    email: 'mocanugeorge90@gmail.com'
  }


  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch('/api/ratings')

        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`)
        }

        const ratings = await response.json()

        const totalRating =
          ratings.reduce((acc, rating) => acc + rating.rating, 0)
        const average = totalRating / ratings.length
        setNumberOfRatings(ratings.length)
        setAverageRating(average)
      } catch (error) {
        console.error('Error fetching ratings:', error)
      }
    }
    fetchRatings()
  }, [])

  return (
    <Tooltip title="George Mocanu">
      <div
        onMouseEnter={() => setIsHovered(!isHovered)}
        onMouseLeave={() => setIsHovered(!isHovered)}
        style={{
          display: 'inline-block',
          position: 'relative',
        }}
      >
        <Avatar
          alt="George Mocanu"
          src="/images/profile.jpg"
          sx={{
            width: 250,
            height: 250,
            transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            backfaceVisibility: 'hidden',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgb(25,118,210)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            transform: `rotateY(${isHovered ? 360 : 0}deg)`,
            color: 'white',
            borderRadius: '150px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            style={{ fontFamily: 'consolas' }}
          >
            Contact:
          </Typography>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px'
            }}>
            <ContactPhoneIcon fontSize="small" style={{ marginTop: '-6px' }} />
            <Typography
              variant="caption"
              gutterBottom
              style={{ marginLeft: '5px', fontFamily: 'consolas' }}
            >
              {personalInfo.phone}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ContactMailIcon fontSize="small" style={{ marginTop: '-6px' }} />
            <Typography
              variant="caption"
              gutterBottom
              style={{ marginLeft: '5px', fontFamily: 'consolas' }}
            >
              {personalInfo.email}
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <EmojiEventsIcon fontSize="small" style={{ marginTop: '-6px' }} />
            <Typography
              variant="caption"
              gutterBottom
              style={{ marginLeft: '5px', fontFamily: 'consolas' }}>
              Average ratings:
            </Typography>
          </div>
          <Rating value={averageRating} precision={0.5} readOnly />
          <Typography
            variant="caption"
            style={{ fontFamily: 'consolas' }}
          >
            ({numberOfRatings})
          </Typography>
        </div>
      </div>
    </Tooltip>
  )
}

export default ProfilePicture