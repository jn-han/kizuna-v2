import React from 'react'
import { Player } from '@livepeer/react'


const contentPlayer = ( props ) => {
  return (
    <Player playbackId={props.id} />
  )
}

export default contentPlayer