import React, { useState } from 'react'
import {
  Link,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import KeyIcon from '@mui/icons-material/Key'

import Redirector from '../error/Redirector'
import styles from '../../styles/Background.module.css'

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [secondPassword, setSecondPassword] = useState('')
  const [registrationSuccess, setRegistrationSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleRegister = async () => {
    if (password !== secondPassword) {
      setError('Passwords do not match')
      return
    }
    try {
      const response = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        setRegistrationSuccess(true)
      } else {
        setError('Username already exist')
      }
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  if (registrationSuccess) {
    return (
      <Redirector
        title="Account successfully created"
        message="Now please go back and login to the Login page"
        destination="/login"
        buttonText="Go to Login page"
      />
    )
  }

  return (
    <div className={styles.background}>
      <Paper
        style={{
          width: '90%',
          maxWidth: '400px',
          padding: '16px',
          margin: 'auto',
          textAlign: 'center',
          marginTop: '50px',
        }}
        elevation={4}
      >
        <Typography variant="h4" align='center' style={{ marginBottom: '10px' }}>
          Register
        </Typography>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: '16px', width: '100%' }}
          label="Username"
          variant="outlined"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: '16px', width: '100%' }}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
          }}
          style={{ marginBottom: '16px', width: '100%' }}
          label="Reenter Password"
          variant="outlined"
          type="password"
          value={secondPassword}
          onChange={(e) => setSecondPassword(e.target.value)}
        />
        <Button
          style={{ marginTop: '4px', textTransform: 'none' }}
          disabled={!username || !password || !secondPassword}
          variant="contained"
          onClick={handleRegister}
        >
          Register
        </Button>
        {error &&
          <Alert
            style={{ marginTop: '16px', marginBottom: '10px', width: '100%' }}
            severity="error">{error}
          </Alert>
        }
        <Typography
          variant="h6"
          align='center'
          style={{ marginTop: '12px' }}
        >
          Already have an Account?{' '}
          <Link
            href="/login"
            sx={{ textDecoration: 'none' }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </div>
  )
}

export default Register