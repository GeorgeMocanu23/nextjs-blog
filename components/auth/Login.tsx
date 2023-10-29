import { useState } from 'react'
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'
import PersonIcon from '@mui/icons-material/Person'
import KeyIcon from '@mui/icons-material/Key'
import {
  Link,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Alert
} from '@mui/material'

import styles from '../../styles/Background.module.css'

function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { data: session } = useSession()

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      })

      if (response.ok) {
        await signIn("credentials", { username, password })
      } else {
        setError('Incorrect username/password combination')
      }
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  if (session) {
    router.push('/')
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
          Login
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
          onChange={(e) => setUsername(e.target.value)} />
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
          onChange={(e) => setPassword(e.target.value)} />
        <Button
          style={{ marginTop: '4px', textTransform: 'none' }}
          disabled={!username || !password}
          variant="contained"
          onClick={handleLogin}
        >
          Login
        </Button>
        {error &&
          <Alert
            style={{ marginTop: '16px', marginBottom: '10px', width: '100%' }}
            severity="error">{error}
          </Alert>
        }
        <Typography variant="h6" align='center'
          style={{ marginTop: '16px' }}
        >
          Don't have an Account?{' '}
          <Link
            href="/register"
            sx={{ textDecoration: 'none' }}
          >
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </div>
  )
}

export default Login