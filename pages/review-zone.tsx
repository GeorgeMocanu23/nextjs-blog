import React, { useEffect, useState } from "react"
import Head from "next/head"
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from "@mui/material"

import Layout from '../components/layout/Layout'
import HoverRating from "../components/common/HoverRating"
import TextareaComment from "../components/common/TextareaComment"
import MessageList from "../components/data/MessageList"
import { hasPermissions } from '../lib/has-permissions'

export async function getServerSideProps(context) {
  return hasPermissions(context)
}

function ReviewZone() {

  const [messages, setMessages] = useState([])
  const [ratingValue, setRatingValue] = useState(0)

  useEffect(() => {
    fetch('api/user/crud-messages')
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.log('Error fetching messages', error))
  }, [messages])

  const handleRatingChange = (newValue) => {
    setRatingValue(newValue)
  }

  return (
    <Layout>
      <Head>
        <title>Review Zone</title>
      </Head>
      <Box style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Grid sx={{ maxWidth: 'auto', width: "100%", margin: '10px', marginTop: '30px' }}>
          <Card elevation={4}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rate this Portfolio
              </Typography>
              <HoverRating onRatingChange={handleRatingChange} />
              <TextareaComment ratingValue={ratingValue} />
            </CardContent>
          </Card>
          <br />
          <MessageList messageList={messages} />
        </Grid>
      </Box>
    </Layout>
  )
 }

export default ReviewZone