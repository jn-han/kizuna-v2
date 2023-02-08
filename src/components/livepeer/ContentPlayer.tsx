import React from 'react'
import { Player } from '@livepeer/react'

const id = "16e732mflx30kdv7"

export default function ContentPlayer() {

  return (
    <Player 
    playbackId={id}
    showLoadingSpinner={true}
    showPipButton/>
  )
}
