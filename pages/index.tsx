import Head from 'next/head'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'

import ResponsiveAppBar from '../components/common/ResponsiveAppBar'
import ProfilePicture from '../components/common/ProfilePicture'
import CustomCardContent from '../components/layout/CustomCardContent'
import WellcomeMsg from '../components/common/WellcomeMsg'
import { useSession } from 'next-auth/react'
import styles from '../styles/Background.module.css'

function Home() {
  const { data: session } = useSession()

  return (
    <div className={styles.background}>
       <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar />
        <br />
        <Grid
          container direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <WellcomeMsg userStatus={session} />
          <ProfilePicture />
          <br />
          <CustomCardContent />
        </Grid>
      </Box>
    </div>
  )
}

export default Home