
import { Inter } from '@next/font/google'
import NavBar from './api/components/NavBar'
import { livepeerClient } from '../livepeer-api'
import { LivepeerConfig } from '@livepeer/react'
import Uploader from './api/components/livepeer/UploadVideo'
import CreateStreamForm from './api/components/livepeer/StreamForm'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <LivepeerConfig client={livepeerClient}>
      
    </LivepeerConfig>
  )
}
