import React, { useState } from 'react';
import { useCreateStream } from '@livepeer/react'
const streamName = 'New Stream ';


const CreateStreamForm = ( props ) => {
    const [createdStream, setCreatedStream] = useState(false);
    const [streamName, setStreamName] = useState('');
    
    const createStreamHandler = () => {
        setCreatedStream(true)
    }

    const idHandler = (id) => {
        
    }

    const {
        mutate: createStream,
        data: stream,
        status,
    } = useCreateStream({ name: streamName })

  return (
    
    <div>
        {
            !createdStream ?
            <div>        
            <input 
                className="name--text"
                type="text"
                placeholder="Stream name"
                onChange={(e) => setStreamName(e.target.value)}
            />

            <button
                className='create--stream--btn'
                onClick={() => {
                createStream?.();
                idHandler()
                }}
                disabled={status === 'loading' || !createStream}
            >
        Create Stream
        </button></div>
        : 
        <div> 
            Stream has been created!
        </div>
        }

        
        <div className='streamKey'>RTMP Ingest URL: <span className='highlight'>rtmp://rtmp.livepeer.com/live</span></div>
        <div className='streamKey'>Stream Key:{stream && <span className='highlight'> {stream.streamKey}</span>}</div>
        <div className='streamKey'>Status: <span className='highlight'>{status}</span></div>
        {stream && idHandler(stream.playbackId)}
        
    </div>
  )
}

export default CreateStreamForm