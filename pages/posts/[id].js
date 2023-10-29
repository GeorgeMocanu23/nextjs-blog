import Head from 'next/head'
import { getSession } from 'next-auth/react'

import utilStyles from '../../styles/utils.module.css'
import { getPostData } from '../../lib/posts'
import Layout from '../../components/layout/Layout'
import Date from '../../components/common/date'

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const params = context.params
  const postData = await getPostData(params.id)

  return {
    props: {
      postData,
    },
  }
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <article style={{ color: 'white' }}>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}