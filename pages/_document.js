import { Html, Head, Main, NextScript } from 'next/document'
import NavBar from './api/components/NavBar'
import { LivepeerConfig } from '@livepeer/react'
import { livepeerClient } from '@/livepeer-api'
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='bg-background text-white text-inter font-regular' >
        <LivepeerConfig client={livepeerClient}>
          <NavBar></NavBar>
          <Main />

          <NextScript />
        </LivepeerConfig>
      </body>
    </Html>
  )
}
