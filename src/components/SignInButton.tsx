import { useAddress, 
    useNetworkMismatch,
    useNetwork,
    ConnectWallet,
    ChainId,
    MediaRenderer
} from '@thirdweb-dev/react'
import { profile } from 'console';
import Link from 'next/link';
import React from 'react'
import { classicNameResolver } from 'typescript';

import useLensUser from '../auth/useLensUser';
import useLogin from '../auth/useLogin';

type Props = {}

export default function SignInButton({}: Props) {

    const address = useAddress(); // Detect connected address
    const isOnWrongNetwork = useNetworkMismatch(); // Detect if the user is on the wrong network
    const [, switchNetwork] = useNetwork(); // function to switch the network
    const { isSignedInQuery, profileQuery} = useLensUser();
    const { mutate: requestLogin } = useLogin();

    //1. User needs to connect their wallet
    if(!address) {
        return(
            <ConnectWallet 
            accentColor='#3BC68F'
            colorMode='light'
            
            />
        )
    }

    //2. User needs to switch network to Polygon
    if(isOnWrongNetwork) {
        return(
            <button onClick={() => switchNetwork?.(ChainId.Polygon)}>
                Switch Netowrk
            </button>
        )
    }

    //3. Sign in with Lens
    if(isSignedInQuery.isLoading) {
        return <div>Loading...</div>
    }

    if(!isSignedInQuery.data) {
        return(
        <button
        onClick={() => requestLogin()}
        >
            Sign in with Lens
        </button>
        )
    }
     

    //4. Show the user their profile on lens
    console.log(profileQuery.data?.defaultProfile?.handle)
    if(profileQuery.isLoading) {
        return <div>Loading...</div>
    }

    if(!profileQuery.data?.defaultProfile) {
        return <div> No Lens Profile.</div>
    }

    if(profileQuery.data?.defaultProfile) {


        return (
            <Link href={`/profiles/${profileQuery.data.defaultProfile.handle}`} className='h-[60px] object-contain w-[60px]'>
                <MediaRenderer 
                src={profileQuery.data.defaultProfile.picture.original.url || ""}
                alt={profileQuery?.data?.defaultProfile?.name}
                height="100%"
                width="100%"
                className='bg-black rounded-full'
                >

                </MediaRenderer>
                
            </Link>

        )

    }

    return (
        <div>Something went wrong.</div>
    )
}