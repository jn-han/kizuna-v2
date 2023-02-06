import React, { useState } from 'react'
import { useCreateAsset } from '@livepeer/react';



const Uploader = ( props ) => {
    const [video, setVideo] = useState();
    const {
        mutate: createAsset,
        data: asset, 
        status,
        progress,
        error,
    } = useCreateAsset(
        video
        ? {
            sources: [{ name: video.name, file:video }],
        }
        : null
    );



  return (
    <div className="uploader--main">
        <input className="upload--video-btn"type='file' onChange={(e) => setVideo(e.target.files[0])}></input>
        <button className="upload--video--btn" onClick={() => {
                createAsset?.();
        }}
            > Upload files</button>

        <p>Status: {status==="" ? "ready to upload" : status}</p>
        <p>Progress: {JSON.stringify(progress)}</p>
        {status==="success" ? console.log(JSON.stringify(video.playbackId)) : console.log("fail")}
    </div>
  )
}

export default Uploader