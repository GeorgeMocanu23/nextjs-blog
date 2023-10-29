import { Box, Container } from '@mui/material'

import ResponsiveAppBar from '../common/ResponsiveAppBar'
import styles from '../../styles/Background.module.css'
import React from 'react'

function Layout({ children }) {
  return (
    <div className={styles.background}>
      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar />
        <Container>
          {children}
        </Container>
      </Box>
    </div>
  )
}

export default Layout