import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LogoutIcon from '@mui/icons-material/Logout'
import LoginIcon from '@mui/icons-material/Login'
import DevicesIcon from '@mui/icons-material/Devices'
import { signIn, signOut, useSession } from "next-auth/react"
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  Tooltip,
  Divider
} from '@mui/material'

function ResponsiveAppBar() {
  const { data: session } = useSession()
  const [anchorElNav, setAnchorElNav] = useState(null)

  const menuItems = [
    { label: 'About Me', href: '/posts/about-me' },
    { label: 'Projects', href: '/posts/projects-list' },
    { label: 'Resume', href: '/resume-file' },
    { label: 'Review', href: '/review-zone' },
  ]

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <DevicesIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Link href="/" passHref>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              HOME
            </Typography>
          </Link>
          {!session ? (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <DevicesIcon
                  sx={{
                    display: { xs: 'flex', md: 'flex' },
                    mr: 1,
                    marginBlock: 0.5
                  }}
                />
                <Typography
                  variant="h5"
                  noWrap
                  component={Link}
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
                >
                  HOME
                </Typography>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                <Typography
                  variant="h5"
                  noWrap
                  component={Link}
                  href="/"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
                >
                  HOME
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Tooltip title="Sign In">
                  <IconButton
                    sx={{ p: 0, color: 'white', marginRight: 1 }}
                    id="login-button"
                    onClick={() => signIn()}
                  >
                    <LoginIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(event) => setAnchorElNav(event.currentTarget)}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={() => setAnchorElNav(null)}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {menuItems.map((item, index) => (
                    <Link key={index} href={item.href}>
                      <Button
                        sx={{
                          my: 2,
                          color: 'black',
                          display: 'block',
                          textTransform: 'none',
                        }}
                        onClick={() => setAnchorElNav(null)}
                      >
                        {item.label}
                      </Button>
                    </Link>
                  ))}
                </Menu>
              </Box>
              <DevicesIcon
                sx={{ display: { xs: 'none', md: 'none' }, mr: 1 }}
              />
              <Typography
                variant="h5"
                noWrap
                component={Link}
                href="/"
                sx={{
                  mr: 2,
                  display: { xs: 'flex', md: 'none' },
                  flexGrow: 1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'none',
                  },
                }}
              >
                HOME
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {menuItems.map((item, index) => (
                  <Link key={index} href={item.href}>
                    <Button
                      sx={{
                        my: 2,
                        color: 'white',
                        display: 'block',
                        textTransform: 'none',
                      }}
                      onClick={() => setAnchorElNav(null)}
                    >
                      {item.label}
                    </Button>
                  </Link>
                ))}
              </Box>
              <Box display="flex" alignItems="center">
                <Tooltip title="GitHub Profile">
                  <IconButton
                    sx={{ p: 0, color: 'white', marginRight: 0.5 }}
                    component="a"
                    href="https://github.com/GeorgeMocanu23"
                  >
                    <GitHubIcon />
                  </IconButton>
                </Tooltip>
                  <Divider orientation="vertical" flexItem />
                <Tooltip title="LinkedIn Profile">
                  <IconButton
                      sx={{
                        p: 0,
                        color: 'white',
                        marginLeft: 0.5,
                        marginRight: 0.5
                      }}
                    component="a"
                    href="https://www.linkedin.com/in/george-mocanu-766b3b160"
                  >
                    <LinkedInIcon />
                  </IconButton>
                </Tooltip>
                  <Divider orientation="vertical" flexItem />
                <Tooltip title="Sign Out">
                  <IconButton
                    sx={{ p: 0, color: 'white', marginLeft: 0.5 }}
                    id="logout-button"
                    onClick={() => signOut()}
                  >
                    <LogoutIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default ResponsiveAppBar