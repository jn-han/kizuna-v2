
import { Inter } from '@next/font/google'
import { livepeerClient } from '../livepeer-api'
import { LivepeerConfig } from '@livepeer/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <LivepeerConfig client={livepeerClient}>
      
    </LivepeerConfig>
  )
}
