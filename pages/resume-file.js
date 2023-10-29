import Head from "next/head"

import PdfViewer from "/components/data/PdfViewer"
import { hasPermissions } from '../lib/has-permissions'

export async function getServerSideProps(context) {
  return hasPermissions(context)
}

function Page() {

  return (
    <>
      <Head>
        <title>Resume</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <PdfViewer url={"/documents/cv.pdf"} />
    </>
  )
}

export default Page